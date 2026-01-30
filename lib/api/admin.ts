/**
 * Admin API endpoints
 */

import { fetchAPI, withQuery } from './client'
import type {
  ApiResponse,
  User,
  AdminVPNClient,
  CreateVPNClientPayload,
  UpdateVPNClientPayload,
  Tariff,
  CreateTariffPayload,
  UpdateTariffPayload,
  AdminFinanceStats,
  AdminFinanceChartData,
  AdminFinanceSummary,
  AdminPayment,
  AdminPaymentDetail,
  AdminSubscription,
  AdminCreateSubscriptionPayload,
  ExtendPayload,
  PaginationParams,
  PaymentQueryParams,
  PaymentListResponse,
  TransactionQueryParams,
} from '@/types/api'

// ============================================================================
// Admin Users
// ============================================================================

/**
 * Получить список пользователей
 */
export async function adminListUsers(params?: PaginationParams): Promise<ApiResponse<User[]>> {
  return fetchAPI<User[]>(withQuery('/admin/users', params as Record<string, any>))
}

/**
 * Получить пользователя по ID
 */
export async function adminGetUser(userId: number): Promise<ApiResponse<User>> {
  return fetchAPI<User>(`/admin/users/${userId}`)
}

/**
 * Удалить пользователя
 */
export async function adminDeleteUser(userId: number): Promise<ApiResponse<void>> {
  return fetchAPI<void>(`/admin/users/${userId}`, {
    method: 'DELETE',
  })
}

/**
 * Включить/выключить пользователя (toggle active)
 */
export async function adminToggleUserActive(userId: number): Promise<ApiResponse<User>> {
  return fetchAPI<User>(`/admin/users/${userId}/toggle-active`, {
    method: 'POST',
  })
}

/**
 * Сделать пользователя суперюзером
 */
export async function adminMakeSuperuser(userId: number): Promise<ApiResponse<User>> {
  return fetchAPI<User>(`/admin/users/${userId}/make-superuser`, {
    method: 'POST',
  })
}

/**
 * Применить план (тариф) к пользователю
 */
export async function adminApplyPlan(
  userId: number,
  planId: number
): Promise<ApiResponse<User>> {
  return fetchAPI<User>(`/admin/users/${userId}/apply_plan`, {
    method: 'POST',
    body: JSON.stringify({ plan_id: planId }),
  })
}

// ============================================================================
// Admin Subscriptions
// ============================================================================

/**
 * Список подписок
 */
export async function adminListSubscriptions(
  params?: PaginationParams
): Promise<ApiResponse<AdminSubscription[]>> {
  return fetchAPI<AdminSubscription[]>(withQuery('/admin/subscriptions', params as Record<string, any>))
}

/**
 * Подписка по ID
 */
export async function adminGetSubscription(
  subscriptionId: number
): Promise<ApiResponse<AdminSubscription>> {
  return fetchAPI<AdminSubscription>(`/admin/subscriptions/${subscriptionId}`)
}

/**
 * Создать подписку (user_id, tariff_id — query или body, бэк ожидает query)
 */
export async function adminCreateSubscription(
  payload: AdminCreateSubscriptionPayload
): Promise<ApiResponse<AdminSubscription>> {
  return fetchAPI<AdminSubscription>(
    withQuery('/admin/subscriptions/', payload as Record<string, any>),
    { method: 'POST' }
  )
}

/**
 * Удалить подписку
 */
export async function adminDeleteSubscription(
  subscriptionId: number
): Promise<ApiResponse<void>> {
  return fetchAPI<void>(`/admin/subscriptions/${subscriptionId}`, {
    method: 'DELETE',
  })
}

/**
 * Продлить подписку на N дней
 */
export async function adminExtendSubscription(
  subscriptionId: number,
  days: number = 30
): Promise<ApiResponse<AdminSubscription>> {
  return fetchAPI<AdminSubscription>(
    withQuery(`/admin/subscriptions/${subscriptionId}/extend`, { days }),
    { method: 'POST' }
  )
}

/**
 * Включить/выключить подписку (toggle)
 */
export async function adminToggleSubscription(
  subscriptionId: number
): Promise<ApiResponse<AdminSubscription>> {
  return fetchAPI<AdminSubscription>(
    `/admin/subscriptions/${subscriptionId}/toggle`,
    { method: 'POST' }
  )
}

// ============================================================================
// Admin VPN Clients
// ============================================================================

// ============================================================================
// Admin VPN Clients
// ============================================================================

/**
 * Получить список VPN клиентов
 */
export async function adminListVPNClients(params?: PaginationParams): Promise<ApiResponse<AdminVPNClient[]>> {
  return fetchAPI<AdminVPNClient[]>(withQuery('/admin/vpn/clients', params as Record<string, any>))
}

/**
 * Получить VPN клиента по ID
 */
