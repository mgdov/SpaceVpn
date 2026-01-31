/**
 * Типы для API
 */

export interface ApiResponse<T = any> {
  data?: T
  error?: string
  message?: string
}

export interface User {
  id: number
  username: string
  email: string | null
  full_name: string | null
  is_active: boolean
  is_superuser: boolean
  created_at: string
}

export interface Tariff {
  id: number
  name: string
  description: string | null
  tagline: string | null
  price: number
  duration_days: number
  data_limit_gb: number
  devices_count: number
  is_active: boolean
  is_featured: boolean
  features: string | null
}

export interface VPNStatus {
  id: number
  key?: string
  key_id?: string
  subscription_url?: string
  happ_deeplink?: string
  qr_code?: string | null
  created_at?: string
  expires_at?: string
  expire_date?: string
  traffic_limit_gb?: number
  traffic_used_gb?: number
  traffic_limit_bytes?: number
  traffic_used_bytes?: number
  traffic_percentage?: number
  is_active?: boolean
  is_expired?: boolean
  tariff_id?: number
  status: 'active' | 'expired' | 'suspended'
  can_extend?: boolean
  can_delete?: boolean
  time_remaining?: string
  time_remaining_seconds?: number
}

export interface VPNKeyStatus extends VPNStatus { }

export interface VPNClient {
  id: number
  key_id: number
  name: string
  created_at: string
}

export interface Payment {
  id: string
  status: 'pending' | 'succeeded' | 'failed'
  amount: number
  tariff_id: number
  confirmation_url?: string
  created_at: string
}
