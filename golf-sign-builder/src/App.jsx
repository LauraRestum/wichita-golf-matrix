import TemplatePicker from './components/TemplatePicker'
import LogoUpload from './components/LogoUpload'
import PreviewCanvas from './components/PreviewCanvas'
import ExportBar from './components/ExportBar'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Fore Vision Sign Builder</h1>
      </header>
      <main className="app-main">
        <TemplatePicker />
        <LogoUpload />
        <PreviewCanvas />
        <ExportBar />
      </main>
    </div>
  )
}

export default App
