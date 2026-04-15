import { useRef, useState } from 'react'

const ACCEPTED_TYPES = ['image/png', 'image/svg+xml', 'image/jpeg']

function LogoUpload({ onLogoUpload }) {
  const inputRef = useRef(null)
  const [fileName, setFileName] = useState(null)
  const [error, setError] = useState(null)

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError('Please upload a PNG, SVG, or JPG file.')
      setFileName(null)
      event.target.value = ''
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

  const triggerPicker = () => inputRef.current?.click()

  return (
    <section className="component-section">
      <h2>Logo Upload</h2>
      <p className="section-subtitle">
        Upload a PNG, SVG, or JPG logo to place on your sign.
      </p>
      <div className="logo-upload">
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/svg+xml,image/jpeg"
          className="logo-upload__input"
          onChange={handleFileChange}
        />
        <button
          type="button"
          className="logo-upload__button"
          onClick={triggerPicker}
        >
          Choose logo file
        </button>
        <span className="logo-upload__filename">
          {fileName ? fileName : 'No file selected'}
        </span>
      </div>
      {error && <p className="logo-upload__error">{error}</p>}
    </section>
  )
}

export default LogoUpload
