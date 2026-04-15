function PreviewCanvas({ selectedTemplate }) {
  return (
    <section className="component-section">
      <h2>Preview Canvas</h2>
      <p>
        {selectedTemplate
          ? `Selected template: ${selectedTemplate.name}`
          : 'Placeholder: live sign preview will render here.'}
      </p>
    </section>
  )
}

export default PreviewCanvas
