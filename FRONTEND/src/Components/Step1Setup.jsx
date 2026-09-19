import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar } from './Navbar'
import api from '../services/api'

export const Step1Setup = ({ onstart }) => {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const start = async (event) => {
    event.preventDefault()
    if (!file) return setError('Choose a PDF or DOCX resume first.')
    setLoading(true)
    setError('')
    try {
      const formData = new FormData()
      formData.append('resume', file)
      const upload = await api.post('/api/interviews/resume', formData)
      const interview = await api.post('/api/interviews', { resumeId: upload.data.resume._id })
      onstart(interview.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to prepare your interview.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#090614] bg-theme-glow text-white">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-8 py-12">
        <div className="glass-card-active p-8">
          <p className="text-xs font-semibold text-purple-300 uppercase tracking-widest">Interview setup</p>
          <h1 className="text-3xl font-extrabold mt-3">Upload your resume</h1>
          <p className="text-sm text-gray-300 mt-2">Your resume is used to create questions tailored to your real experience.</p>
          <form onSubmit={start} className="mt-8 flex flex-col gap-5">
            <label className="glass-input p-6 border-dashed cursor-pointer">
              <span className="text-sm text-gray-200">{file ? file.name : 'Choose a PDF resume (max 10 MB)'}</span>
              <input type="file" accept=".pdf,application/pdf" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            </label>
            {error && <p className="text-xs text-red-400">{error}</p>}
            <button disabled={loading} className="btn-pill-glow px-6 py-3 text-sm disabled:opacity-60">
              {loading ? 'Analyzing resume...' : 'Generate my interview'}
            </button>
            <button type="button" onClick={() => navigate('/')} className="btn-glass px-6 py-3 text-sm">Back</button>
          </form>
        </div>
      </main>
    </div>
  )
}
