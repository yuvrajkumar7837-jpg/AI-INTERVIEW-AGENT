import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../services/api'

export const InterviewPage = () => {
  const { id } = useParams(); const navigate = useNavigate()
  const [interview, setInterview] = useState(null); const [answer, setAnswer] = useState(''); const [index, setIndex] = useState(0); const [busy, setBusy] = useState(false); const [error, setError] = useState('')
  useEffect(() => { api.get(`/api/user/interviews/${id}`).then((response) => { setInterview(response.data); const first = response.data.questions.findIndex((q) => !q.answer); setIndex(first < 0 ? 0 : first) }).catch((err) => setError(err.response?.data?.message || 'Unable to load interview')) }, [id])
  if (!interview) return <main className="p-8 text-white">{error || 'Loading interview...'}</main>
  const question = interview.questions[index]
  const submit = async (event) => {
    event.preventDefault(); setBusy(true); setError('')
    try {
      await api.post(`/api/user/interviews/${id}/answers`, { questionIndex: index, answer })
      if (index + 1 < interview.questions.length) { setInterview((current) => ({ ...current, questions: current.questions.map((q, i) => i === index ? { ...q, answer } : q) })); setIndex(index + 1); setAnswer('') }
      else { const report = await api.post(`/api/user/interviews/${id}/complete`); navigate(`/report/${report.data._id}`) }
    } catch (err) { setError(err.response?.data?.message || 'Could not submit answer') } finally { setBusy(false) }
  }
  return <main className="mx-auto max-w-3xl p-6 text-white"><p className="text-sm text-purple-300">Question {index + 1} of {interview.questions.length} · {question.category}</p><h1 className="mt-4 text-2xl font-bold">{question.question}</h1>{error && <p className="mt-4 text-red-300">{error}</p>}<form onSubmit={submit} className="mt-6"><textarea required value={answer} onChange={(event) => setAnswer(event.target.value)} rows="8" className="glass-input w-full p-4" placeholder="Write your answer..." /><button disabled={busy} className="btn-pill-glow mt-4 px-6 py-3">{busy ? 'Evaluating...' : index + 1 === interview.questions.length ? 'Finish interview' : 'Submit answer'}</button></form></main>
}
