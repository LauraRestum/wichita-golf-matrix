import { useRef, useState } from 'react'
import TemplatePicker from './components/TemplatePicker'
import LogoUpload from './components/LogoUpload'
import PreviewCanvas from './components/PreviewCanvas'
import ExportBar from './components/ExportBar'
import './App.css'

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [logoUrl, setLogoUrl] = useState(null)
  const [foundationName, setFoundationName] = useState('')

  const previewRef = useRef(null)

  const canExport = Boolean(selectedTemplate && logoUrl)
  const hasAnyInput = Boolean(selectedTemplate || logoUrl || foundationName)

  const handleReset = () => {
    setSelectedTemplate(null)
    setLogoUrl(null)
    setFoundationName('')
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Fore Vision Sign Builder</h1>
      </header>
      <main className="app-main">
        <section className="step-section">
          <div className="step-header">
            <span className={`step-number${foundationName ? ' step-number--done' : ''}`}>1</span>
            <h2>Foundation Name</h2>
          </div>
          <p className="section-subtitle">
            This appears under the Fore Vision header on every sign.
          </p>
          <label className="foundation-field">
            <span className="foundation-field__label">Foundation name</span>
            <input
              type="text"
              className="foundation-field__input"
              placeholder="e.g. Wichita Foundation"
              value={foundationName}
              onChange={(event) => setFoundationName(event.target.value)}
            />
          </label>
        </section>
        <TemplatePicker
          step={2}
          selectedId={selectedTemplate?.id}
          onSelect={setSelectedTemplate}
        />
        <LogoUpload
          step={3}
          logoUrl={logoUrl}
          onLogoUpload={setLogoUrl}
        />
        <PreviewCanvas
          step={4}
          selectedTemplate={selectedTemplate}
          logoUrl={logoUrl}
          foundationName={foundationName}
          previewRef={previewRef}
        />
        <ExportBar
          step={5}
          previewRef={previewRef}
          canExport={canExport}
        />
        {hasAnyInput && (
          <div className="reset-bar">
            <button
              type="button"
              className="reset-bar__button"
              onClick={handleReset}
            >
              Start over
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
