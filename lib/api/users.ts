/**
 * User API endpoints
 */

import { fetchAPI } from './client'
import type { ApiResponse, User, UpdateProfilePayload } from '@/types/api'

/**
 * Получить информацию о текущем пользователе
 */
export async function getCurrentUser(): Promise<ApiResponse<User>> {
  const response = await fetchAPI<User>('/users/me')

  if (response.data && typeof window !== 'undefined') {
    localStorage.setItem('current_user', JSON.stringify(response.data))
  }

  return response
}

/**
 * Получить сохраненного пользователя из localStorage
 */
export function getStoredUser(): User | null {
  if (typeof window === 'undefined') return null
  const userJson = localStorage.getItem('current_user')
  return userJson ? JSON.parse(userJson) : null
}

/**
 * Обновить профиль текущего пользователя
 */
export async function updateCurrentUser(payload: UpdateProfilePayload): Promise<ApiResponse<User>> {
  const response = await fetchAPI<User>('/users/me', {
    method: 'PUT',
    body: JSON.stringify(payload),
  })

  if (response.data && typeof window !== 'undefined') {
    localStorage.setItem('current_user', JSON.stringify(response.data))
  }

  return response
}

/**
 * Получить VPN статус пользователя
 * Note: Endpoint может возвращать ошибку, используйте getUserVPNKeys вместо него
 */
export async function getUserVPNStatus(): Promise<ApiResponse<any>> {
  return fetchAPI('/users/me/vpn')
}
