import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ServerUrl } from '../App'
import { setUser } from '../redux/userslice'
import { motion } from 'framer-motion'

export const Navbar = () => {
  const { user } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axios.get(ServerUrl + 'api/auth/logout', { withCredentials: true })
      dispatch(setUser(null))
      window.location.reload()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-full bg-[#090614]/70 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 px-4 sm:px-8 py-3.5 select-none"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div 
            whileHover={{ rotate: 12, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className="w-9 h-9 rounded-2xl bg-linear-to-br from-purple-500 via-indigo-500 to-cyan-400 p-px shadow-lg shadow-purple-500/20"
          >
            <div className="w-full h-full rounded-2xl bg-[#090614] flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-400 group-hover:text-cyan-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </motion.div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-white group-hover:text-purple-300 transition-colors">
              AI Interview Agent
            </span>
          </div>
        </Link>

        {/* User Stats & Controls */}
        <div className="flex items-center gap-3">
          
          {/* User Credits Badge */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-linear-to-r from-purple-500/10 via-indigo-500/10 to-cyan-500/10 border border-purple-500/30 backdrop-blur-md text-xs shadow-sm shadow-purple-500/10"
          >
            <span className="text-amber-400 text-sm">⚡</span>
            <span className="text-gray-300 font-medium hidden sm:inline">Credits:</span>
            <span className="font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-300 to-purple-300">
              {user ? (user.credit ?? 0) : 0}
            </span>
          </motion.div>

          {user ? (
            <>
              {/* User Pill Avatar */}
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/6 border border-white/12 backdrop-blur-md text-xs text-white"
              >
                <div className="w-6 h-6 rounded-full bg-linear-to-tr from-purple-600 via-indigo-600 to-blue-500 flex items-center justify-center text-[10px] font-bold text-white uppercase ring-2 ring-purple-400/40">
                  {user.name ? user.name[0] : 'U'}
                </div>
                <span className="hidden md:inline max-w-30 truncate font-medium">
                  {user.name}
                </span>
              </motion.div>

              {/* Logout Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="btn-glass px-4 py-1.5 text-xs font-medium cursor-pointer"
              >
                Logout
              </motion.button>
            </>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/auth')}
              className="btn-pill-glow px-5 py-2 text-xs cursor-pointer"
            >
              Sign In
            </motion.button>
          )}
        </div>
      </div>
    </motion.nav>
  )
}
