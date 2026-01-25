/**
 * Централизованные типы API для всего приложения
 */

// ============================================================================
// Базовые типы
// ============================================================================

export interface ApiResponse<T = any> {
  data?: T
  error?: string
  message?: string
  status?: number
}

export interface ApiError {
  detail: string | string[]
  status?: number
}

// ============================================================================
// Auth типы
// ============================================================================

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

export interface OAuthProvider {
  id: string
  name: string
  enabled: boolean
  bot_username?: string
}

export interface OAuthProvidersResponse {
  providers: OAuthProvider[]
}

export interface GoogleAuthResponse {
  auth_url: string
  state: string
}

export interface TelegramAuthInfo {
  bot_username: string
  redirect_url: string
}

export interface TelegramAuthData {
  id: number
  first_name: string
  last_name?: string
  username?: string
  photo_url?: string
  auth_date: number
  hash: string
}

// ============================================================================
// Tariff типы
// ============================================================================

export interface Tariff {
  id: number
  name: string
  description: string | null
  tagline?: string | null
  duration_months: number
  duration_days?: number
  price: number
  data_limit_gb: number
  devices_count?: number
  is_active?: boolean
  is_featured?: boolean
  features?: string | null
  sort_order?: number
}

export interface PublicTariff extends Tariff {
  duration_days: number
}

export interface PublicTariffsResponse {
  tariffs: PublicTariff[]
}

// ============================================================================
// VPN ключи типы
// ============================================================================

export interface VPNKeyStatus {
  id: number
  key_id: string
  status: 'active' | 'expired' | 'blocked' | 'disabled'

  // Expiration
  expire_date: string | null
  expires_at?: string | null  // альтернативное поле
  time_remaining: string | null
  time_remaining_seconds: number | null
  is_expired: boolean

  // Traffic
  traffic_used_bytes: number
  traffic_limit_bytes: number | null
  traffic_used_gb: number
  traffic_limit_gb: number | null
  traffic_percentage: number | null

  // VPN connection
  subscription_url: string | null
  qr_code: string | null
  happ_deeplink: string | null

  // Actions
  can_extend: boolean
  can_delete: boolean
}

export interface VPNKeyListResponse {
  keys: VPNKeyStatus[]
  total: number
}

export interface VPNClient {
  id: number
  user_id?: number
  subscription_id?: number
  client_uuid: string
  name: string
  status: 'active' | 'expired' | 'blocked' | 'disabled'
  marzban_username?: string | null
  device_info?: string | null
  xray_config?: string | null
  subscription_url?: string | null
  qr_code?: string | null
  last_connected_at?: string | null
  created_at: string
  updated_at?: string
  expires_at?: string
}

export interface VPNConfig {
  client_uuid: string
  name: string
  xray_config: any
  subscription_url: string
  qr_code: string
}

export interface ExtendKeyRequest {
  tariff_id?: number
  days?: number
}

export interface ExtendKeyResponse {
  success: boolean
  message: string
  new_expire_date?: string
  key_status?: VPNKeyStatus
}

export interface BypassPreset {
  id: string
  name: string
  description: string
  fingerprint: string
  server_name: string
  region: string
  risk: string
}

export interface BypassPresetsResponse {
  presets: BypassPreset[]
}

export interface HappDeeplinkResponse {
  happ_link: string
  vless_url: string
  qr_code: string
}

// ============================================================================
// Payment типы
// ============================================================================

export interface CreatePaymentRequest {
  tariff_id: number
  return_url?: string
}

export interface CreatePaymentResponse {
  payment_id: string
  confirmation_url: string
  status: string
}

export interface Payment {
  id: string
  user_id?: number
  amount: number
  status: 'pending' | 'completed' | 'failed' | 'cancelled'
  tariff_id: number
  payment_method?: string
  confirmation_url?: string
  created_at: string
  updated_at: string
}

// ============================================================================
// Public API типы
// ============================================================================

export interface KeySearchRequest {
  key_identifier: string
}

export interface KeySearchResult {
  found: boolean
  key_id?: string
  client_id?: number
  status?: 'active' | 'expired'
  expires_at?: string
  time_remaining?: string
  is_expired: boolean
  can_renew: boolean
}

export interface CreateKeyRequest {
  tariff_id: number
  bypass_preset?: string
}

export interface CreateKeyResult {
  success: boolean
  key_id: string
  client_id: number
  subscription_url: string
  qr_code?: string
  expires_at: string
  message: string
}

export interface RenewKeyRequest {
  key_identifier: string
  tariff_id: number
}

export interface RenewKeyResult {
  success: boolean
  key_id: string
  client_id: number
  new_expires_at: string
  subscription_url: string
  message: string
}

export interface KeyByPaymentResponse {
  key_id: string
  client_id: number
  subscription_url: string
  qr_code: string
  expires_at: string
}

// ============================================================================
// Admin типы
// ============================================================================

export interface AdminVPNClient extends VPNClient {
  user?: {
    id: number
    username: string
    email?: string
  }
  expire_date?: string
  time_remaining?: string
  is_expired: boolean
  traffic_used_gb: number
  traffic_limit_gb: number
}

export interface AdminFinanceStats {
  total_revenue: string
  revenue_today: string
  revenue_yesterday: string
  revenue_this_week: string
  revenue_this_month: string
  revenue_last_month: string
  total_payments: number
  completed_payments: number
  pending_payments: number
  failed_payments: number
  active_subscriptions: number
  average_payment: string
}

export interface AdminFinanceChartData {
  labels: string[]
  values: string[]
}

export interface AdminPayment {
  id: number
  user_id: number
  amount: string
  status: string
  payment_method?: string
  created_at: string
  updated_at: string
  user?: User
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

export interface RegenerateVPNClientPayload {
  bypass_preset?: string
  fingerprint?: string
  server_name?: string
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

export interface UpdateProfilePayload {
  email?: string | null
  username?: string
  full_name?: string | null
  password?: string
  current_password?: string
}

// ============================================================================
// Query параметры
// ============================================================================

export interface PaginationParams {
  skip?: number
  limit?: number
}

export interface PaymentQueryParams extends PaginationParams {
  status?: 'pending' | 'completed' | 'failed' | 'cancelled'
}
