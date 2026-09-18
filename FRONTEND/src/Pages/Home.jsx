import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../Components/Navbar'
import { motion } from 'framer-motion'

export const Home = () => {
  const { user } = useSelector((state) => state.user)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#090614] bg-theme-glow flex flex-col font-sans select-none text-white">
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-10 flex flex-col gap-12">
        
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col items-start gap-5 max-w-3xl pt-4"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-purple-500/30 text-xs text-purple-300 font-medium backdrop-blur-md shadow-lg shadow-purple-500/10"
          >
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse shadow-sm shadow-purple-400" />
            AI-Powered Mock Interviews
          </motion.div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Master your tech interviews with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-300">real-time AI feedback.</span>
          </h1>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl">
            Practice role-specific technical questions, receive instant scoring on logic and communication, and boost your confidence before the real interview.
          </p>

          <div className="flex items-center gap-4 pt-3 flex-wrap">
            {user ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
                className="btn-pill-glow px-7 py-3 text-sm cursor-pointer"
              >
                Start New Session
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/auth')}
                className="btn-pill-glow px-7 py-3 text-sm cursor-pointer"
              >
                Get Started Free
              </motion.button>
            )}

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-glass px-6 py-3 text-sm cursor-pointer"
            >
              View Sample Reports
            </motion.button>
          </div>
        </motion.section>

        {/* Feature Grid / Cards */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          
          {/* Card 1 - Active Highlight */}
          <motion.div 
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="glass-card-active p-7 flex flex-col gap-4 group relative overflow-hidden cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300 shadow-lg shadow-purple-500/20">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white">Coding & System Design</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Test your algorithmic problem-solving and architectural design capabilities across 500+ curated scenarios.
            </p>
            <div className="text-xs font-semibold text-purple-300 group-hover:text-cyan-300 flex items-center gap-1.5 mt-auto pt-2 transition-colors">
              Explore track <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="glass-card p-7 flex flex-col gap-4 group relative overflow-hidden cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/15 flex items-center justify-center text-indigo-300 group-hover:text-purple-300 transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white">Behavioral & Soft Skills</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Practice STAR method responses to situational leadership and conflict resolution questions with voice scoring.
            </p>
            <div className="text-xs font-semibold text-purple-300 group-hover:text-cyan-300 flex items-center gap-1.5 mt-auto pt-2 transition-colors">
              Explore track <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="glass-card p-7 flex flex-col gap-4 group relative overflow-hidden cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/15 flex items-center justify-center text-cyan-300 group-hover:text-purple-300 transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white">Detailed Analytics</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Review line-by-line feedback, time complexity breakdown, and actionable suggestions to refine your answers.
            </p>
            <div className="text-xs font-semibold text-purple-300 group-hover:text-cyan-300 flex items-center gap-1.5 mt-auto pt-2 transition-colors">
              Explore track <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </div>
          </motion.div>

        </motion.section>

        {/* Status / Activity Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass-card p-7 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex flex-col gap-1 text-center md:text-left">
            <span className="text-xs font-semibold text-purple-300 uppercase tracking-widest">Account Status</span>
            <span className="text-sm font-semibold text-white">
              {user ? `Logged in as ${user.name} (${user.email})` : 'Guest Session — Sign in to save interview history'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-full bg-white/[0.05] border border-white/12 text-xs text-gray-300 backdrop-blur-md">
              Platform status: <span className="text-cyan-300 font-bold">Operational</span>
            </div>
          </div>
        </motion.div>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 px-4 text-center text-xs text-gray-400 backdrop-blur-md">
        &copy; {new Date().getFullYear()} AI Interview Agent. Glowing Glassmorphic Design System.
      </footer>
    </div>
  )
}


