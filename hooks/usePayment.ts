/**
 * Payment hook
 */

'use client'

import { useState, useCallback } from 'react'
import { createPayment, getPaymentStatus } from '@/lib/api/payments'
import { pollKeyByPayment } from '@/lib/api/public-api'
import type { Payment, KeyByPaymentResponse } from '@/types/api'

interface UsePaymentReturn {
  payment: Payment | null
  key: KeyByPaymentResponse | null
  loading: boolean
  error: string | null
  pollingAttempt: number
  initiatePayment: (tariffId: number, returnUrl?: string) => Promise<void>
  checkPaymentStatus: (paymentId: string) => Promise<void>
  waitForKey: (paymentId: string) => Promise<void>
  reset: () => void
}

export function usePayment(): UsePaymentReturn {
  const [payment, setPayment] = useState<Payment | null>(null)
  const [key, setKey] = useState<KeyByPaymentResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pollingAttempt, setPollingAttempt] = useState(0)

  const initiatePayment = useCallback(async (tariffId: number, returnUrl?: string) => {
    setLoading(true)
    setError(null)

    const response = await createPayment({
      tariff_id: tariffId,
      return_url: returnUrl || window.location.origin + '/account/keys',
    })

    setLoading(false)

    if (response.data) {
      if (response.data.confirmation_url) {
        window.location.href = response.data.confirmation_url
      }
    } else {
      setError(response.error || 'Ошибка создания платежа')
    }
  }, [])

  const checkPaymentStatus = useCallback(async (paymentId: string) => {
    setLoading(true)
    setError(null)

    const response = await getPaymentStatus(paymentId)

    setLoading(false)

    if (response.data) {
      setPayment(response.data)
    } else {
      setError(response.error || 'Ошибка проверки статуса платежа')
    }
  }, [])

  const waitForKey = useCallback(async (paymentId: string) => {
    setLoading(true)
    setError(null)
    setPollingAttempt(0)

    const response = await pollKeyByPayment(paymentId, 15, 2000)

    setLoading(false)

    if (response.data) {
      setKey(response.data)
    } else {
      setError(response.error || 'Ключ не был создан после оплаты')
    }
  }, [])

  const reset = useCallback(() => {
    setPayment(null)
    setKey(null)
    setLoading(false)
    setError(null)
    setPollingAttempt(0)
  }, [])

  return {
    payment,
    key,
    loading,
    error,
    pollingAttempt,
    initiatePayment,
    checkPaymentStatus,
    waitForKey,
    reset,
  }
}
