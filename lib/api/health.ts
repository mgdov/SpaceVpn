/**
 * Health & meta API endpoints
 */

import { fetchAPI } from './client'
import type { ApiResponse, HealthResponse, ApiInfoResponse } from '@/types/api'

export async function getHealthStatus(): Promise<ApiResponse<HealthResponse>> {
  return fetchAPI<HealthResponse>('/health')
}

export async function getApiInfo(): Promise<ApiResponse<ApiInfoResponse>> {
  return fetchAPI<ApiInfoResponse>('/')
}
