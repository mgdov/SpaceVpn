"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2, CheckCircle2, XCircle } from "lucide-react"
import { PixelStars } from "@/components/pixel-stars"
import { setAuthToken, getCurrentUserInfo, setCurrentUser } from "@/lib/api"

function AuthCallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [error, setError] = useState("")

  useEffect(() => {
    handleCallback()
  }, [])

  const handleCallback = async () => {
    // Get token from URL params (set by backend redirect)
    const token = searchParams.get("token")
    const errorParam = searchParams.get("error")

    if (errorParam) {
      setStatus("error")
      setError(errorParam)
      return
    }

    if (!token) {
      setStatus("error")
      setError("Токен авторизации не найден")
      return
    }

    try {
      // Save token
      setAuthToken(token)

      // Get user info
      const userResponse = await getCurrentUserInfo()
      if (userResponse.data) {
        setCurrentUser(userResponse.data)
        setStatus("success")

        // Redirect to account after short delay
        setTimeout(() => {
          router.push("/account")
        }, 1500)
      } else {
        setStatus("error")
        setError(userResponse.error || "Не удалось получить данные пользователя")
      }
    } catch (err) {
      setStatus("error")
      setError("Ошибка авторизации")
    }
  }

  return (
    <div className="min-h-screen bg-background relative flex items-center justify-center px-4">
      <PixelStars />

      <div className="w-full max-w-md relative z-10 text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-primary flex items-center justify-center">
            <span className="text-background text-sm">S</span>
          </div>
        </div>

        {status === "loading" && (
          <div className="space-y-4">
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
            <p className="text-foreground">Авторизация...</p>
            <p className="text-muted-foreground text-sm">Пожалуйста, подождите</p>
          </div>
        )}

        {status === "success" && (
          <div className="space-y-4">
            <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
            <p className="text-foreground">Вход выполнен успешно!</p>
            <p className="text-muted-foreground text-sm">Перенаправление в личный кабинет...</p>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-4">
            <XCircle className="w-12 h-12 text-red-500 mx-auto" />
            <p className="text-foreground">Ошибка авторизации</p>
            <p className="text-red-400 text-sm">{error}</p>
            <button
              onClick={() => router.push("/login")}
              className="mt-4 bg-primary text-primary-foreground px-6 py-2 text-sm hover:bg-primary/80 transition-colors"
            >
              Вернуться к входу
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
        <PixelStars />
        <div className="flex flex-col items-center gap-4 relative z-10">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
          <p className="text-foreground">Загрузка...</p>
        </div>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  )
}
