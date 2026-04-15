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

  return (
    <div className="app">
      <header className="app-header">
        <h1>Fore Vision Sign Builder</h1>
      </header>
      <main className="app-main">
        <section className="component-section">
          <h2>Foundation Name</h2>
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
          selectedId={selectedTemplate?.id}
          onSelect={setSelectedTemplate}
        />
        <LogoUpload onLogoUpload={setLogoUrl} />
        <PreviewCanvas
          selectedTemplate={selectedTemplate}
          logoUrl={logoUrl}
          foundationName={foundationName}
          previewRef={previewRef}
        />
        {canExport && <ExportBar previewRef={previewRef} />}
      </main>
    </div>
  )
}

export default App
