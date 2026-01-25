/**
 * Public API endpoints (без авторизации)
 */

import { fetchAPI } from './client'
import type {
  ApiResponse,
  PublicTariffsResponse,
  KeySearchRequest,
  KeySearchResult,
  CreateKeyRequest,
  CreateKeyResult,
  RenewKeyRequest,
  RenewKeyResult,
  KeyByPaymentResponse,
} from '@/types/api'

/**
 * Получить список активных тарифов (PUBLIC)
 */
export async function getPublicTariffs(): Promise<ApiResponse<PublicTariffsResponse>> {
  return fetchAPI<PublicTariffsResponse>('/public/tariffs')
}

/**
 * Поиск ключа по идентификатору
 */
export async function searchKey(keyIdentifier: string): Promise<ApiResponse<KeySearchResult>> {
  return fetchAPI<KeySearchResult>('/public/key/search', {
    method: 'POST',
    body: JSON.stringify({ key_identifier: keyIdentifier } as KeySearchRequest),
  })
}

/**
 * Создать ключ без регистрации
 */
export async function createKeyPublic(request: CreateKeyRequest): Promise<ApiResponse<CreateKeyResult>> {
  return fetchAPI<CreateKeyResult>('/public/key/create', {
    method: 'POST',
    body: JSON.stringify(request),
  })
}

/**
 * Продлить ключ
 */
export async function renewKey(request: RenewKeyRequest): Promise<ApiResponse<RenewKeyResult>> {
  return fetchAPI<RenewKeyResult>('/public/key/renew', {
    method: 'POST',
    body: JSON.stringify(request),
  })
}

/**
 * Получить ключ по ID платежа (с polling)
 * Используется после оплаты для получения ключа
 */
export async function getKeyByPayment(paymentId: string): Promise<ApiResponse<KeyByPaymentResponse>> {
  return fetchAPI<KeyByPaymentResponse>(`/public/key/by-payment/${paymentId}`)
}

/**
 * Polling ключа после оплаты
 * Проверяет статус каждые 2 секунды до 15 раз (30 секунд)
 */
export async function pollKeyByPayment(
  paymentId: string,
  maxAttempts: number = 15,
  intervalMs: number = 2000
): Promise<ApiResponse<KeyByPaymentResponse>> {
  for (let i = 0; i < maxAttempts; i++) {
    const response = await getKeyByPayment(paymentId)

    if (response.status === 200 && response.data) {
      return response
    }

    if (response.status !== 202) {
      return response
    }

    if (i < maxAttempts - 1) {
      await new Promise(resolve => setTimeout(resolve, intervalMs))
    }
  }

  return { error: 'Timeout: не удалось получить ключ после оплаты' }
}
