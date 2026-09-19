import { useState } from 'react'
import { Navbar } from './Navbar'
import api from '../services/api'

export const Step2Interview = ({ interviewData, onfinish }) => {
  const [answer, setAnswer] = useState('')
  const [current, setCurrent] = useState(interviewData.currentQuestion || interviewData.questions?.[0])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (event) => {
    event.preventDefault()
    if (!answer.trim()) return setError('Please enter an answer before continuing.')
    setLoading(true)
    setError('')
    try {
      const result = await api.post(`/api/interviews/${interviewData._id}/answers`, { answer })
      setAnswer('')
      if (result.data.status === 'completed') onfinish(result.data.report || result.data)
      else setCurrent(result.data.currentQuestion)
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to evaluate this answer.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#090614] bg-theme-glow text-white">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-8 py-12">
        <div className="glass-card-active p-8">
          <p className="text-xs font-semibold text-purple-300 uppercase tracking-widest">Live interview</p>
          <h1 className="text-2xl font-extrabold mt-3">{current?.question || current}</h1>
          <form onSubmit={submit} className="mt-8 flex flex-col gap-4">
            <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} rows={8} placeholder="Type your answer..." className="w-full glass-input p-4 text-sm resize-y" />
            {error && <p className="text-xs text-red-400">{error}</p>}
            <button disabled={loading} className="btn-pill-glow px-6 py-3 text-sm disabled:opacity-60">
              {loading ? 'Evaluating...' : 'Submit answer'}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
