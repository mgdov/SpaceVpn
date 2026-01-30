/**
 * Internal API endpoints (superuser: Marzban sync, etc.)
 */

import { fetchAPI } from './client'
import type { ApiResponse } from '@/types/api'

export interface MarzbanSyncResponse {
  total: number
  synced: number
  orphaned: number
  errors: number
  details?: Array<{
    client_id: number
    username: string
    status: string
    error?: string
  }>
}

/**
 * Синхронизировать все VPN клиенты с Marzban (требуется superuser)
 */
export async function syncMarzban(): Promise<ApiResponse<MarzbanSyncResponse>> {
  return fetchAPI<MarzbanSyncResponse>('/internal/marzban/sync', {
    method: 'POST',
  })
}
