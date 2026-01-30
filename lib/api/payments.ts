/**
 * Payment API endpoints
 */

import { fetchAPI, getAuthToken } from './client'
import type {
  ApiResponse,
  CreatePaymentRequest,
  CreatePaymentResponse,
  Payment,
  Subscription,
} from '@/types/api'

export interface CreateYookassaPaymentPayload {
  tariffId: number
  plan: string
  price: number
  description?: string
}

export interface CreateYookassaPaymentResponse {
  payment_id: number | string
  confirmation_url?: string | null
  status?: string
}

export interface ConfirmYookassaPaymentResponse {
  success: boolean
  plan?: string
  subscription?: Subscription
  message?: string
}

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
 * YooKassa: создать платёж через backend /payments/create с return_url на account/keys
 */
export async function createYookassaPayment(
  payload: CreateYookassaPaymentPayload
): Promise<ApiResponse<CreateYookassaPaymentResponse>> {
  const returnUrl =
    (typeof window !== 'undefined' ? window.location.origin : '') +
    `/account/keys?tariff_id=${encodeURIComponent(String(payload.tariffId))}&plan=${encodeURIComponent(payload.plan)}`
  return createPayment({
    tariff_id: payload.tariffId,
    return_url: returnUrl,
  })
}

/**
 * YooKassa: подтвердить платёж через Next.js route /api/yookassa/confirm-payment
 */
export async function confirmYookassaPayment(
  paymentId: string
): Promise<ApiResponse<ConfirmYookassaPaymentResponse>> {
  const token = getAuthToken()
  if (!token) {
    return { error: 'Требуется авторизация для оплаты' }
  }
  try {
    const response = await fetch('/api/yookassa/confirm-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ paymentId }),
    })
    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
      return { error: (data as any)?.error || (data as any)?.message || `HTTP ${response.status}` }
    }
    return { data }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Network error' }
  }
}

/**
 * YooKassa flow: создать платёж и при наличии confirmation_url перенаправить на него
 */
export async function initiatePayment(
  tariffId: number,
  returnUrl?: string
): Promise<ApiResponse<CreatePaymentResponse>> {
  const response = await createPayment({
    tariff_id: tariffId,
    return_url: returnUrl || (typeof window !== 'undefined' ? window.location.origin + '/account/keys' : undefined),
  })
  if (response.data?.confirmation_url && typeof window !== 'undefined') {
    window.location.href = response.data.confirmation_url
  }
  return response
}
