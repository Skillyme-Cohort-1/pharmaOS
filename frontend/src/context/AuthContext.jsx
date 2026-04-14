import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { useToast } from './ToastContext'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'))
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const toast = useToast()

  // Helper function to decode JWT and check expiry
  const decodeToken = (token) => {
    try {
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )
      return JSON.parse(jsonPayload)
    } catch (error) {
      return null
    }
  }

  // Proactive token refresh before expiry
  useEffect(() => {
    if (!token) return

    const decoded = decodeToken(token)
    if (!decoded || !decoded.exp) return

    const currentTime = Date.now() / 1000
    const timeUntilExpiry = decoded.exp - currentTime
    // Refresh 2 minutes before expiry
    const refreshTime = Math.max(0, (timeUntilExpiry - 120) * 1000)

    if (refreshTime > 0) {
      const refreshTimer = setTimeout(async () => {
        try {
          const storedRefreshToken = localStorage.getItem('refreshToken')
          if (!storedRefreshToken) return

          const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken: storedRefreshToken }),
          })

          if (!response.ok) throw new Error('Refresh failed')

          const result = await response.json()
          const { token: newToken, refreshToken: newRefreshToken } = result.data

          localStorage.setItem('token', newToken)
          localStorage.setItem('refreshToken', newRefreshToken)
          setToken(newToken)
          setRefreshToken(newRefreshToken)
        } catch (error) {
          // Silent fail - the interceptor will handle it on next request
        }
      }, refreshTime)

      return () => clearTimeout(refreshTimer)
    }
  }, [token])

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

  // Store refresh token when it changes
  useEffect(() => {
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken)
    } else {
      localStorage.removeItem('refreshToken')
    }
  }, [refreshToken])

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
        // If verification fails, the API interceptor will handle refresh
        // If refresh also fails, it will redirect to login
        // Just clear local state here
        setToken(null)
        setRefreshToken(null)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    verifyUser()
  }, [token])

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password })
      const { user: userData, token: jwt, refreshToken: refreshJwt } = res.data

      // Synchronously set local storage BEFORE navigating to prevent race conditions
      localStorage.setItem('token', jwt)
      localStorage.setItem('refreshToken', refreshJwt)
      api.defaults.headers.common['Authorization'] = `Bearer ${jwt}`

      setToken(jwt)
      setRefreshToken(refreshJwt)
      setUser(userData)
      navigate('/', { replace: true })
      toast.success(`Welcome back, ${userData.name || userData.email}!`)
      return true
    } catch (err) {
      toast.error(err.message || 'Login failed')
      return false
    }
  }

  const logout = useCallback(() => {
    const currentRefreshToken = localStorage.getItem('refreshToken')
    api.post('/auth/logout', { refreshToken: currentRefreshToken })
      .catch(() => {}) // Fire and forget
    
    setToken(null)
    setRefreshToken(null)
    setUser(null)
    navigate('/login', { replace: true })
    toast.info('Logged out successfully')
  }, [navigate, toast])

  const value = {
    user,
    token,
    refreshToken,
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
