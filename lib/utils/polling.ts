/**
 * Утилита для polling API
 */

import type { ApiResponse } from '@/types/api'

export interface PollingOptions {
  maxAttempts?: number
  intervalMs?: number
  onAttempt?: (attempt: number) => void
}

/**
 * Универсальный polling helper
 * Выполняет функцию с интервалом пока не получит успешный результат или не достигнет лимита попыток
 */
export async function pollUntilSuccess<T>(
  fn: () => Promise<ApiResponse<T>>,
  options: PollingOptions = {}
): Promise<ApiResponse<T>> {
  const {
    maxAttempts = 15,
    intervalMs = 2000,
    onAttempt,
  } = options

  for (let i = 0; i < maxAttempts; i++) {
    if (onAttempt) {
      onAttempt(i + 1)
    }

    const response = await fn()

    if (response.data && !response.error) {
      return response
    }

    if (response.status !== 202) {
      return response
    }

    if (i < maxAttempts - 1) {
      await new Promise(resolve => setTimeout(resolve, intervalMs))
    }
  }

  return { error: 'Timeout: превышено максимальное количество попыток' }
}

/**
 * Polling с условием остановки
 */
export async function pollUntil<T>(
  fn: () => Promise<ApiResponse<T>>,
  shouldStop: (response: ApiResponse<T>) => boolean,
  options: PollingOptions = {}
): Promise<ApiResponse<T>> {
  const {
    maxAttempts = 15,
    intervalMs = 2000,
    onAttempt,
  } = options

  for (let i = 0; i < maxAttempts; i++) {
    if (onAttempt) {
      onAttempt(i + 1)
    }

    const response = await fn()

    if (shouldStop(response)) {
      return response
    }

    if (i < maxAttempts - 1) {
      await new Promise(resolve => setTimeout(resolve, intervalMs))
    }
  }

  return { error: 'Timeout: превышено максимальное количество попыток' }
}
