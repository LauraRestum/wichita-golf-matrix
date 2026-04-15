import { useState } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

function ExportBar({ previewRef }) {
  const [isExporting, setIsExporting] = useState(false)
  const [error, setError] = useState(null)

  const handleDownloadPdf = async () => {
    const node = previewRef?.current
    if (!node) {
      setError('Nothing to export yet.')
      return
    }

    setIsExporting(true)
    setError(null)

    try {
      const canvas = await html2canvas(node, {
        scale: 3,
        backgroundColor: '#ffffff',
        useCORS: true,
      })

      const imgData = canvas.toDataURL('image/png')
      const widthPt = canvas.width
      const heightPt = canvas.height

      const pdf = new jsPDF({
        orientation: widthPt >= heightPt ? 'landscape' : 'portrait',
        unit: 'pt',
        format: [widthPt, heightPt],
      })

      pdf.addImage(imgData, 'PNG', 0, 0, widthPt, heightPt)
      pdf.save('fore-vision-sign.pdf')
    } catch (err) {
      console.error('PDF export failed:', err)
      setError('Sorry, the PDF export failed. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <section className="component-section">
      <h2>Export</h2>
      <p className="section-subtitle">
        Download your sign as a print-ready PDF.
      </p>
      <div className="export-bar">
        <button
          type="button"
          className="export-bar__button export-bar__button--primary"
          onClick={handleDownloadPdf}
          disabled={isExporting}
        >
          {isExporting ? 'Preparing PDF…' : 'Download PDF'}
        </button>
        <button
          type="button"
          className="export-bar__button export-bar__button--secondary"
          disabled
          title="Coming soon"
        >
          Save to Matrix
        </button>
      </div>
      {error && <p className="export-bar__error">{error}</p>}
    </section>
  )
}

export default ExportBar
