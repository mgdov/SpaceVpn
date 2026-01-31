"use client"

import type React from "react"
import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2 } from "lucide-react"
import { PixelStars } from "@/components/pixel-stars"
import { useAuth } from "@/lib/auth-context"
import { verifyEmail, sendVerificationCode } from "@/lib/api"

function VerifyEmailContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { refreshUser } = useAuth()

  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [resendSent, setResendSent] = useState(false)

  // Pre-fill email from query (after registration)
  useEffect(() => {
    const q = searchParams.get("email")
    if (q) setEmail(decodeURIComponent(q))
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!email.trim() || !code.trim()) {
      setError("Введите email и код из письма.")
      return
    }
    if (code.trim().length < 4) {
      setError("Код должен содержать не менее 4 символов.")
      return
    }
    setLoading(true)
    try {
      const response = await verifyEmail({ email: email.trim().toLowerCase(), code: code.trim() })
      if (response.data?.access_token) {
        await refreshUser()
        router.push("/account")
        return
      }
      setError(response.error || "Неверный или истёкший код. Запросите новый код.")
    } catch (err) {
      setError("Ошибка сети. Проверьте подключение к интернету.")
    } finally {
      setLoading(false)
    }
  }

  const handleResendCode = async () => {
    if (!email.trim()) {
      setError("Введите email.")
      return
    }
    setError("")
    setResendLoading(true)
    setResendSent(false)
    try {
      const response = await sendVerificationCode({
        email: email.trim().toLowerCase(),
        purpose: "register",
      })
      if (!response.error) {
        setResendSent(true)
      } else {
        setError(response.error || "Не удалось отправить код.")
      }
    } catch (err) {
      setError("Ошибка сети. Проверьте подключение к интернету.")
    } finally {
      setResendLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background relative flex items-center justify-center px-3 sm:px-4 py-6 sm:py-8">
      <PixelStars />

      <Link
        href="/login"
        className="absolute top-3 left-3 sm:top-4 sm:left-4 text-muted-foreground hover:text-primary text-[9px] sm:text-[10px] z-20"
      >
        ← Назад
      </Link>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary flex items-center justify-center">
              <span className="text-background text-xs sm:text-sm">S</span>
            </div>
          </div>
          <h1 className="text-foreground text-xs sm:text-sm">ПОДТВЕРЖДЕНИЕ EMAIL</h1>
          <p className="text-muted-foreground text-[9px] sm:text-[10px] mt-2">
            Введите код из письма. После подтверждения вы автоматически войдёте в аккаунт.
          </p>
        </div>

        {resendSent && (
          <div className="mb-4 p-3 bg-green-500/10 border border-green-500/50 text-green-600 dark:text-green-400 text-[10px]">
            Новый код отправлен на почту. Проверьте папку «Спам», если письма нет.
          </div>
        )}

        {error && (
          <div className="mb-3 sm:mb-4 p-2.5 sm:p-3 bg-red-500/10 border border-red-500/50 text-red-500 text-[9px] sm:text-[10px]">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-foreground text-[9px] sm:text-[10px] mb-1.5 sm:mb-2">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              disabled={loading}
              className="w-full bg-card border border-border px-3 sm:px-4 py-2.5 sm:py-3 text-foreground text-[9px] sm:text-[10px] placeholder:text-muted-foreground focus:outline-none focus:border-primary disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-foreground text-[9px] sm:text-[10px] mb-1.5 sm:mb-2">
              Код из письма
            </label>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 8))}
              placeholder="123456"
              required
              disabled={loading}
              className="w-full bg-card border border-border px-3 sm:px-4 py-2.5 sm:py-3 text-foreground text-[9px] sm:text-[10px] placeholder:text-muted-foreground focus:outline-none focus:border-primary disabled:opacity-50 tracking-widest text-center"
              maxLength={8}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-2.5 sm:py-3 text-[9px] sm:text-[10px] hover:bg-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />
                Подтверждаю...
              </>
            ) : (
              "Подтвердить и войти"
            )}
          </button>
        </form>

        <div className="mt-3 sm:mt-4 text-center">
          <button
            type="button"
            onClick={handleResendCode}
            disabled={resendLoading || loading}
            className="text-muted-foreground hover:text-primary text-[9px] sm:text-[10px] underline disabled:opacity-50"
          >
            {resendLoading ? (
              <span className="inline-flex items-center gap-1">
                <Loader2 className="w-3 h-3 animate-spin" />
                Отправка...
              </span>
            ) : (
              "Отправить код повторно"
            )}
          </button>
        </div>

        <Link
          href="/login"
          className="block w-full mt-3 sm:mt-4 bg-card border border-border py-2.5 sm:py-3 text-center text-foreground text-[9px] sm:text-[10px] hover:border-primary transition-colors"
        >
          Уже есть аккаунт — Войти
        </Link>
      </div>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-muted-foreground text-sm">Загрузка...</div>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  )
}
