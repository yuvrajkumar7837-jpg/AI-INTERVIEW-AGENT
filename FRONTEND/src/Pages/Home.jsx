import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../Components/Navbar'
import api from '../services/api'

export const Home = () => {
  const { user } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const [resumes, setResumes] = useState([])
  const [file, setFile] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) return
    api.get('/api/user/resumes').then((response) => setResumes(response.data)).catch(() => setError('Unable to load resumes'))
  }, [user])

  const upload = async (event) => {
    event.preventDefault()
    if (!file) return
    setBusy(true); setError('')
    try {
      const data = new FormData(); data.append('resume', file)
      const response = await api.post('/api/user/resumes', data)
      setResumes((current) => [response.data, ...current]); setFile(null); event.target.reset()
    } catch (err) { setError(err.response?.data?.message || 'Resume processing failed') } finally { setBusy(false) }
  }

  const start = async (resumeId) => {
    setBusy(true); setError('')
    try {
      const response = await api.post('/api/user/interviews', { resumeId })
      navigate(`/interview/${response.data._id}`)
    } catch (err) { setError(err.response?.data?.message || 'Could not create interview') } finally { setBusy(false) }
  }

  if (!user) return <><Navbar /><main className="p-8 text-white"><h1 className="text-3xl font-bold">Practice interviews with your resume</h1><button className="btn-pill-glow mt-6 px-6 py-3" onClick={() => navigate('/auth')}>Continue with Google</button></main></>
  return <><Navbar /><main className="mx-auto max-w-4xl p-6 text-white"><h1 className="text-3xl font-bold">Interview dashboard</h1><p className="mt-2 text-gray-300">Upload a PDF resume to generate a personalized interview.</p>
    {error && <p className="mt-4 rounded bg-red-500/20 p-3 text-red-200">{error}</p>}
    <form onSubmit={upload} className="glass-card mt-6 flex flex-wrap items-center gap-4 p-5"><input type="file" accept="application/pdf,.pdf" onChange={(event) => setFile(event.target.files[0])} className="text-sm" /><button disabled={!file || busy} className="btn-pill-glow px-5 py-2 disabled:opacity-50">{busy ? 'Processing...' : 'Upload resume'}</button></form>
    <section className="mt-8 space-y-4"><h2 className="text-xl font-semibold">Your resumes</h2>{resumes.length === 0 && <p className="text-gray-400">No resumes uploaded yet.</p>}{resumes.map((resume) => <article key={resume._id} className="glass-card flex items-center justify-between gap-4 p-5"><div><h3 className="font-semibold">{resume.filename}</h3><p className="mt-1 text-xs text-gray-400">{resume.extractedData?.skills?.slice(0, 5).join(', ') || 'Resume processed'}</p></div><button disabled={busy} onClick={() => start(resume._id)} className="btn-glass px-4 py-2 text-sm disabled:opacity-50">Start interview</button></article>)}</section>
  </main></>
}
