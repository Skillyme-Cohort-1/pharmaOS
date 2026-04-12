import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { useToast } from './ToastContext'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const toast = useToast()

  // Set default auth header whenever token changes
  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      localStorage.setItem('token', token)
    } else {
      delete api.defaults.headers.common['Authorization']
      localStorage.removeItem('token')
    }
  }, [token])

  // Initial load - verify token
  useEffect(() => {
    const verifyUser = async () => {
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const res = await api.get('/auth/me')
        setUser(res.data)
      } catch (err) {
        setToken(null)
        setUser(null)
        toast.error('Session expired. Please log in again.')
        navigate('/login', { replace: true })
      } finally {
        setLoading(false)
      }
    }

    verifyUser()
  }, [token, navigate, toast])

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password })
      const { user: userData, token: jwt } = res.data
      
      // Synchronously set local storage BEFORE navigating to prevent race conditions
      localStorage.setItem('token', jwt)
      api.defaults.headers.common['Authorization'] = `Bearer ${jwt}`
      
      setToken(jwt)
      setUser(userData)
      navigate('/', { replace: true })
      toast.success(`Welcome back, ${userData.name || userData.email}!`)
      return true
    } catch (err) {
      toast.error(err.message || 'Login failed')
      return false
    }
  }

  const logout = () => {
    api.post('/auth/logout').catch(() => {}) // Fire and forget
    setToken(null)
    setUser(null)
    navigate('/login', { replace: true })
    toast.info('Logged out successfully')
  }

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    loading,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
