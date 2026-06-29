import { useState } from "react"
import UploadForm from "./components/UploadForm"
import Results from "./components/Results"

function App() {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)

  return (
    <div className="app">
      <h1>Plot Twist</h1>
      <p>Upload your CV and tell us your career goal.</p>
      <UploadForm setResults={setResults} setLoading={setLoading} />
      {loading && <p>Analyzing your CV...</p>}
      {results && <Results data={results} />}
    </div>
  )
}

export default App