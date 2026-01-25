/**
 * Payment API endpoints
 */

import { fetchAPI } from './client'
import type {
  ApiResponse,
  CreatePaymentRequest,
  CreatePaymentResponse,
  Payment,
} from '@/types/api'

/**
 * Создать платеж
 */
export async function createPayment(request: CreatePaymentRequest): Promise<ApiResponse<CreatePaymentResponse>> {
  return fetchAPI<CreatePaymentResponse>('/payments/create', {
    method: 'POST',
    body: JSON.stringify(request),
  })
}

/**
 * Получить статус платежа
 */
export async function getPaymentStatus(paymentId: string): Promise<ApiResponse<Payment>> {
  return fetchAPI<Payment>(`/payments/${paymentId}`)
}

/**
 * YooKassa payment flow helper
 * 1. Создать платеж
 * 2. Перенаправить на confirmation_url
 * 3. После возврата проверить статус
 */
export async function initiatePayment(
  tariffId: number,
  returnUrl?: string
): Promise<ApiResponse<CreatePaymentResponse>> {
  const response = await createPayment({
    tariff_id: tariffId,
    return_url: returnUrl || window.location.origin + '/account/keys',
  })

  if (response.data?.confirmation_url) {
    window.location.href = response.data.confirmation_url
  }

  return response
}
