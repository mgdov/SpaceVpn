/**
 * Subscriptions API endpoints
 */

import { fetchAPI } from './client'
import type {
  ApiResponse,
  MySubscriptionsResponse,
  PurchaseFreeTariffRequest,
  PurchaseFreeTariffResponse,
} from '@/types/api'

/**
 * Получить мои подписки
 */
export async function getMySubscriptions(): Promise<ApiResponse<MySubscriptionsResponse>> {
  return fetchAPI<MySubscriptionsResponse>('/subscriptions/my')
}

/**
 * Покупка бесплатного тарифа (создание подписки и VPN ключа)
 */
export async function purchaseFreeTariff(
  data: PurchaseFreeTariffRequest
): Promise<ApiResponse<PurchaseFreeTariffResponse>> {
  return fetchAPI<PurchaseFreeTariffResponse>('/subscriptions/purchase-free', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
