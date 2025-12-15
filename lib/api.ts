/**
 * API Client for SpaceVPN Backend
 * 
 * IMPORTANT: Always use relative paths for API requests
 * to work correctly behind nginx reverse proxy
 */

// Use relative path - nginx will proxy /api/v1/* to backend
export const API_BASE_URL = '/api/v1'

/**
 * API Response types
 */
export interface ApiResponse<T = any> {
  data?: T
  error?: string
  message?: string
}

export interface User {
  id: string
  username: string
  email: string | null
  full_name: string | null
  is_active: boolean
  is_superuser: boolean
  created_at: string
  updated_at: string
}

export interface TokenResponse {
  access_token: string
  token_type: string
}

export interface VPNClient {
  id: string
  user_id: string
  uuid: string
  email: string
  subscription_id: string | null
  data_limit_gb: number
  data_used_gb: number
  expiry_date: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface VPNConfig {
  config_json: string
  qr_code_base64: string
  share_link: string
}

export interface Subscription {
  id: string
  user_id: string
  start_date: string
  end_date: string
  data_limit_gb: number
  data_used_gb: number
  is_active: boolean
}

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
 * Get current user from localStorage
 */
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null
  const userJson = localStorage.getItem('current_user')
  return userJson ? JSON.parse(userJson) : null
}

/**
 * Set current user in localStorage
 */
export function setCurrentUser(user: User): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('current_user', JSON.stringify(user))
}

/**
 * Remove current user from localStorage
 */
export function removeCurrentUser(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem('current_user')
}

/**
 * Make authenticated API request
 */
async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = getAuthToken()
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    })
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return {
        error: errorData.detail || errorData.message || `HTTP ${response.status}`,
      }
    }
    
    const data = await response.json()
    return { data }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Network error',
    }
  }
}

/**
 * Register new user
 */
export async function registerUser(
  username: string,
  email: string,
  password: string,
  fullName?: string
): Promise<ApiResponse<User>> {
  return apiRequest<User>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ username, email, password, full_name: fullName }),
  })
}

/**
 * Login user
 */
export async function loginUser(
  username: string,
  password: string
): Promise<ApiResponse<TokenResponse>> {
  const formData = new URLSearchParams()
  formData.append('username', username)
  formData.append('password', password)
  
  const response = await apiRequest<TokenResponse>('/auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData.toString(),
  })
  
  // If successful, save token
  if (response.data?.access_token) {
    setAuthToken(response.data.access_token)
  }
  
  return response
}

/**
 * Get current user info
 */
export async function getCurrentUserInfo(): Promise<ApiResponse<User>> {
  const response = await apiRequest<User>('/users/me')
  
  // Save user info
  if (response.data) {
    setCurrentUser(response.data)
  }
  
  return response
}

/**
 * Logout user
 */
export function logoutUser(): void {
  removeAuthToken()
  removeCurrentUser()
}

/**
 * Create VPN client
 */
export async function createVPNClient(): Promise<ApiResponse<VPNClient>> {
  return apiRequest<VPNClient>('/vpn-clients/', {
    method: 'POST',
  })
}

/**
 * Get user's VPN client
 */
export async function getMyVPNClient(): Promise<ApiResponse<VPNClient>> {
  return apiRequest<VPNClient>('/vpn-clients/me')
}

/**
 * Get VPN client config
 */
export async function getVPNConfig(): Promise<ApiResponse<VPNConfig>> {
  return apiRequest<VPNConfig>('/vpn-clients/me/config')
}

/**
 * Get user subscriptions
 */
export async function getUserSubscriptions(): Promise<ApiResponse<Subscription[]>> {
  return apiRequest<Subscription[]>('/subscriptions/')
}

/**
 * Create subscription
 */
export async function createSubscription(
  userId: string,
  endDate: string,
  dataLimitGB: number = 0
): Promise<ApiResponse<Subscription>> {
  return apiRequest<Subscription>('/subscriptions/', {
    method: 'POST',
    body: JSON.stringify({
      user_id: userId,
      end_date: endDate,
      data_limit_gb: dataLimitGB,
    }),
  })
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return getAuthToken() !== null
}

