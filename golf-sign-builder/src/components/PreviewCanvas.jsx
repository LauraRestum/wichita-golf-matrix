import { useCallback, useEffect, useRef, useState } from 'react'

const MAX_WIDTH = 600
const MAX_HEIGHT = 500
const KEYBOARD_STEP = 5

function PreviewCanvas({ step, selectedTemplate, logoUrl, foundationName, previewRef }) {
  const containerRef = useRef(null)
  const logoRef = useRef(null)
  const dragOffset = useRef({ x: 0, y: 0 })

  const setTemplateRef = (node) => {
    containerRef.current = node
    if (previewRef) {
      previewRef.current = node
    }
  }

  const [position, setPosition] = useState({ x: 20, y: 20 })
  const [isDragging, setIsDragging] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [showHint, setShowHint] = useState(true)

  // Reset position when template or logo changes
  // (React-recommended pattern: adjust state during render instead of effect)
  const resetKey = `${selectedTemplate?.id}|${logoUrl}`
  const [prevResetKey, setPrevResetKey] = useState(resetKey)
  if (prevResetKey !== resetKey) {
    setPrevResetKey(resetKey)
    setPosition({ x: 20, y: 20 })
    setShowHint(true)
  }

  const clampPosition = useCallback((x, y) => {
    const container = containerRef.current
    const logo = logoRef.current
    if (!container || !logo) return { x, y }

    const containerRect = container.getBoundingClientRect()
    const logoRect = logo.getBoundingClientRect()

    const maxX = Math.max(0, containerRect.width - logoRect.width)
    const maxY = Math.max(0, containerRect.height - logoRect.height)

    return {
      x: Math.min(Math.max(x, 0), maxX),
      y: Math.min(Math.max(y, 0), maxY),
    }
  }, [])

  // --- Mouse drag ---
  const handleMouseDown = (event) => {
    event.preventDefault()
    const logo = logoRef.current
    if (!logo) return

    const logoRect = logo.getBoundingClientRect()
    dragOffset.current = {
      x: event.clientX - logoRect.left,
      y: event.clientY - logoRect.top,
    }
    setIsDragging(true)
    setShowHint(false)
  }

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (event) => {
      const container = containerRef.current
      if (!container) return

      const containerRect = container.getBoundingClientRect()
      const nextX = event.clientX - containerRect.left - dragOffset.current.x
      const nextY = event.clientY - containerRect.top - dragOffset.current.y

      setPosition(clampPosition(nextX, nextY))
    }

    const handleMouseUp = () => setIsDragging(false)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, clampPosition])

  // --- Touch drag ---
  const handleTouchStart = (event) => {
    const touch = event.touches[0]
    if (!touch) return

    const logo = logoRef.current
    if (!logo) return

    const logoRect = logo.getBoundingClientRect()
    dragOffset.current = {
      x: touch.clientX - logoRect.left,
      y: touch.clientY - logoRect.top,
    }
    setIsDragging(true)
    setShowHint(false)
  }

  useEffect(() => {
    if (!isDragging) return

    const handleTouchMove = (event) => {
      const touch = event.touches[0]
      const container = containerRef.current
      if (!touch || !container) return

      event.preventDefault()
      const containerRect = container.getBoundingClientRect()
      const nextX = touch.clientX - containerRect.left - dragOffset.current.x
      const nextY = touch.clientY - containerRect.top - dragOffset.current.y

      setPosition(clampPosition(nextX, nextY))
    }

    const handleTouchEnd = () => setIsDragging(false)

    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isDragging, clampPosition])

  // --- Keyboard nudge ---
  const handleKeyDown = (event) => {
    const moves = {
      ArrowUp: { x: 0, y: -KEYBOARD_STEP },
      ArrowDown: { x: 0, y: KEYBOARD_STEP },
      ArrowLeft: { x: -KEYBOARD_STEP, y: 0 },
      ArrowRight: { x: KEYBOARD_STEP, y: 0 },
    }
    const delta = moves[event.key]
    if (!delta) return

    event.preventDefault()
    setShowHint(false)
    setPosition((prev) => clampPosition(prev.x + delta.x, prev.y + delta.y))
  }

  const hasContent = Boolean(selectedTemplate)

  if (!selectedTemplate) {
    return (
      <section className="step-section">
        <div className="step-header">
          <span className="step-number">{step}</span>
          <h2>Preview</h2>
        </div>
        <p className="section-subtitle">
          Choose a template above to preview your sign.
        </p>
      </section>
    )
  }

  const { width: tW, height: tH } = selectedTemplate.shape
  const scale = Math.min(MAX_WIDTH / tW, MAX_HEIGHT / tH)
  const previewWidth = Math.round(tW * scale)
  const previewHeight = Math.round(tH * scale)

  const showDraggableOutline = isHovered || isDragging

  return (
    <section className="step-section">
      <div className="step-header">
        <span className={`step-number${hasContent ? ' step-number--done' : ''}`}>{step}</span>
        <h2>Preview</h2>
      </div>
      <p className="section-subtitle">
        Drag the logo to position it, or use arrow keys for fine adjustments.
      </p>
      <div className="preview-stage">
        <div
          ref={setTemplateRef}
          className="preview-template"
          style={{ width: `${previewWidth}px`, height: `${previewHeight}px` }}
        >
          <div className="preview-header">
            <span className="preview-header__title">
              Fore Vision Golf Tournament
            </span>
            {foundationName && (
              <span className="preview-header__foundation">
                {foundationName}
              </span>
            )}
          </div>
          {logoUrl && (
            <img
              ref={logoRef}
              src={logoUrl}
              alt="Uploaded logo — use arrow keys to reposition"
              className={`preview-logo${
                showDraggableOutline ? ' preview-logo--active' : ''
              }`}
              style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                cursor: isDragging ? 'grabbing' : 'grab',
              }}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onKeyDown={handleKeyDown}
              tabIndex={0}
              role="img"
              draggable={false}
            />
          )}
          {logoUrl && showHint && (
            <span className="preview-drag-hint">
              Drag or use arrow keys to move logo
            </span>
          )}
        </div>
      </div>
    </section>
  )
}

export default PreviewCanvas
