/**
 * VPN Keys API endpoints
 */

import { fetchAPI } from './client'
import type {
  ApiResponse,
  VPNKeyStatus,
  VPNKeyListResponse,
  VPNClient,
  ExtendKeyRequest,
  ExtendKeyResponse,
  HappDeeplinkResponse,
  BypassPresetsResponse,
  VPNConfig,
  UpdateVPNClientPayload,
  RegenerateVPNClientPayload,
} from '@/types/api'

// ============================================================================
// VPN Keys (новый endpoint)
// ============================================================================

/**
 * Получить все VPN ключи текущего пользователя
 */
export async function getUserVPNKeys(): Promise<ApiResponse<VPNKeyListResponse>> {
  return fetchAPI<VPNKeyListResponse>('/vpn-clients/keys')
}

/**
 * Получить VPN ключ по ID
 */
export async function getVPNKeyStatus(keyId: number): Promise<ApiResponse<VPNKeyStatus>> {
  return fetchAPI<VPNKeyStatus>(`/vpn-clients/keys/${keyId}`)
}

/**
 * Продлить VPN ключ
 */
export async function extendVPNKey(
  keyId: number,
  request?: ExtendKeyRequest
): Promise<ApiResponse<ExtendKeyResponse>> {
  return fetchAPI<ExtendKeyResponse>(`/vpn-clients/keys/${keyId}/extend`, {
    method: 'POST',
    body: request ? JSON.stringify(request) : undefined,
  })
}

/**
 * Получить Happ VPN deep link для ключа
 */
export async function getHappDeeplink(keyId: number): Promise<ApiResponse<HappDeeplinkResponse>> {
  return fetchAPI<HappDeeplinkResponse>(`/vpn-clients/keys/${keyId}/happ-link`)
}

// ============================================================================
// VPN Clients (старый endpoint)
// ============================================================================

/**
 * Получить всех VPN клиентов пользователя
 */
export async function getUserVPNClients(): Promise<ApiResponse<VPNClient[]>> {
  return fetchAPI<VPNClient[]>('/vpn-clients')
}

/**
 * Получить VPN клиента по ID
 */
export async function getUserVPNClient(id: string): Promise<ApiResponse<VPNClient>> {
  return fetchAPI<VPNClient>(`/vpn-clients/${id}`)
}

/**
 * Обновить VPN клиента
 */
export async function updateUserVPNClient(
  id: string,
  payload: UpdateVPNClientPayload
): Promise<ApiResponse<VPNClient>> {
  return fetchAPI<VPNClient>(`/vpn-clients/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

/**
 * Удалить VPN клиента
 */
export async function deleteUserVPNClient(id: string): Promise<ApiResponse<void>> {
  return fetchAPI<void>(`/vpn-clients/${id}`, {
    method: 'DELETE',
  })
}

/**
 * Получить конфиг VPN клиента
 */
export async function getUserVPNClientConfig(id: string): Promise<ApiResponse<VPNConfig>> {
  return fetchAPI<VPNConfig>(`/vpn-clients/${id}/config`)
}

/**
 * Регенерировать VPN клиента
 */
export async function regenerateUserVPNClient(
  id: string,
  payload?: RegenerateVPNClientPayload
): Promise<ApiResponse<VPNConfig>> {
  return fetchAPI<VPNConfig>(`/vpn-clients/${id}/regenerate`, {
    method: 'POST',
    body: payload ? JSON.stringify(payload) : undefined,
  })
}

/**
 * Синхронизировать VPN клиента
 */
export async function syncUserVPNClient(id: string): Promise<ApiResponse<VPNClient>> {
  return fetchAPI<VPNClient>(`/vpn-clients/${id}/sync`, {
    method: 'POST',
  })
}

/**
 * Получить доступные bypass пресеты
 */
export async function getBypassPresets(): Promise<ApiResponse<BypassPresetsResponse>> {
  return fetchAPI<BypassPresetsResponse>('/vpn-clients/bypass-presets')
}

