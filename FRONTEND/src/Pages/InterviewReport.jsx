import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api'

export const InterviewReport = () => {
  const { id } = useParams(); const [report, setReport] = useState(null); const [error, setError] = useState('')
  useEffect(() => { api.get(`/api/user/reports/${id}`).then((response) => setReport(response.data)).catch((err) => setError(err.response?.data?.message || 'Unable to load report')) }, [id])
  if (!report) return <main className="p-8 text-white">{error || 'Loading report...'}</main>
  return <main className="mx-auto max-w-4xl p-6 text-white"><h1 className="text-3xl font-bold">Interview report</h1><div className="glass-card mt-6 p-6"><p className="text-5xl font-bold text-cyan-300">{report.overallScore}<span className="text-xl text-gray-400">/100</span></p><p className="mt-4">{report.finalFeedback}</p><div className="mt-6 grid gap-4 md:grid-cols-2"><div><h2 className="font-semibold">Strengths</h2><ul className="list-disc pl-5 text-gray-300">{report.strengths.map((item) => <li key={item}>{item}</li>)}</ul></div><div><h2 className="font-semibold">Weaknesses</h2><ul className="list-disc pl-5 text-gray-300">{report.weaknesses.map((item) => <li key={item}>{item}</li>)}</ul></div></div><h2 className="mt-6 font-semibold">Improvement topics</h2><p className="text-gray-300">{report.improvementTopics.join(', ') || 'Keep practicing'}</p></div></main>
}
