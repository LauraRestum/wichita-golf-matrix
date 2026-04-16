import { useRef, useState } from 'react'

const ACCEPTED_TYPES = ['image/png', 'image/svg+xml', 'image/jpeg']

function LogoUpload({ step, logoUrl, onLogoUpload }) {
  const inputRef = useRef(null)
  const [fileName, setFileName] = useState(null)
  const [error, setError] = useState(null)
  const [isDragOver, setIsDragOver] = useState(false)

  const processFile = (file) => {
    if (!file) return

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError('Please upload a PNG, SVG, or JPG file.')
      setFileName(null)
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setError(null)
      setFileName(file.name)
      onLogoUpload?.(reader.result)
    }
    reader.onerror = () => {
      setError('Could not read file. Please try again.')
    }
    reader.readAsDataURL(file)
  }

  const handleFileChange = (event) => {
    processFile(event.target.files?.[0])
    event.target.value = ''
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setIsDragOver(false)
    processFile(event.dataTransfer.files?.[0])
  }

  const handleDragOver = (event) => {
    event.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleRemove = () => {
    setFileName(null)
    setError(null)
    onLogoUpload?.(null)
  }

  const triggerPicker = () => inputRef.current?.click()

  return (
    <section className="step-section">
      <div className="step-header">
        <span className={`step-number${logoUrl ? ' step-number--done' : ''}`}>{step}</span>
        <h2>Upload Logo</h2>
      </div>
      <p className="section-subtitle">
        Add a PNG, SVG, or JPG logo to place on your sign.
      </p>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/svg+xml,image/jpeg"
        className="logo-upload__input"
        onChange={handleFileChange}
        aria-label="Upload logo file"
      />
      {!logoUrl ? (
        <div
          className={`logo-upload__dropzone${isDragOver ? ' logo-upload__dropzone--active' : ''}`}
          onClick={triggerPicker}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              triggerPicker()
            }
          }}
        >
          <span className="logo-upload__dropzone-text">
            <strong>Click to browse</strong> or drag a file here
          </span>
          <span className="logo-upload__dropzone-hint">
            PNG, SVG, or JPG
          </span>
        </div>
      ) : (
        <div className="logo-upload__file-info">
          <span className="logo-upload__filename">
            {fileName || 'Uploaded logo'}
          </span>
          <button
            type="button"
            className="logo-upload__remove"
            onClick={handleRemove}
          >
            Remove
          </button>
        </div>
      )}
      {error && <p className="logo-upload__error">{error}</p>}
    </section>
  )
}

export default LogoUpload
