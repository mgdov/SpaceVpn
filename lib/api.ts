/**
 * API Client for SpaceVPN Backend
 *
 * IMPORTANT: Always use relative paths for API requests
 * to work correctly behind the nginx reverse proxy
 */

// nginx proxies /api/v1/* to the backend
export const API_BASE_URL = '/api/v1'

export interface ApiResponse<T = any> {
  data?: T
  error?: string
  message?: string
  status?: number
}

export interface User {
  id: number
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

export interface Tariff {
  id: number
  name: string
  description: string | null
  tagline?: string | null
  duration_months: number
  price: number
  data_limit_gb: number
  devices_count?: number
  is_active?: boolean
  is_featured?: boolean
  features?: string | null
}

export interface VPNClient {
  id: number
  user_id: number
  subscription_id: number
  client_uuid: string
  pasarguard_username?: string | null
  name: string
  device_info?: string | null
  subscription_url?: string | null
  last_connected_at?: string | null
  created_at: string
  updated_at: string
}

export interface VPNConfig {
  client_uuid: string
  name: string
  xray_config: any  // JSON object
  subscription_url: string  // VLESS URL
  qr_code: string  // Base64 encoded image
}

export interface Subscription {
  id: number
  user_id: number
  pasarguard_username?: string | null
  plan: string  // SubscriptionPlan enum value
  status: string  // SubscriptionStatus enum value
  data_limit?: number | null  // bytes, null = unlimited
  used_traffic: number  // bytes
  start_date: string
  expire_date?: string | null
  is_active: boolean
  traffic_remaining?: number | null
  traffic_used_percentage?: number | null
  created_at: string
  updated_at: string
}

export interface AdminSubscription extends Subscription {
  user?: User
}

export interface HealthResponse {
  status: string
  uptime?: number
  version?: string
}

export interface ApiInfoResponse {
  version: string
  status: string
  uptime?: number
}

export interface UpdateProfilePayload {
  email?: string | null
  username?: string
  full_name?: string | null
  password?: string
  current_password?: string
}

export interface CreateSubscriptionPayload {
  plan: string  // SubscriptionPlan: "free" | "basic" | "premium" | "unlimited"
}

export interface UpdateSubscriptionPayload {
  tariff_id?: string
  end_date?: string
  is_active?: boolean
  data_limit_gb?: number
}

export interface CreateVPNClientPayload {
  subscription_id: number
  name: string
  device_info?: string
}

export interface UpdateVPNClientPayload {
  name?: string
  device_info?: string
}

export interface CreateTariffPayload {
  name: string
  duration_months: number
  price: number
  description?: string | null
  tagline?: string | null
  data_limit_gb?: number
  devices_count?: number
  is_active?: boolean
  is_featured?: boolean
  sort_order?: number
  features?: string | null
}

export type UpdateTariffPayload = Partial<CreateTariffPayload>

export type AdminVPNClient = VPNClient & { user?: User }

export interface ExtendPayload {
  days?: number
  expires_at?: string
}

export interface PasarguardSyncResponse {
  synced: number
  failed?: number
  skipped?: number
}

type QueryParams = Record<string, string | number | boolean | undefined>

function buildEndpoint(endpoint: string): string {
  const base = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL
  if (!endpoint || endpoint === '/') {
    return `${base}/`
  }
  const normalized = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  return `${base}${normalized}`
}

function withQuery(endpoint: string, params?: QueryParams): string {
  if (!params) return endpoint
  const search = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return
    search.append(key, String(value))
  })
  const query = search.toString()
  return query ? `${endpoint}?${query}` : endpoint
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

function safeParseJson(payload: string) {
  try {
    return JSON.parse(payload)
  } catch {
    return payload
  }
}

/**
 * Make authenticated API request
 */
