/**
 * Базовый API клиент с авторизацией
 */

import type { ApiResponse } from '@/types/api'

// Use environment variable for API URL, fallback to relative path (for nginx proxy)
// If NEXT_PUBLIC_API_URL is not set, use relative path which works with nginx proxy
const API_URL = process.env.NEXT_PUBLIC_API_URL || ''
const API_PATH = process.env.NEXT_PUBLIC_API_V1 || '/api/v1'
export const API_BASE_URL = API_URL ? `${API_URL}${API_PATH}` : API_PATH

/**
 * Get auth token from localStorage
 */
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('auth_token')
}

/**
 * Set auth token in localStorage
 */
export function setAuthToken(token: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('auth_token', token)
}

/**
 * Remove auth token from localStorage
 */
export function removeAuthToken(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem('auth_token')
}

/**
 * Безопасный парсинг JSON
 */
function safeParseJson(payload: string) {
  try {
    return JSON.parse(payload)
  } catch {
    return payload
  }
}

/**
 * Универсальный API клиент с авторизацией
 */
export async function fetchAPI<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = getAuthToken()
  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData

  const headers = new Headers(options.headers || {})
  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json')
  }

  const hasBody = options.body !== undefined && options.body !== null && options.body !== ''
  if (!isFormData && hasBody && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    })

    const status = response.status
    const raw = await response.text()
    const payload = raw ? safeParseJson(raw) : undefined

    if (!response.ok) {
      // Handle validation errors (422)
      if (status === 422 && Array.isArray((payload as any)?.detail)) {
        const errors = (payload as any).detail
          .map((err: any) => `${err.loc?.join(' → ') || 'Field'}: ${err.msg}`)
          .join(', ')
        return { error: errors, status }
      }

      const detail =
        (payload as any)?.detail ||
        (payload as any)?.message ||
        (Array.isArray((payload as any)?.errors) ? (payload as any)?.errors.join(', ') : undefined)

      return { error: typeof detail === 'string' ? detail : `HTTP ${status}`, status }
    }

    return { data: payload as T, status }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Network error',
    }
  }
}

/**
 * Helper для построения query параметров
 */
export function withQuery(endpoint: string, params?: Record<string, string | number | boolean | undefined>): string {
  if (!params) return endpoint
  const search = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return
    search.append(key, String(value))
  })
  const query = search.toString()
  return query ? `${endpoint}?${query}` : endpoint
}