export async function adminGetVPNClient(clientId: number): Promise<ApiResponse<AdminVPNClient>> {
  return fetchAPI<AdminVPNClient>(`/admin/vpn/clients/${clientId}`)
}

/**
 * Создать VPN клиента
 */
export async function adminCreateVPNClient(
  payload: CreateVPNClientPayload
): Promise<ApiResponse<AdminVPNClient>> {
  return fetchAPI<AdminVPNClient>('/admin/vpn/clients', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

/**
 * Обновить VPN клиента
 */
export async function adminUpdateVPNClient(
  id: number,
  payload: UpdateVPNClientPayload
): Promise<ApiResponse<AdminVPNClient>> {
  return fetchAPI<AdminVPNClient>(`/admin/vpn/clients/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

/**
 * Удалить VPN клиента
 */
export async function adminDeleteVPNClient(id: number): Promise<ApiResponse<void>> {
  return fetchAPI<void>(`/admin/vpn/clients/${id}`, {
    method: 'DELETE',
  })
}

/**
 * Продлить VPN клиента (days или expires_at)
 */
export async function adminExtendVPNClient(
  clientId: number,
  payload?: ExtendPayload
): Promise<ApiResponse<AdminVPNClient>> {
  return fetchAPI<AdminVPNClient>(`/admin/vpn/clients/${clientId}/extend`, {
    method: 'POST',
    body: payload ? JSON.stringify(payload) : undefined,
  })
}

/**
 * Включить/выключить VPN клиента (toggle)
 */
export async function adminToggleVPNClient(
  clientId: number
): Promise<ApiResponse<AdminVPNClient>> {
  return fetchAPI<AdminVPNClient>(`/admin/vpn/clients/${clientId}/toggle`, {
    method: 'POST',
  })
}

// ============================================================================
// Admin Tariffs
// ============================================================================

/**
 * Получить список тарифов
 */
export async function adminListTariffs(params?: PaginationParams): Promise<ApiResponse<Tariff[]>> {
  return fetchAPI<Tariff[]>(withQuery('/admin/tariffs', params as Record<string, any>))
}

/**
 * Создать тариф
 */
export async function adminCreateTariff(payload: CreateTariffPayload): Promise<ApiResponse<Tariff>> {
  return fetchAPI<Tariff>('/admin/tariffs', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

/**
 * Обновить тариф
 */
export async function adminUpdateTariff(id: number, payload: UpdateTariffPayload): Promise<ApiResponse<Tariff>> {
  return fetchAPI<Tariff>(`/admin/tariffs/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
}

/**
 * Удалить тариф
 */
export async function adminDeleteTariff(id: number): Promise<ApiResponse<void>> {
  return fetchAPI<void>(`/admin/tariffs/${id}`, {
    method: 'DELETE',
  })
}

/**
 * Включить/выключить тариф (toggle)
 */
export async function adminToggleTariff(id: number): Promise<ApiResponse<Tariff>> {
  return fetchAPI<Tariff>(`/admin/tariffs/${id}/toggle`, {
    method: 'POST',
  })
}

// ============================================================================
// Admin Finance
// ============================================================================

/**
 * Получить финансовую статистику
 */
export async function getAdminFinanceStats(): Promise<ApiResponse<AdminFinanceStats>> {
  return fetchAPI<AdminFinanceStats>('/admin/finance/stats')
}

/**
 * Получить данные для графика
 */
export async function getAdminFinanceChart(
  period: '7days' | '30days' | '12months'
): Promise<ApiResponse<AdminFinanceChartData>> {
  return fetchAPI<AdminFinanceChartData>(`/admin/finance/chart/${period}`)
}

/**
 * Получить историю платежей
 */
export async function getAdminPayments(params?: PaymentQueryParams): Promise<ApiResponse<AdminPayment[]>> {
  return fetchAPI<AdminPayment[]>(withQuery('/admin/finance/payments', params as Record<string, any>))
}

/**
 * Детали платежа (с user, tariff)
 */
export async function getAdminPaymentDetails(
  paymentId: number
): Promise<ApiResponse<AdminPaymentDetail>> {
  return fetchAPI<AdminPaymentDetail>(`/admin/finance/payments/${paymentId}`)
}

/**
 * Транзакции с фильтрами (status, method, start_date, end_date)
 */
export async function getAdminTransactions(
  params?: TransactionQueryParams
): Promise<ApiResponse<PaymentListResponse>> {
  return fetchAPI<PaymentListResponse>(
    withQuery('/admin/finance/transactions', params as Record<string, any>)
  )
}

/**
 * Сводка по финансам (total_revenue, top_tariffs, recent_transactions_24h и т.д.)
 */
export async function getAdminFinanceSummary(): Promise<ApiResponse<AdminFinanceSummary>> {
  return fetchAPI<AdminFinanceSummary>('/admin/finance/summary')
}
