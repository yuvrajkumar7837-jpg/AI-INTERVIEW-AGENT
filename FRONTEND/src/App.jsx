import { Route, Routes } from 'react-router-dom'
import { Home } from './Pages/Home'
import { Auth } from './Pages/Auth'
import { useEffect } from 'react'
import { setUser } from './redux/userslice'
import { useDispatch } from 'react-redux'
import api from './services/api'
import { InterviewPage } from './Pages/InterviewPage'
import { InterviewReport } from './Pages/InterviewReport'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const res = await api.get('/api/user/current')
        dispatch(setUser(res.data))
      } catch (error) {
        if (error.response?.status !== 401) {
          console.error('Error fetching current user:', error)
        }
        dispatch(setUser(null))
      }
    }

    getCurrentUser()
  }, [dispatch])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/interview/:id" element={<InterviewPage />} />
      <Route path="/report/:id" element={<InterviewReport />} />
    </Routes>
  )
}

export default App
