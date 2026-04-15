import { useEffect, useRef, useState } from 'react'

const MAX_WIDTH = 600
const MAX_HEIGHT = 500

function PreviewCanvas({ selectedTemplate, logoUrl, foundationName }) {
  const containerRef = useRef(null)
  const logoRef = useRef(null)
  const dragOffset = useRef({ x: 0, y: 0 })

  const [position, setPosition] = useState({ x: 20, y: 20 })
  const [isDragging, setIsDragging] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Reset logo position when the template or logo changes
  useEffect(() => {
    setPosition({ x: 20, y: 20 })
  }, [selectedTemplate?.id, logoUrl])

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
  }

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (event) => {
      const container = containerRef.current
      const logo = logoRef.current
      if (!container || !logo) return

      const containerRect = container.getBoundingClientRect()
      const logoRect = logo.getBoundingClientRect()

      let nextX = event.clientX - containerRect.left - dragOffset.current.x
      let nextY = event.clientY - containerRect.top - dragOffset.current.y

      const maxX = Math.max(0, containerRect.width - logoRect.width)
      const maxY = Math.max(0, containerRect.height - logoRect.height)

      nextX = Math.min(Math.max(nextX, 0), maxX)
      nextY = Math.min(Math.max(nextY, 0), maxY)

      setPosition({ x: nextX, y: nextY })
    }

    const handleMouseUp = () => setIsDragging(false)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging])

  if (!selectedTemplate) {
    return (
      <section className="component-section">
        <h2>Preview Canvas</h2>
        <p>Choose a template above to preview your sign.</p>
      </section>
    )
  }

  const { width: tW, height: tH } = selectedTemplate.shape
  // Fit the preview within MAX_WIDTH x MAX_HEIGHT while preserving aspect ratio
  const scale = Math.min(MAX_WIDTH / tW, MAX_HEIGHT / tH)
  const previewWidth = Math.round(tW * scale)
  const previewHeight = Math.round(tH * scale)

  const showDraggableOutline = isHovered || isDragging

  return (
    <section className="component-section">
      <h2>Preview Canvas</h2>
      <p className="section-subtitle">
        Drag the logo inside the sign to position it.
      </p>
      <div className="preview-stage">
        <div
          ref={containerRef}
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
              alt="Uploaded logo"
              className={`preview-logo${
                showDraggableOutline ? ' preview-logo--active' : ''
              }`}
              style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                cursor: isDragging ? 'grabbing' : 'grab',
              }}
              onMouseDown={handleMouseDown}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              draggable={false}
            />
          )}
        </div>
      </div>
    </section>
  )
}

export default PreviewCanvas
