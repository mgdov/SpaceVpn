"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getPublicTariffs, createYookassaPayment, type Tariff } from "@/lib/api"
import { Button } from "@/components/ui/button"
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
                className="relative bg-card border border-[#2BD05E] p-6 sm:p-7 flex flex-col gap-5"
              >
                {idx === 0 && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#2BD05E] text-slate-900 text-[11px] sm:text-xs font-bold tracking-[0.08em] px-4 py-1 uppercase">
                    ПОПУЛЯРНЫЙ
                  </span>
                )}

                <div className="text-center space-y-3">
                  <p className="text-[#31D4C2] text-[11px] sm:text-xs tracking-[0.22em] uppercase">{tariff.name}</p>
                  <p className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
                    {formatDuration(tariff.duration_days)}
                  </p>
                  <div className="text-5xl sm:text-6xl font-black text-[#2BD05E] leading-none">
                    {tariff.price === 0 ? "0" : tariff.price}
                    <span className="text-3xl sm:text-4xl align-top">₽</span>
                  </div>
                  <div className="text-xs sm:text-sm tracking-[0.28em] text-muted-foreground uppercase">
                    за весь период
                  </div>
                </div>

                {tariff.features && (
                  <div className="space-y-2 text-left text-[15px] sm:text-base text-[#C5C5C5] leading-relaxed">
                    {(typeof tariff.features === "string" ? tariff.features.split("\n").filter(Boolean) : tariff.features).map((feature: string, idx: number) => (
                      <div key={idx} className="flex gap-2">
                        <span className="text-[#2BD05E]">•</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-auto space-y-3 pt-1">
                  {!user ? (
                    <>
                      <Button
                        onClick={() => (tariff.price === 0 ? router.push('/register') : handlePurchaseWithoutRegistration(tariff.id, tariff.name, tariff.price))}
                        disabled={purchasing === tariff.id}
                        className="w-full bg-[#2BD05E] hover:bg-[#24b851] text-slate-900 font-black tracking-[0.12em] uppercase border border-[#2BD05E]"
                        size="lg"
                      >
                        {purchasing === tariff.id ? <Loader2 className="w-4 h-4 animate-spin" /> : tariff.price === 0 ? 'ПОПРОБОВАТЬ' : 'ВЫБРАТЬ'}
                      </Button>

                      <Button
                        onClick={() => handlePurchaseWithoutRegistration(tariff.id, tariff.name, tariff.price)}
                        variant="outline"
                        disabled={purchasing === tariff.id}
                        className="w-full border-2 border-[#2BD05E] text-[#2BD05E] hover:bg-[#2BD05E] hover:text-slate-900 font-black tracking-[0.12em] uppercase"
                        size="lg"
                      >
                        {purchasing === tariff.id ? <Loader2 className="w-4 h-4 animate-spin" /> : 'КУПИТЬ БЕЗ РЕГИСТРАЦИИ'}
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => handlePurchaseForUser(tariff.id, tariff.name, tariff.price)}
                      disabled={purchasing === tariff.id}
                      className="w-full bg-[#2BD05E] hover:bg-[#24b851] text-slate-900 font-black tracking-[0.12em] uppercase border border-[#2BD05E]"
                      size="lg"
                    >
                      {purchasing === tariff.id ? <Loader2 className="w-4 h-4 animate-spin" /> : 'КУПИТЬ VPN'}
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
