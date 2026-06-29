function UploadForm({ setResults, setLoading }) {
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData()
    formData.append("file", e.target.file.files[0])
    formData.append("goal", e.target.goal.value)

    const response = await fetch("http://localhost:8000/analyze", {
      method: "POST",
      body: formData
    })

    const data = await response.json()
    setResults(data)
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Upload your CV (PDF)</label>
        <input type="file" name="file" accept=".pdf" required />
      </div>
      <div>
        <label>Your career goal</label>
        <input type="text" name="goal" placeholder="e.g. Become a senior ML engineer" required />
      </div>
      <button type="submit">Analyze</button>
    </form>
  )
}

export default UploadForm