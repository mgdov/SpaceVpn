"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  User,
  getCurrentUserInfo,
  loginUser as apiLoginUser,
  logoutUser as apiLogoutUser,
  registerUser as apiRegisterUser,
  isAuthenticated,
  getAuthToken,
  getCurrentUser as getStoredUser,
} from './api'

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
        const response = await getCurrentUserInfo()
        if (response.data) {
          setUser(response.data)
        } else if (response.error) {
          // Token expired or invalid
          apiLogoutUser()
          setUser(null)
        }
      }
      setLoading(false)
    }

    loadUser()
  }, [])

  const login = async (username: string, password: string) => {
    setLoading(true)
    try {
      // Тестовый пользователь для локальной разработки
      if (username === 'test' && password === 'test123') {
        const testUser: User = {
          id: 999,
          username: 'test',
          email: 'test@spacevpn.com',
          full_name: 'Тестовый Пользователь',
          is_active: true,
          is_superuser: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }

        // Сохраняем тестовый токен и пользователя
        localStorage.setItem('auth_token', 'test_token_12345')
        localStorage.setItem('current_user', JSON.stringify(testUser))
        setUser(testUser)
        setLoading(false)
        return { success: true }
      }

      const response = await apiLoginUser(username, password)

      if (response.data) {
        // Get user info after login
        const userResponse = await getCurrentUserInfo()
        if (userResponse.data) {
          setUser(userResponse.data)
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
      const response = await getCurrentUserInfo()
      if (response.data) {
        setUser(response.data)
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

