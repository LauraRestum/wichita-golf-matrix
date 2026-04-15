import { useState } from 'react'
import TemplatePicker from './components/TemplatePicker'
import LogoUpload from './components/LogoUpload'
import PreviewCanvas from './components/PreviewCanvas'
import ExportBar from './components/ExportBar'
import './App.css'

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(null)

  return (
    <div className="app">
      <header className="app-header">
        <h1>Fore Vision Sign Builder</h1>
      </header>
      <main className="app-main">
        <TemplatePicker
          selectedId={selectedTemplate?.id}
          onSelect={setSelectedTemplate}
        />
        <LogoUpload />
        <PreviewCanvas selectedTemplate={selectedTemplate} />
        <ExportBar />
      </main>
    </div>
  )
}

export default App
