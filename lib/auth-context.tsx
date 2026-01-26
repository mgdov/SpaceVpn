"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  loginUser as apiLoginUser,
  logoutUser as apiLogoutUser,
  registerUser as apiRegisterUser,
  isAuthenticated,
} from './api/auth'
import {
  getCurrentUser as apiGetCurrentUser,
  getStoredUser,
} from './api/users'
import { setAuthToken } from './api/client'
import type { User } from '@/types/api'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  register: (username: string, email: string, password: string, fullName?: string) => Promise<{ success: boolean; error?: string }>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Load user on mount
  useEffect(() => {
    const loadUser = async () => {
      if (isAuthenticated()) {
        // Try to load from localStorage first
        const storedUser = getStoredUser()
        if (storedUser) {
          setUser(storedUser)
        }

        // Then refresh from API
        const response = await apiGetCurrentUser()
        if (response.data) {
          setUser(response.data)
        } else if (response.status === 401 || response.status === 403) {
          // Token expired or invalid — очищаем
          apiLogoutUser()
          setUser(null)
        } else {
          // Бэкенд недоступен/ошибка — оставляем локальное состояние
          if (!storedUser) {
            setUser(null)
          }
        }
      }
      setLoading(false)
    }

    loadUser()
  }, [])

  const login = async (username: string, password: string) => {
    setLoading(true)

    // Offline fallback for demo credentials
    if (username === 'test' && password === 'test123') {
      const now = new Date().toISOString()
      const demoUser: User = {
        id: 0,
        username: 'test',
        email: 'test@example.com',
        full_name: 'Test User',
        is_active: true,
        is_superuser: false,
        created_at: now,
        updated_at: now,
      }

      setAuthToken('test_token_12345')
      if (typeof window !== 'undefined') {
        localStorage.setItem('current_user', JSON.stringify(demoUser))
      }
      setUser(demoUser)
      setLoading(false)
      return { success: true }
    }

    try {
      const response = await apiLoginUser(username, password)

      if (response.data) {
        // Get user info after login
        const userResponse = await apiGetCurrentUser()
        if (userResponse.data) {
          setUser(userResponse.data)
          if (typeof window !== 'undefined') {
            localStorage.setItem('current_user', JSON.stringify(userResponse.data))
          }
          setLoading(false)
          return { success: true }
        }
      }

      setLoading(false)
      return { success: false, error: response.error || 'Login failed' }
    } catch (error) {
      setLoading(false)
      return { success: false, error: error instanceof Error ? error.message : 'Login failed' }
    }
  }

  const logout = () => {
    apiLogoutUser()
    setUser(null)
    router.push('/login')
  }

  const register = async (username: string, email: string, password: string, fullName?: string) => {
    setLoading(true)
    try {
      const response = await apiRegisterUser(username, email, password, fullName)

      if (response.data) {
        // Auto-login after registration
        const loginResult = await login(username, password)
        return loginResult
      }

      setLoading(false)
      return { success: false, error: response.error || 'Registration failed' }
    } catch (error) {
      setLoading(false)
      return { success: false, error: error instanceof Error ? error.message : 'Registration failed' }
    }
  }

  const refreshUser = async () => {
    if (isAuthenticated()) {
      const response = await apiGetCurrentUser()
      if (response.data) {
        setUser(response.data)
        if (typeof window !== 'undefined') {
          localStorage.setItem('current_user', JSON.stringify(response.data))
        }
      } else if (response.status === 401 || response.status === 403) {
        apiLogoutUser()
        setUser(null)
      }
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Protected route wrapper
export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function ProtectedRoute(props: P) {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!loading && !user) {
        router.push('/login')
      }
    }, [user, loading, router])

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-muted-foreground">Загрузка...</div>
        </div>
      )
    }

    if (!user) {
      return null
    }

    return <Component {...props} />
  }
}

