/**
 * Polling hook
 */

'use client'

import { useState, useCallback } from 'react'
import type { ApiResponse } from '@/types/api'
import { pollUntilSuccess, PollingOptions } from '@/lib/utils/polling'

interface UsePollingReturn<T> {
  data: T | null
  loading: boolean
  error: string | null
  attempt: number
  startPolling: (fn: () => Promise<ApiResponse<T>>, options?: PollingOptions) => Promise<void>
  reset: () => void
}

export function usePolling<T>(): UsePollingReturn<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [attempt, setAttempt] = useState(0)

  const startPolling = useCallback(async (
    fn: () => Promise<ApiResponse<T>>,
    options?: PollingOptions
  ) => {
    setLoading(true)
    setError(null)
    setAttempt(0)

    const response = await pollUntilSuccess(fn, {
      ...options,
      onAttempt: (attemptNum) => {
        setAttempt(attemptNum)
        if (options?.onAttempt) {
          options.onAttempt(attemptNum)
        }
      },
    })

    setLoading(false)

    if (response.data) {
      setData(response.data)
    } else {
      setError(response.error || 'Ошибка polling')
    }
  }, [])

  const reset = useCallback(() => {
    setData(null)
    setLoading(false)
    setError(null)
    setAttempt(0)
  }, [])

  return {
    data,
    loading,
    error,
    attempt,
    startPolling,
    reset,
  }
}
