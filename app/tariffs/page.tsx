"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getPublicTariffs, createYookassaPayment, type Tariff } from "@/lib/api"
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
  const [purchasing, setPurchasing] = useState<number | null>(null)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  useEffect(() => {
    loadTariffs()
  }, [])

  const loadTariffs = async () => {
    setLoading(true)
    const response = await getPublicTariffs()
    if (response.data?.length) {
      setTariffs(response.data.filter((tariff) => tariff.is_active))
    }
    setLoading(false)
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
          </div>

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
                className="relative bg-card border-2 border-green-500 hover:border-green-400 transition-all p-5 sm:p-6 flex flex-col min-h-[520px] sm:min-h-[540px]"
              >
                {/* Бейдж популярности для первого тарифа */}
                {idx === 0 && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-background text-[10px] sm:text-[11px] font-semibold px-4 py-1 tracking-wide uppercase">
                    ПОПУЛЯРНЫЙ
                  </div>
                )}

                {/* Название тарифа */}
                <div className="text-center mb-3">
                  <h3 className="text-accent text-[12px] sm:text-[13px] tracking-[0.3em] mb-2 uppercase">
                    # {tariff.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {tariff.description || ""}
                  </p>
                </div>

                {/* Длительность */}
                <div className="text-center mb-1">
                  <div className="text-2xl sm:text-3xl font-semibold text-foreground">
                    {formatDuration(tariff.duration_days)}
                  </div>
                </div>

                {/* Цена */}
                <div className="text-center mb-1">
                  <div className="flex items-baseline justify-center gap-1 text-4xl sm:text-5xl font-bold text-green-400">
                    <span>{tariff.price === 0 ? "0" : tariff.price}</span>
                    <span className="text-2xl sm:text-3xl">₽</span>
                  </div>
                </div>

                {/* За весь период */}
                <div className="text-center mb-5 sm:mb-6">
                  <div className="text-[11px] sm:text-xs text-muted-foreground tracking-[0.2em] uppercase">
                    за весь период
                  </div>
                </div>

                {/* Особенности */}
                {tariff.features && (
                  <div className="mb-6 grow px-1">
                    <ul className="space-y-2">
                      {(typeof tariff.features === 'string' ? tariff.features.split('\n') : tariff.features).map((feature: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm leading-relaxed text-foreground">
                          <span className="text-green-400">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Кнопки */}
                <div className="mt-auto space-y-2">
                  {!user ? (
                    <>
                      <Button
                        onClick={() => handlePurchaseWithoutRegistration(tariff.id, tariff.name, tariff.price)}
                        disabled={purchasing === tariff.id}
                        className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold text-sm sm:text-base py-3"
                      >
                        {purchasing === tariff.id ? <Loader2 className="w-4 h-4 animate-spin" /> : "ПОПРОБОВАТЬ"}
                      </Button>

                      <Button
                        onClick={() => handlePurchaseWithoutRegistration(tariff.id, tariff.name, tariff.price)}
                        disabled={purchasing === tariff.id}
                        variant="outline"
                        className="w-full border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-black font-semibold text-sm sm:text-base py-3"
                      >
                        КУПИТЬ БЕЗ РЕГИСТРАЦИИ
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => handlePurchaseForUser(tariff.id, tariff.name, tariff.price)}
                      disabled={purchasing === tariff.id}
                      className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold text-sm sm:text-base py-3"
                    >
                      {purchasing === tariff.id ? <Loader2 className="w-4 h-4 animate-spin" /> : "КУПИТЬ VPN"}
                    </Button>
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
