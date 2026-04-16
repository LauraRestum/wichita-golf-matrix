const TEMPLATES = [
  {
    id: 'sponsor-landscape',
    name: 'Sponsor Sign (Landscape)',
    dimensions: '30 x 18 in',
    shape: { width: 120, height: 80 },
  },
  {
    id: 'sponsor-portrait',
    name: 'Sponsor Sign (Portrait)',
    dimensions: '18 x 30 in',
    shape: { width: 80, height: 120 },
  },
  {
    id: 'vip-welcome',
    name: 'VIP Welcome Sign',
    dimensions: '30 x 30 in',
    shape: { width: 120, height: 80 },
  },
  {
    id: 'rules-info',
    name: 'Rules / Info Sign',
    dimensions: '24 x 36 in',
    shape: { width: 90, height: 120 },
  },
  {
    id: 'corporate-partners',
    name: 'Corporate Partners Board',
    dimensions: '48 x 24 in',
    shape: { width: 140, height: 70 },
  },
]

function TemplatePicker({ step, selectedId, onSelect }) {
  return (
    <section className="step-section">
      <div className="step-header">
        <span className={`step-number${selectedId ? ' step-number--done' : ''}`}>{step}</span>
        <h2>Choose a Template</h2>
      </div>
      <p className="section-subtitle">
        Select the sign format that matches your placement.
      </p>
      <div className="template-grid">
        {TEMPLATES.map((template) => {
          const isSelected = selectedId === template.id
          return (
            <button
              key={template.id}
              type="button"
              className={`template-card${isSelected ? ' template-card--selected' : ''}`}
              onClick={() => onSelect(template)}
              aria-pressed={isSelected}
            >
              <div className="template-preview">
                <div
                  className="template-shape"
                  style={{
                    width: `${template.shape.width}px`,
                    height: `${template.shape.height}px`,
                  }}
                />
              </div>
              <span className="template-name">{template.name}</span>
              <span className="template-dimensions">{template.dimensions}</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default TemplatePicker
export { TEMPLATES }
