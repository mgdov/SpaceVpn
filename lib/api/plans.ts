/**
 * Plans API (simplified tariffs: id, name, days, price)
 */

import { fetchAPI } from './client'
import type { ApiResponse, Plan } from '@/types/api'

/**
 * Получить список планов (активные тарифы в формате id, name, days, price)
 */
export async function getPlans(): Promise<ApiResponse<Plan[]>> {
  return fetchAPI<Plan[]>('/plans')
}
