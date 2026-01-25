/**
 * Auth hook
 */

'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { loginUser, logoutUser, registerUser, isAuthenticated } from '@/lib/api/auth'
import { getAuthToken } from '@/lib/api/client'
import { getCurrentUser, getStoredUser } from '@/lib/api/users'
import type { User } from '@/types/api'

interface UseAuthReturn {
  user: User | null
  loading: boolean
  error: string | null
  token: string | null
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (username: string, email: string, password: string, fullName?: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  refreshUser: () => Promise<void>
}

export function useAuth(): UseAuthReturn {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(getStoredUser())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = useCallback(async (username: string, password: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await loginUser(username, password)

      if (response.data) {
        const userResponse = await getCurrentUser()
        if (userResponse.data) {
          setUser(userResponse.data)
          setLoading(false)
          return { success: true }
        }
      }

      setLoading(false)
      const errorMsg = response.error || 'Ошибка входа'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } catch (err) {
      setLoading(false)
      const errorMsg = err instanceof Error ? err.message : 'Ошибка входа'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    }
  }, [])

  const register = useCallback(async (username: string, email: string, password: string, fullName?: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await registerUser(username, email, password, fullName)

      if (response.data) {
        const loginResponse = await loginUser(username, password)
        if (loginResponse.data) {
          const userResponse = await getCurrentUser()
          if (userResponse.data) {
            setUser(userResponse.data)
            setLoading(false)
            return { success: true }
          }
        }
      }

      setLoading(false)
      const errorMsg = response.error || 'Ошибка регистрации'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } catch (err) {
      setLoading(false)
      const errorMsg = err instanceof Error ? err.message : 'Ошибка регистрации'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    }
  }, [])

  const logout = useCallback(() => {
    logoutUser()
    setUser(null)
    setError(null)
    router.push('/login')
  }, [router])

  const refreshUser = useCallback(async () => {
    if (!isAuthenticated()) return

    setLoading(true)
    const response = await getCurrentUser()
    if (response.data) {
      setUser(response.data)
    } else if (response.error) {
      logoutUser()
      setUser(null)
    }
    setLoading(false)
  }, [])

  return {
    user,
    loading,
    error,
    token: getAuthToken(),
    isAuthenticated: isAuthenticated(),
    login,
    register,
    logout,
    refreshUser,
  }
}
