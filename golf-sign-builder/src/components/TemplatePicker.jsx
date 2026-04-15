const TEMPLATES = [
  {
    id: 'sponsor-landscape',
    name: 'Sponsor Sign (Landscape)',
    shape: { width: 120, height: 80 },
  },
  {
    id: 'sponsor-portrait',
    name: 'Sponsor Sign (Portrait)',
    shape: { width: 80, height: 120 },
  },
  {
    id: 'vip-welcome',
    name: 'VIP Welcome Sign',
    shape: { width: 120, height: 80 },
  },
  {
    id: 'rules-info',
    name: 'Rules/Info Sign',
    shape: { width: 90, height: 120 },
  },
  {
    id: 'corporate-partners',
    name: 'Corporate Partners Board',
    shape: { width: 140, height: 70 },
  },
]

function TemplatePicker({ selectedId, onSelect }) {
  return (
    <section className="component-section">
      <h2>Template Picker</h2>
      <p className="section-subtitle">Choose a sign format to get started.</p>
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
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default TemplatePicker
export { TEMPLATES }
