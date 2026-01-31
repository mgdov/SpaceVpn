"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import { PixelStars } from "@/components/pixel-stars"
import { useAuth } from "@/lib/auth-context"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation
    if (formData.username.length < 3) {
      setError("Имя пользователя должно содержать минимум 3 символа")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Пароли не совпадают!")
      return
    }

    if (formData.password.length < 8) {
      setError("Пароль должен содержать минимум 8 символов")
      return
    }

    setLoading(true)

    try {
      const result = await register(formData.username, formData.email, formData.password)
      if (result.success) {
        if (result.needsEmailVerification) {
          setError("")
          setLoading(false)
          router.push("/login?message=verify-email")
          return
        }
        router.push("/account")
      } else {
        setError(result.error || "Ошибка регистрации")
      }
    } catch (err) {
      setError("Ошибка сети. Проверьте подключение к интернету.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background relative flex items-center justify-center px-3 sm:px-4 py-6 sm:py-8">
      <PixelStars />

      <Link href="/" className="absolute top-3 left-3 sm:top-4 sm:left-4 text-muted-foreground hover:text-primary text-[9px] sm:text-[10px] z-20">
        ← Назад
      </Link>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary flex items-center justify-center">
              <span className="text-background text-xs sm:text-sm">S</span>
            </div>
          </div>
          <h1 className="text-foreground text-xs sm:text-sm">СОЗДАТЬ АККАУНТ</h1>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-3 sm:mb-4 p-2.5 sm:p-3 bg-red-500/10 border border-red-500/50 text-red-500 text-[9px] sm:text-[10px] space-y-2">
            <p>{error}</p>
            {error.toLowerCase().includes("already registered") && (
              <p className="text-muted-foreground mt-2">
                Уже есть аккаунт?{" "}
                <Link href="/login" className="text-primary underline">Войти</Link>
                {" или "}
                <Link href="/forgot-password" className="text-primary underline">Восстановить пароль</Link>.
              </p>
            )}
          </div>
        )}

        {/* Social Register */}
        <div className="flex gap-2 sm:gap-4 mb-4 sm:mb-6">
          <button className="flex-1 bg-card border border-border py-2.5 sm:py-3 flex items-center justify-center gap-1.5 sm:gap-2 hover:border-primary transition-colors">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-foreground text-[9px] sm:text-[10px]">Google</span>
          </button>
          <button className="flex-1 bg-card border border-border py-2.5 sm:py-3 flex items-center justify-center gap-1.5 sm:gap-2 hover:border-primary transition-colors">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="#0088cc">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.37-.49 1.02-.74 3.98-1.73 6.64-2.87 7.97-3.43 3.79-1.6 4.58-1.88 5.1-1.89.11 0 .37.03.54.17.14.12.18.28.2.45-.01.06.01.24 0 .38z" />
            </svg>
            <span className="text-foreground text-[9px] sm:text-[10px]">Telegram</span>
          </button>
        </div>

        <div className="relative mb-4 sm:mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-3 sm:px-4 text-muted-foreground text-[8px] sm:text-[9px]">или</span>
          </div>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-foreground text-[9px] sm:text-[10px] mb-1.5 sm:mb-2">E-mail</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your@email.com"
              required
              disabled={loading}
              className="w-full bg-card border border-border px-3 sm:px-4 py-2.5 sm:py-3 text-foreground text-[9px] sm:text-[10px] placeholder:text-muted-foreground focus:outline-none focus:border-primary disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-foreground text-[9px] sm:text-[10px] mb-1.5 sm:mb-2">Имя пользователя (минимум 3 символа)</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="username"
              required
              minLength={3}
              maxLength={100}
              disabled={loading}
              className="w-full bg-card border border-border px-3 sm:px-4 py-2.5 sm:py-3 text-foreground text-[9px] sm:text-[10px] placeholder:text-muted-foreground focus:outline-none focus:border-primary disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-foreground text-[9px] sm:text-[10px] mb-1.5 sm:mb-2">Пароль</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Минимум 8 символов"
                required
                disabled={loading}
                className="w-full bg-card border border-border px-3 sm:px-4 py-2.5 sm:py-3 text-foreground text-[9px] sm:text-[10px] placeholder:text-muted-foreground focus:outline-none focus:border-primary pr-10 sm:pr-12 disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                disabled={loading}
              >
                {showPassword ? <EyeOff size={16} className="sm:w-[18px] sm:h-[18px]" /> : <Eye size={16} className="sm:w-[18px] sm:h-[18px]" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-foreground text-[9px] sm:text-[10px] mb-1.5 sm:mb-2">Подтвердите пароль</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder="Повторите пароль"
              required
              disabled={loading}
              className="w-full bg-card border border-border px-3 sm:px-4 py-2.5 sm:py-3 text-foreground text-[9px] sm:text-[10px] placeholder:text-muted-foreground focus:outline-none focus:border-primary disabled:opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-2.5 sm:py-3 text-[9px] sm:text-[10px] hover:bg-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Регистрация..." : "Создать аккаунт"}
          </button>
        </form>

        {/* Buy without registration button */}
        <Link
          href="/buy-no-register"
          className="mt-3 sm:mt-4 w-full bg-card border-2 border-border hover:border-primary text-foreground py-2.5 sm:py-3 text-[9px] sm:text-[10px] hover:bg-accent/5 transition-colors flex items-center justify-center"
        >
          💳 Купить без регистрации
        </Link>

        <p className="text-center mt-3 sm:mt-4 text-muted-foreground text-[8px] sm:text-[9px]">
          Уже есть аккаунт?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Войти
          </Link>
        </p>
      </div>
    </div>
  )
}
