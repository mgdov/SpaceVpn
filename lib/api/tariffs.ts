/**
 * Tariffs API endpoints (public, authenticated)
 */

import { fetchAPI } from './client'
import type { ApiResponse, Tariff } from '@/types/api'

/**
 * Получить список активных тарифов (для сайта, авторизация не обязательна для публичных)
 */
export async function getPublicTariffs(): Promise<ApiResponse<Tariff[]>> {
  return fetchAPI<Tariff[]>('/tariffs/')
}

/**
 * Получить тариф по ID
 */
export async function getPublicTariffById(id: string | number): Promise<ApiResponse<Tariff>> {
  return fetchAPI<Tariff>(`/tariffs/${id}`)
}
