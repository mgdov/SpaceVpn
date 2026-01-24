"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2, CheckCircle2, XCircle } from "lucide-react"
import { PixelStars } from "@/components/pixel-stars"
import { telegramAuthCallback, getCurrentUserInfo, setCurrentUser } from "@/lib/api"

export default function TelegramCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [error, setError] = useState("")

  useEffect(() => {
    handleTelegramCallback()
  }, [])

  const handleTelegramCallback = async () => {
    // Get Telegram auth data from URL hash or params
    const id = searchParams.get("id")
    const first_name = searchParams.get("first_name")
    const last_name = searchParams.get("last_name")
    const username = searchParams.get("username")
    const photo_url = searchParams.get("photo_url")
    const auth_date = searchParams.get("auth_date")
    const hash = searchParams.get("hash")

    if (!id || !hash || !auth_date) {
      setStatus("error")
      setError("Данные авторизации Telegram не найдены")
      return
    }

    try {
      const response = await telegramAuthCallback({
        id: parseInt(id),
        first_name: first_name || "",
        last_name: last_name || undefined,
        username: username || undefined,
        photo_url: photo_url || undefined,
        auth_date: parseInt(auth_date),
        hash: hash,
      })

      if (response.data?.access_token) {
        // Get user info
        const userResponse = await getCurrentUserInfo()
        if (userResponse.data) {
          setCurrentUser(userResponse.data)
        }
        
        setStatus("success")
        
        // Redirect to account
        setTimeout(() => {
          router.push("/account")
        }, 1500)
      } else {
        setStatus("error")
        setError(response.error || "Ошибка авторизации через Telegram")
      }
    } catch (err) {
      setStatus("error")
      setError("Ошибка подключения")
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
            <p className="text-foreground">Авторизация через Telegram...</p>
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
