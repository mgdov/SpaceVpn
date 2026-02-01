"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { getPublicTariffs, getMySubscriptions, createYookassaPayment, type Tariff } from "@/lib/api"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
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
    if (user) {
      loadMySubscriptions()
    }
  }, [user])

  const loadTariffs = async () => {
    setLoading(true)
    const response = await getPublicTariffs()
    const activeTariffs = response.data?.length ? response.data.filter((tariff) => tariff.is_active) : []

    const testTariff: Tariff = {
      id: -1,
      name: "Тестовый тариф",
      description: "Временный тестовый доступ для проверки скорости и стабильности.",
      tagline: null,
      duration_days: 2,
      price: 0,
      data_limit_gb: 999,
      devices_count: 1,
      is_active: true,
      is_featured: false,
      features: "2 дня бесплатного доступа\nПолный функционал без ограничений\nПодходит для проверки скорости",
      sort_order: 9999,
    }

    setTariffs([...activeTariffs, testTariff])
    setLoading(false)
  }

  const loadMySubscriptions = async () => {
    const res = await getMySubscriptions()
    const active = res.data?.subscriptions?.some((sub: { status: string }) => sub.status === "active") ?? false
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

      setMessage({ type: "error", text: response.error || "Не удалось инициировать оплату" })
    } catch (error) {
      setMessage({ type: "error", text: "Ошибка подключения к платежной системе" })
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

      setMessage({ type: "error", text: response.error || "Не удалось инициировать оплату" })
    } catch (error) {
      setMessage({ type: "error", text: "Ошибка подключения к платежной системе" })
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

  const formatDurationLabel = (days: number) => {
    return formatDuration(days)
      .replace(/месяцев/gi, "мес.")
      .replace(/месяца/gi, "мес.")
      .replace(/месяц/gi, "мес.")
      .toUpperCase()
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
            {tariffs.map((tariff, index) => {
              const isPopular = index === 0
              const isFree = tariff.price === 0
              const description = tariff.description?.trim() || (typeof tariff.features === "string" ? tariff.features.split("\n")[0] : tariff.features?.[0]) || ""

              return (
                <div key={tariff.id} className="relative bg-card border border-primary p-5 sm:p-6 md:p-8 flex flex-col gap-6">
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 text-[8px] tracking-[0.2em]">
                      ПОПУЛЯРНЫЙ
                    </div>
                  )}

                  <div className="text-center space-y-4">
                    <p className="text-accent text-[9px] tracking-[0.35em] uppercase"># {tariff.name}</p>
                    <h3 className="text-foreground text-base sm:text-lg font-semibold">{formatDurationLabel(tariff.duration_days)}</h3>
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-primary text-3xl sm:text-4xl font-bold">{isFree ? 0 : tariff.price}</span>
                        <span className="text-muted-foreground text-[12px]">₽</span>
                      </div>
                      <span className="text-muted-foreground text-[9px] uppercase tracking-[0.25em]">
                        ЗА ВЕСЬ ПЕРИОД
                      </span>
                    </div>
                  </div>

                  <p className="flex-1 text-muted-foreground text-[11px] leading-relaxed">
                    {description || "🚀 Идеально для знакомства с сервисом! Полный доступ ко всем функциям на 2 дня"}
                  </p>

                  <div className="flex flex-col gap-2">
                    {!user ? (
                      <>
                        <button
                          onClick={() => router.push("/register")}
                          className="flex-1 flex items-center justify-center py-3 md:py-4 px-2 md:px-3 text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] transition-colors bg-primary text-primary-foreground hover:bg-primary/80"
                        >
                          ПОПРОБОВАТЬ БЕСПЛАТНО
                        </button>
                        <button
                          onClick={() => handlePurchaseWithoutRegistration(tariff.id, tariff.name, tariff.price)}
                          disabled={purchasing === tariff.id}
                          className="flex-1 flex items-center justify-center py-3 md:py-4 px-2 md:px-3 text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] transition-colors bg-transparent border border-green-500 text-green-500 hover:bg-green-500/10 hover:border-green-400 hover:text-green-400"
                        >
                          {purchasing === tariff.id ? (
                            <span className="inline-flex items-center gap-2">
                              <Loader2 className="w-4 h-4 animate-spin" />
                              ОЖИДАЙТЕ
                            </span>
                          ) : (
                            <>КУПИТЬ БЕЗ РЕГИСТРАЦИИ</>
                          )}
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handlePurchaseForUser(tariff.id, tariff.name, tariff.price)}
                        disabled={purchasing === tariff.id}
                        className="flex-1 flex items-center justify-center py-3 md:py-4 px-2 md:px-3 text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] transition-colors bg-primary text-primary-foreground hover:bg-primary/80"
                      >
                        {purchasing === tariff.id ? (
                          <span className="inline-flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            ОЖИДАЙТЕ
                          </span>
                        ) : (
                          <>КУПИТЬ VPN</>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
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
