import { signInWithPopup } from 'firebase/auth'
import { useState } from 'react'
import { auth, provider } from '../utils/firebase'
import api from '../services/api'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/userslice'
import { useNavigate } from 'react-router-dom'

export const Auth = () => {
  const [loading, setLoading] = useState(false); const [error, setError] = useState('')
  const dispatch = useDispatch(); const navigate = useNavigate()
  const login = async () => {
    setLoading(true); setError('')
    try {
      const result = await signInWithPopup(auth, provider)
      const idToken = await result.user.getIdToken()
      const response = await api.post('/api/auth/google', { idToken })
      dispatch(setUser(response.data)); navigate('/')
    } catch (err) { dispatch(setUser(null)); setError(err.response?.data?.message || 'Google sign-in failed') } finally { setLoading(false) }
  }
  return <main className="flex min-h-screen items-center justify-center bg-[#090614] px-4 text-white"><section className="glass-card-active w-full max-w-md p-8 text-center"><h1 className="text-2xl font-bold">AI Interview Agent</h1><p className="mt-3 text-gray-300">Sign in with Google to practice personalized interviews.</p>{error && <p className="mt-4 text-sm text-red-300">{error}</p>}<button onClick={login} disabled={loading} className="btn-pill-glow mt-6 w-full py-3 disabled:opacity-50">{loading ? 'Signing in...' : 'Continue with Google'}</button></section></main>
}
