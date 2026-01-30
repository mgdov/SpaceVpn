/**
 * Auth API endpoints
 */

import { fetchAPI, setAuthToken, removeAuthToken } from './client'
import type {
  ApiResponse,
  User,
  TokenResponse,
  OAuthProvider,
  OAuthProvidersResponse,
  GoogleAuthResponse,
  TelegramAuthInfo,
  TelegramAuthData,
  SendVerificationCodeRequest,
  VerifyCodeRequest,
  VerifyEmailRequest,
  ResetPasswordRequest,
} from '@/types/api'

/**
 * Регистрация пользователя
 */
export async function registerUser(
  username: string,
  email: string,
  password: string,
  fullName?: string
): Promise<ApiResponse<User>> {
  return fetchAPI<User>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ username, email, password, full_name: fullName }),
  })
}

/**
 * Вход пользователя
 * Использует form-urlencoded согласно стандарту OAuth2
 */
export async function loginUser(username: string, password: string): Promise<ApiResponse<TokenResponse>> {
  const formData = new URLSearchParams()
  formData.append('username', username)
  formData.append('password', password)

  const response = await fetchAPI<TokenResponse>('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData.toString(),
  })

  if (response.data?.access_token) {
    setAuthToken(response.data.access_token)
  }

  return response
}

/**
 * Выход пользователя
 */
export function logoutUser(): void {
  removeAuthToken()
  if (typeof window !== 'undefined') {
    localStorage.removeItem('current_user')
  }
}

/**
 * Проверка авторизации
 */
export function isAuthenticated(): boolean {
  return typeof window !== 'undefined' && localStorage.getItem('auth_token') !== null
}

/**
 * Получить список доступных OAuth провайдеров
 */
export async function getOAuthProviders(): Promise<ApiResponse<OAuthProvidersResponse>> {
  return fetchAPI<OAuthProvidersResponse>('/auth/oauth-providers')
}

/**
 * Google OAuth - получить URL для авторизации
 */
export async function getGoogleAuthUrl(): Promise<ApiResponse<GoogleAuthResponse>> {
  return fetchAPI<GoogleAuthResponse>('/auth/google')
}

/**
 * Telegram OAuth - получить информацию о боте
 */
export async function getTelegramAuthInfo(): Promise<ApiResponse<TelegramAuthInfo>> {
  return fetchAPI<TelegramAuthInfo>('/auth/telegram')
}

/**
 * Telegram OAuth - callback после авторизации
 */
export async function telegramAuthCallback(data: TelegramAuthData): Promise<ApiResponse<TokenResponse>> {
  const response = await fetchAPI<TokenResponse>('/auth/telegram/callback', {
    method: 'POST',
    body: JSON.stringify(data),
  })

  if (response.data?.access_token) {
    setAuthToken(response.data.access_token)
  }

  return response
}

/**
 * Отправить код верификации на email (регистрация / сброс пароля / логин)
 */
export async function sendVerificationCode(
  body: SendVerificationCodeRequest
): Promise<ApiResponse<{ detail: string }>> {
  return fetchAPI('/auth/send-verification-code', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

/**
 * Проверить код без побочных эффектов
 */
export async function verifyCode(body: VerifyCodeRequest): Promise<ApiResponse<{ detail: string }>> {
  return fetchAPI('/auth/verify-code', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

/**
 * Верифицировать email после регистрации — возвращает JWT
 */
export async function verifyEmail(body: VerifyEmailRequest): Promise<ApiResponse<TokenResponse>> {
  const response = await fetchAPI<TokenResponse>('/auth/verify-email', {
    method: 'POST',
    body: JSON.stringify(body),
  })
  if (response.data?.access_token) {
    setAuthToken(response.data.access_token)
  }
  return response
}

/**
 * Сброс пароля по коду из email
 */
export async function resetPassword(
  body: ResetPasswordRequest
): Promise<ApiResponse<{ detail: string }>> {
  return fetchAPI('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}
