"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { getPublicTariffs, getMySubscriptions, createYookassaPayment, type Tariff } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, Loader2, ShoppingCart, Gift } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PixelStars } from "@/components/pixel-stars"
import { useAuth } from "@/lib/auth-context"

export default function TariffsPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [tariffs, setTariffs] = useState<Tariff[]>([])
  const [loading, setLoading] = useState(true)
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false)
  const [purchasing, setPurchasing] = useState<number | null>(null)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  useEffect(() => {
    loadTariffs()
  }, [])

  useEffect(() => {
    if (user) loadMySubscriptions()
  }, [user])

  const loadTariffs = async () => {
    setLoading(true)
    const response = await getPublicTariffs()
    if (response.data?.length) {
      setTariffs(response.data.filter((tariff) => tariff.is_active))
    }
    setLoading(false)
  }

  const loadMySubscriptions = async () => {
    const res = await getMySubscriptions()
    const active = res.data?.subscriptions?.some((s: { status: string }) => s.status === "active") ?? false
    setHasActiveSubscription(active)
  }

  const handlePurchaseWithoutRegistration = async (tariffId: number, tariffName: string, tariffPrice: number) => {
    setPurchasing(tariffId)
    setMessage(null)

    try {
      const response = await createYookassaPayment({
        tariffId,
        plan: tariffName,
        price: tariffPrice,
        description: `Оплата тарифа ${tariffName}`,
      })

      if (response.data?.confirmation_url) {
        window.location.href = response.data.confirmation_url
        return
      }

      setMessage({ type: 'error', text: response.error || 'Не удалось инициировать оплату' })
    } catch (e) {
      setMessage({ type: 'error', text: 'Ошибка подключения к платежной системе' })
    } finally {
      setPurchasing(null)
    }
  }

  const handlePurchaseForUser = async (tariffId: number, tariffName: string, tariffPrice: number) => {
    if (hasActiveSubscription) {
      router.push("/account/keys")
      return
    }

    setPurchasing(tariffId)
    setMessage(null)

    try {
      const response = await createYookassaPayment({
        tariffId,
        plan: tariffName,
        price: tariffPrice,
        description: `Оплата тарифа ${tariffName}`,
      })

      if (response.data?.confirmation_url) {
        window.location.href = response.data.confirmation_url
        return
      }

      setMessage({ type: 'error', text: response.error || 'Не удалось инициировать оплату' })
    } catch (e) {
      setMessage({ type: 'error', text: 'Ошибка подключения к платежной системе' })
    } finally {
      setPurchasing(null)
    }
  }

  const formatDuration = (days: number) => {
    if (days === 1) return "1 день"
    if (days < 5) return `${days} дня`
    if (days < 21) return `${days} дней`
    if (days === 30) return "1 месяц"
    if (days === 60) return "2 месяца"
    if (days === 90) return "3 месяца"
    if (days === 180) return "6 месяцев"
    if (days === 365) return "1 год"
    return `${days} дней`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background relative flex items-center justify-center">
        <PixelStars />
        <Header />
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background relative">
      <PixelStars />
      <Header />

      <main className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-3 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Заголовок */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">
              ТАРИФЫ
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
              Выберите подходящий тариф для комфортного и безопасного интернета
            </p>
            {!user && (
              <p className="mt-3 text-muted-foreground text-xs sm:text-sm">
                Уже есть аккаунт?{" "}
                <Link href="/login?redirect=/tariffs" className="text-primary hover:underline font-medium">
                  Войти
                </Link>
                {" — после входа вернётесь на эту страницу."}
              </p>
            )}
          </div>

          {hasActiveSubscription && (
            <div className="mb-6 max-w-2xl mx-auto p-4 bg-primary/10 border-2 border-primary rounded-lg flex flex-wrap items-center justify-between gap-3">
              <p className="text-foreground text-sm">
                У вас активный тариф. Продлить или посмотреть ключи можно в разделе Ключи.
              </p>
              <Link
                href="/account/keys"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold hover:bg-primary/90 transition-colors rounded"
              >
                Перейти к ключам
              </Link>
            </div>
          )}

          {message && (
            <Alert className="mb-6 max-w-2xl mx-auto" variant={message.type === "error" ? "destructive" : "default"}>
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}

          {/* Сетка тарифов */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {tariffs.map((tariff, idx) => (
              <div
                key={tariff.id}
                className="relative bg-card/80 border-2 border-green-500 hover:border-green-400 transition-all p-5 sm:p-6 flex flex-col gap-4 shadow-[0_0_20px_rgba(34,197,94,0.15)]"
              >
                {idx === 0 && (
                  <span className="absolute -top-4 left-4 bg-green-500 text-slate-900 text-[10px] sm:text-xs font-bold tracking-[0.08em] px-3 py-1">
                    ПОПУЛЯРНЫЙ
                  </span>
                )}

                {/* Название и длительность */}
                <div className="text-center space-y-2">
                  <p className="text-teal-300 text-[11px] sm:text-xs tracking-[0.2em] uppercase">{tariff.name}</p>
                  <p className="text-3xl sm:text-4xl font-bold text-foreground uppercase leading-tight">
                    {formatDuration(tariff.duration_days)}
                  </p>
                </div>

                {/* Цена */}
                <div className="text-center space-y-1">
                  <div className="text-5xl sm:text-6xl font-extrabold text-green-500 leading-none">
                    {tariff.price === 0 ? "0" : tariff.price}
                    <span className="text-3xl sm:text-4xl align-top">₽</span>
                  </div>
                  <div className="text-xs sm:text-sm tracking-[0.25em] text-muted-foreground uppercase">
                    за весь период
                  </div>
                </div>

                {/* Особенности */}
                {tariff.features && (
                  <div className="space-y-2 text-left">
                    <ul className="space-y-2">
                      {(typeof tariff.features === "string" ? tariff.features.split("\n").filter(Boolean) : tariff.features).map((feature: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-foreground/90 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Кнопки */}
                <div className="mt-auto space-y-2 pt-2">
                  {!user ? (
                    <>
                      {/* Для незарегистрированных пользователей */}
                      <Button
                        onClick={() => handlePurchaseWithoutRegistration(tariff.id, tariff.name, tariff.price)}
                        disabled={purchasing === tariff.id}
                        className="w-full bg-green-500 hover:bg-green-400 text-slate-900 font-black tracking-[0.08em]"
                        size="lg"
                      >
                        {purchasing === tariff.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            КУПИТЬ БЕЗ РЕГИСТРАЦИИ
                          </>
                        )}
                      </Button>

                      <Button
                        onClick={() => router.push("/register")}
                        variant="outline"
                        className="w-full border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-slate-900 hover:border-green-500 transition-colors font-black tracking-[0.08em]"
                        size="lg"
                      >
                        <Gift className="w-4 h-4 mr-2" />
                        ПОПРОБОВАТЬ БЕСПЛАТНО
                      </Button>
                    </>
                  ) : (
                    <>
                      {/* Для зарегистрированных пользователей */}
                      <Button
                        onClick={() => handlePurchaseForUser(tariff.id, tariff.name, tariff.price)}
                        disabled={purchasing === tariff.id}
                        className="w-full bg-green-500 hover:bg-green-400 text-slate-900 font-black tracking-[0.08em]"
                        size="lg"
                      >
                        {purchasing === tariff.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : hasActiveSubscription ? (
                          "ПЕРЕЙТИ К КЛЮЧАМ"
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            КУПИТЬ VPN
                          </>
                        )}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {tariffs.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-sm sm:text-base">
                На данный момент нет доступных тарифов
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