async function apiRequest<T = any>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
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

  try {
    const response = await fetch(buildEndpoint(endpoint), {
      ...options,
      headers,
    })

    const status = response.status
    const raw = await response.text()
    const payload = raw ? safeParseJson(raw) : undefined

    if (!response.ok) {
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
 * Authentication helpers
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

export async function loginUser(username: string, password: string): Promise<ApiResponse<TokenResponse>> {
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

  if (response.data?.access_token) {
    setAuthToken(response.data.access_token)
  }

  return response
}

export function logoutUser(): void {
  removeAuthToken()
  removeCurrentUser()
}

export function isAuthenticated(): boolean {
  return getAuthToken() !== null
}

/**
 * User profile endpoints
 */
export async function getCurrentUserInfo(): Promise<ApiResponse<User>> {
  const response = await apiRequest<User>('/users/me')
  if (response.data) {
    setCurrentUser(response.data)
  }
  return response
}

export async function updateCurrentUser(payload: UpdateProfilePayload): Promise<ApiResponse<User>> {
  const response = await apiRequest<User>('/users/me', {
    method: 'PUT',
    body: JSON.stringify(payload),
  })

  if (response.data) {
    setCurrentUser(response.data)
  }

  return response
}

export async function getUserById(userId: string): Promise<ApiResponse<User>> {
  return apiRequest<User>(`/users/${userId}`)
}

export async function deleteUserById(userId: string): Promise<ApiResponse<void>> {
  return apiRequest<void>(`/users/${userId}`, { method: 'DELETE' })
}

export async function adminListUsers(params?: QueryParams): Promise<ApiResponse<User[]>> {
  return apiRequest<User[]>(withQuery('/admin/users', params))
}

export async function adminGetUser(userId: string): Promise<ApiResponse<User>> {
  return apiRequest<User>(`/admin/users/${userId}`)
}

export async function adminDeleteUser(userId: string): Promise<ApiResponse<void>> {
  return apiRequest<void>(`/admin/users/${userId}`, { method: 'DELETE' })
}

export async function adminToggleUserActive(userId: string): Promise<ApiResponse<User>> {
  return apiRequest<User>(`/admin/users/${userId}/toggle-active`, { method: 'POST' })
}

export async function adminMakeSuperuser(userId: string): Promise<ApiResponse<User>> {
  return apiRequest<User>(`/admin/users/${userId}/make-superuser`, { method: 'POST' })
}

/**
 * Subscription endpoints (user)
 */
export async function getUserSubscriptions(): Promise<ApiResponse<Subscription[]>> {
  return apiRequest<Subscription[]>('/subscriptions')
}

export async function getSubscriptionById(id: string): Promise<ApiResponse<Subscription>> {
  return apiRequest<Subscription>(`/subscriptions/${id}`)
}

export async function createSubscription(payload: CreateSubscriptionPayload): Promise<ApiResponse<Subscription>> {
  return apiRequest<Subscription>('/subscriptions', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function updateSubscription(
  id: string,
  payload: UpdateSubscriptionPayload
): Promise<ApiResponse<Subscription>> {
  return apiRequest<Subscription>(`/subscriptions/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

export async function deleteSubscription(id: string): Promise<ApiResponse<void>> {
  return apiRequest<void>(`/subscriptions/${id}`, { method: 'DELETE' })
}

/**
 * Subscription endpoints (admin)
 */
export async function adminListSubscriptions(): Promise<ApiResponse<AdminSubscription[]>> {
  return apiRequest<AdminSubscription[]>('/admin/subscriptions')
}

export async function adminGetSubscription(id: string): Promise<ApiResponse<AdminSubscription>> {
  return apiRequest<AdminSubscription>(`/admin/subscriptions/${id}`)
}

export async function adminCreateSubscription(
  payload: CreateSubscriptionPayload
): Promise<ApiResponse<AdminSubscription>> {
  return apiRequest<AdminSubscription>('/admin/subscriptions', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function adminDeleteSubscription(id: string): Promise<ApiResponse<void>> {
  return apiRequest<void>(`/admin/subscriptions/${id}`, { method: 'DELETE' })
}

export async function adminExtendSubscription(
  id: string,
  payload?: ExtendPayload
): Promise<ApiResponse<AdminSubscription>> {
  return apiRequest<AdminSubscription>(`/admin/subscriptions/${id}/extend`, {
    method: 'POST',
    body: payload ? JSON.stringify(payload) : undefined,
  })
}

export async function adminToggleSubscription(id: string): Promise<ApiResponse<AdminSubscription>> {
  return apiRequest<AdminSubscription>(`/admin/subscriptions/${id}/toggle`, {
    method: 'POST',
  })
}

/**
 * Tariff endpoints
 */
export async function getPublicTariffs(): Promise<ApiResponse<Tariff[]>> {
  return apiRequest<Tariff[]>('/tariffs')
}

export async function getPublicTariffById(id: string): Promise<ApiResponse<Tariff>> {
  return apiRequest<Tariff>(`/tariffs/${id}`)
}

export async function adminListTariffs(): Promise<ApiResponse<Tariff[]>> {
  return apiRequest<Tariff[]>('/admin/tariffs')
}

export async function adminCreateTariff(payload: CreateTariffPayload): Promise<ApiResponse<Tariff>> {
  return apiRequest<Tariff>('/admin/tariffs', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function adminUpdateTariff(
  id: string,
  payload: UpdateTariffPayload
): Promise<ApiResponse<Tariff>> {
  return apiRequest<Tariff>(`/admin/tariffs/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
}

export async function adminDeleteTariff(id: string): Promise<ApiResponse<void>> {
  return apiRequest<void>(`/admin/tariffs/${id}`, { method: 'DELETE' })
}

export async function adminToggleTariff(id: string): Promise<ApiResponse<Tariff>> {
  return apiRequest<Tariff>(`/admin/tariffs/${id}/toggle`, { method: 'POST' })
}

/**
 * VPN client endpoints (user)
 */
export async function listUserVPNClients(): Promise<ApiResponse<VPNClient[]>> {
  return apiRequest<VPNClient[]>('/vpn-clients')
}

export async function getUserVPNClient(id: string): Promise<ApiResponse<VPNClient>> {
  return apiRequest<VPNClient>(`/vpn-clients/${id}`)
}

export async function createUserVPNClient(
  payload?: CreateVPNClientPayload
): Promise<ApiResponse<VPNClient>> {
  return apiRequest<VPNClient>('/vpn-clients', {
    method: 'POST',
    body: payload ? JSON.stringify(payload) : undefined,
  })
}

export async function updateUserVPNClient(
  id: string,
  payload: UpdateVPNClientPayload
): Promise<ApiResponse<VPNClient>> {
  return apiRequest<VPNClient>(`/vpn-clients/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

export async function deleteUserVPNClient(id: string): Promise<ApiResponse<void>> {
  return apiRequest<void>(`/vpn-clients/${id}`, { method: 'DELETE' })
}

export async function getUserVPNClientConfig(id: string): Promise<ApiResponse<VPNConfig>> {
  return apiRequest<VPNConfig>(`/vpn-clients/${id}/config`)
}

export async function regenerateUserVPNClient(id: string): Promise<ApiResponse<VPNConfig>> {
  return apiRequest<VPNConfig>(`/vpn-clients/${id}/regenerate`, { method: 'POST' })
}

export async function syncUserVPNClient(id: string): Promise<ApiResponse<VPNClient>> {
  return apiRequest<VPNClient>(`/vpn-clients/${id}/sync`, { method: 'POST' })
}

/**
 * VPN client endpoints (admin)
 */
export async function adminListVPNClients(): Promise<ApiResponse<AdminVPNClient[]>> {
  return apiRequest<AdminVPNClient[]>('/admin/vpn/clients')
}

export async function adminGetVPNClient(id: string): Promise<ApiResponse<AdminVPNClient>> {
  return apiRequest<AdminVPNClient>(`/admin/vpn/clients/${id}`)
}

export async function adminCreateVPNClient(
  payload: CreateVPNClientPayload
): Promise<ApiResponse<AdminVPNClient>> {
  return apiRequest<AdminVPNClient>('/admin/vpn/clients', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function adminUpdateVPNClient(
  id: string,
  payload: UpdateVPNClientPayload
): Promise<ApiResponse<AdminVPNClient>> {
  return apiRequest<AdminVPNClient>(`/admin/vpn/clients/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

export async function adminDeleteVPNClient(id: string): Promise<ApiResponse<void>> {
  return apiRequest<void>(`/admin/vpn/clients/${id}`, { method: 'DELETE' })
}

export async function adminExtendVPNClient(
  id: string,
  payload?: ExtendPayload
): Promise<ApiResponse<AdminVPNClient>> {
  return apiRequest<AdminVPNClient>(`/admin/vpn/clients/${id}/extend`, {
    method: 'POST',
    body: payload ? JSON.stringify(payload) : undefined,
  })
}

export async function adminToggleVPNClient(id: string): Promise<ApiResponse<AdminVPNClient>> {
  return apiRequest<AdminVPNClient>(`/admin/vpn/clients/${id}/toggle`, {
    method: 'POST',
  })
}

/**
 * Internal maintenance endpoints
 */
export async function syncAllVpnClients(): Promise<ApiResponse<PasarguardSyncResponse>> {
  return apiRequest<PasarguardSyncResponse>('/internal/pasarguard/sync', { method: 'POST' })
}

/**
 * Health & meta endpoints
 */
export async function getHealthStatus(): Promise<ApiResponse<HealthResponse>> {
  return apiRequest<HealthResponse>('/health')
}

export async function getApiInfo(): Promise<ApiResponse<ApiInfoResponse>> {
  return apiRequest<ApiInfoResponse>('/')
}

export interface CreateYookassaPaymentPayload {
  tariffId: number
  plan: string
  price: number
  description?: string
}

export interface CreateYookassaPaymentResponse {
  payment_id: string
  confirmation_url: string
  status?: string
}

export interface ConfirmYookassaPaymentResponse {
  success: boolean
  plan?: string
  subscription?: Subscription
  message?: string
}

export async function createYookassaPayment(
  payload: CreateYookassaPaymentPayload
): Promise<ApiResponse<CreateYookassaPaymentResponse>> {
  const token = getAuthToken()
  if (!token) {
    return { error: 'Требуется авторизация для оплаты' }
  }

  try {
    const response = await fetch('/api/yookassa/create-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
      return { error: data?.error || data?.message || `HTTP ${response.status}` }
    }

    return { data }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Network error' }
  }
}

export async function confirmYookassaPayment(
  paymentId: string
): Promise<ApiResponse<ConfirmYookassaPaymentResponse>> {
  const token = getAuthToken()
  if (!token) {
    return { error: 'Требуется авторизация для оплаты' }
  }

  try {
    const response = await fetch('/api/yookassa/confirm-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ paymentId }),
    })

    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
      return { error: data?.error || data?.message || `HTTP ${response.status}` }
    }

    return { data }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Network error' }
  }
}

