import { Navbar } from './Navbar'

export const Step3Report = ({ report }) => {
  const scores = report?.questionScores || report?.evaluations || []
  return (
    <div className="min-h-screen bg-[#090614] bg-theme-glow text-white">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-12">
        <div className="glass-card-active p-8">
          <p className="text-xs font-semibold text-purple-300 uppercase tracking-widest">Final report</p>
          <h1 className="text-3xl font-extrabold mt-3">Interview complete</h1>
          <p className="text-5xl font-bold text-cyan-300 mt-6">{report?.overallScore ?? 0}<span className="text-xl text-gray-400">/100</span></p>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <section><h2 className="font-bold">Strengths</h2><p className="text-sm text-gray-300 mt-2">{report?.strengths || 'Keep practicing to build a stronger profile.'}</p></section>
            <section><h2 className="font-bold">Improvement areas</h2><p className="text-sm text-gray-300 mt-2">{report?.improvementAreas || report?.weaknesses || 'Review each evaluation and practice the suggested topics.'}</p></section>
          </div>
          <div className="mt-8 flex flex-col gap-3">{scores.map((item, index) => <div key={item.question || index} className="glass-card p-4 text-sm"><span className="text-gray-300">Question {index + 1}</span><span className="float-right text-cyan-300 font-bold">{item.score ?? item.overallScore ?? 0}/100</span><p className="text-gray-400 mt-2">{item.feedback || item.comment || ''}</p></div>)}</div>
        </div>
      </main>
    </div>
  )
}
    