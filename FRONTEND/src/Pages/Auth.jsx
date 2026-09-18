import { signInWithPopup } from 'firebase/auth'
import { useState } from 'react'
import { auth, provider } from '../utils/firebase'
import api from '../services/api'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/userslice'
import { useNavigate } from 'react-router-dom'

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [authError, setAuthError] = useState('')
  const [googleLoading, setGoogleLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleGoogleLogin = async () => {
    setAuthError('')
    setGoogleLoading(true)
    try {
      const response = await signInWithPopup(auth, provider)
      const idToken = await response.user.getIdToken()
      const result = await api.post('/api/auth/google', { idToken })
      dispatch(setUser(result.data))
      navigate('/')
    } catch (error) {
      dispatch(setUser(null))
      console.error('Google login error:', error)
      setAuthError(error.response?.data?.message || 'Google sign-in failed. Please try again.')
    } finally {
      setGoogleLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isLogin) {
      console.log('Login data:', { email: formData.email, password: formData.password })
    } else {
      console.log('Signup data:', formData)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#090614] bg-theme-glow px-4 py-8 select-none text-white">
      
      {/* Brand Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-purple-500 via-indigo-500 to-cyan-400 p-px shadow-lg shadow-purple-500/25">
          <div className="w-full h-full rounded-2xl bg-[#090614] flex items-center justify-center">
            <svg className="w-5 h-5 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>
        <span className="text-xl font-bold tracking-tight text-white">
          AI Interview Agent
        </span>
      </div>

      {/* Glassmorphic Auth Card */}
      <div className="w-full max-w-105 glass-card-active p-8 shadow-2xl shadow-purple-950/50 relative">
        
        {/* Subtle Ambient Accent Bar */}
        <div className="absolute inset-x-0 -top-px h-0.5 bg-linear-to-r from-transparent via-purple-400/80 to-transparent rounded-t-2xl" />

        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h1>
          <p className="text-xs text-gray-300 mt-2">
            {isLogin
              ? 'Enter your credentials to access your account'
              : 'Sign up to start practicing AI interviews'}
          </p>
        </div>

        {/* Form */}
        {authError && (
          <p className="mb-4 text-xs text-red-400 text-center">{authError}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <div>
              <label className="text-xs font-semibold text-gray-300 mb-1.5 block">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full px-4 py-3 text-sm glass-input"
              />
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-gray-300 mb-1.5 block">Email address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-3 text-sm glass-input"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-gray-300">Password</label>
              {isLogin && (
                <button
                  type="button"
                  className="text-xs text-purple-300 hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 text-sm glass-input"
            />
          </div>

          {/* Glowing Pill Submit Button */}
          <button
            type="submit"
            className="btn-pill-glow w-full mt-2 py-3 px-4 text-sm font-semibold cursor-pointer"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-white/10"></div>
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">OR</span>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        {/* Continue with Google (Glass Pill) */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          className="btn-glass w-full flex items-center justify-center gap-3 py-3 px-4 text-sm font-medium text-white cursor-pointer disabled:opacity-60"
        >
          <svg className="w-4 h-4" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
            <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
            <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
            <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571.001-.001.002-.001.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
          </svg>
          {googleLoading ? 'Signing in...' : 'Continue with Google'}
        </button>

        {/* Toggle Link */}
        <p className="text-center text-xs text-gray-400 mt-6">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-purple-300 font-semibold hover:text-cyan-300 transition-colors cursor-pointer ml-1"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>

      {/* Footer text */}
      <p className="text-[11px] text-gray-400 mt-6">
        Protected by enterprise-grade encryption
      </p>
    </div>
  )
}

