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
  AdminPayment,
  PaginationParams,
  PaymentQueryParams,
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
 * Удалить пользователя
 */
export async function adminDeleteUser(userId: number): Promise<ApiResponse<void>> {
  return fetchAPI<void>(`/admin/users/${userId}`, {
    method: 'DELETE',
  })
}

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
