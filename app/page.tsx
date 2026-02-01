"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, LogIn, PlayCircle, RefreshCw, ShoppingCart, Loader2 } from "lucide-react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PixelStars } from "@/components/pixel-stars"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { getPublicTariffs, createYookassaPayment, type Tariff } from "@/lib/api"

export default function HomePage() {
  const { user } = useAuth()
  const router = useRouter()

  const [tariffs, setTariffs] = useState<Tariff[]>([])
  const [loadingTariffs, setLoadingTariffs] = useState(true)
  const [purchasing, setPurchasing] = useState<number | null>(null)

  useEffect(() => {
    loadTariffs()
  }, [])

  const loadTariffs = async () => {
    setLoadingTariffs(true)
    const response = await getPublicTariffs()
    if (response.data?.length) {
      setTariffs(response.data.filter((tariff) => tariff.is_active).slice(0, 3))
    }
    setLoadingTariffs(false)
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

  const handlePurchaseWithoutRegistration = async (tariffId: number, tariffName: string, tariffPrice: number) => {
    setPurchasing(tariffId)

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
    } catch (error) {
      console.error(error)
    } finally {
      setPurchasing(null)
    }
  }

  const handlePurchaseForUser = async (tariffId: number, tariffName: string, tariffPrice: number) => {
    if (!user) {
      router.push("/register")
      return
    }

    setPurchasing(tariffId)

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
    } catch (error) {
      console.error(error)
    } finally {
      setPurchasing(null)
    }
  }

  return (
    <div className="min-h-screen bg-background relative">
      <PixelStars />
      <Header />

      <main>
        {/* Hero Section with Title and Action Buttons */}
        <section className="relative z-10 px-2 sm:px-6 md:px-8 pt-16 mt-[110px] sm:pt-28 md:pt-32 pb-8 sm:pb-16 md:pb-20">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-primary/10 border border-primary/30 text-xs sm:text-sm font-medium text-primary mb-6">
              Pixel Space VPN
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground mb-3 sm:mb-4 leading-tight">
              Надежный VPN для безопасного интернета
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              Подключайтесь к нашим серверам всего за пару кликов. Получите ключ, активируйте и пользуйтесь стабильным VPN без сложных настроек.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 sm:mt-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 max-w-4xl mx-auto">
              {!user ? (
                <>
                  {/* Получить ключ */}
                  <Link
                    href="/buy-no-register/new-key"
                    className="group bg-card hover:bg-accent/10 border-2 border-border hover:border-accent text-foreground p-2.5 sm:p-5 md:p-6 transition-all hover:shadow-lg flex items-center justify-center min-h-[85px] sm:min-h-[110px]"
                  >
                    <div className="flex items-center gap-1.5 sm:gap-4 md:gap-5">
                      <div className="flex-shrink-0">
                        <ArrowRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <div className="text-center">
                        <div className="text-[9px] sm:text-sm font-semibold tracking-wide">ПОЛУЧИТЬ НОВЫЙ VPN КЛЮЧ</div>
                      </div>
                    </div>
                  </Link>

                  {/* Войти в аккаунт */}
                  <Link
                    href="/login"
                    className="group bg-card hover:bg-accent/10 border-2 border-border hover:border-accent text-foreground p-2.5 sm:p-5 md:p-6 transition-all hover:shadow-lg flex items-center justify-center min-h-[85px] sm:min-h-[110px]"
                  >
                    <div className="flex items-center gap-1.5 sm:gap-4 md:gap-5">
                      <div className="flex-shrink-0">
                        <LogIn className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                      </div>
                      <div className="text-center">
                        <div className="text-[9px] sm:text-sm font-semibold tracking-wide">ВОЙТИ В АККАУНТ</div>
                      </div>
                    </div>
                  </Link>

                  {/* Смотреть видеоинструкцию */}
                  <Link
                    href="#"
                    className="group bg-card hover:bg-primary/10 border-2 border-border hover:border-primary text-foreground p-2.5 sm:p-5 md:p-6 transition-all hover:shadow-lg flex items-center justify-center min-h-[85px] sm:min-h-[110px]"
                  >
                    <div className="flex items-center gap-1.5 sm:gap-4 md:gap-5">
                      <div className="flex-shrink-0">
                        <PlayCircle className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                      </div>
                      <div className="text-center">
                        <div className="text-[8.5px] sm:text-sm font-semibold tracking-tight leading-tight">СМОТРЕТЬ<br className="sm:hidden" /> ВИДЕОИНСТРУКЦИЮ</div>
                      </div>
                    </div>
                  </Link>

                  {/* Продлить VPN ключ */}
                  <Link
                    href="/buy-no-register/extend-key"
                    className="group bg-card hover:bg-accent/10 border-2 border-border hover:border-accent text-foreground p-2.5 sm:p-5 md:p-6 transition-all hover:shadow-lg flex items-center justify-center min-h-[85px] sm:min-h-[110px]"
                  >
                    <div className="flex items-center gap-1.5 sm:gap-4 md:gap-5">
                      <div className="flex-shrink-0">
                        <RefreshCw className="w-3.5 h-3.5 sm:w-5 sm:h-5 group-hover:rotate-180 transition-transform duration-500" />
                      </div>
                      <div className="text-center">
                        <div className="text-[9px] sm:text-sm font-semibold tracking-tight">ПРОДЛИТЬ VPN КЛЮЧ</div>
                      </div>
                    </div>
                  </Link>

                  {/* Купить VPN без регистрации */}
                  <Link
                    href="/buy-no-register"
                    className="group bg-card hover:bg-green-500/10 border-2 border-green-500 hover:border-green-400 text-foreground p-2.5 sm:p-5 md:p-6 transition-all hover:shadow-lg hover:shadow-green-500/20 sm:col-span-2 lg:col-span-2 flex items-center justify-center min-h-[85px] sm:min-h-[110px]"
                  >
                    <div className="flex items-center gap-1.5 sm:gap-4 md:gap-5">
                      <div className="flex-shrink-0">
                        <ShoppingCart className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-green-500 group-hover:text-green-400" />
                      </div>
                      <div className="text-center">
                        <div className="text-[8.5px] sm:text-sm font-semibold tracking-tight text-green-500 group-hover:text-green-400 leading-tight">КУПИТЬ VPN БЕЗ РЕГИСТРАЦИИ</div>
                      </div>
                    </div>
                  </Link>
                </>
              ) : (
                <div className="col-span-full flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                  {/* Смотреть видеоинструкцию */}
                  <Link
                    href="#"
                    className="group bg-card hover:bg-primary/10 border-2 border-border hover:border-primary text-foreground p-4 sm:p-5 md:p-6 transition-all hover:shadow-lg flex items-center justify-center min-h-[100px] sm:min-h-[110px] flex-1"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
                      <div className="flex-shrink-0">
                        <PlayCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="text-center">
                        <div className="text-xs sm:text-sm font-semibold tracking-wide">СМОТРЕТЬ ВИДЕОИНСТРУКЦИЮ</div>
                      </div>
                    </div>
                  </Link>

                  {/* Продлить VPN ключ */}
                  <Link
                    href="/account/tariffs"
                    className="group bg-card hover:bg-accent/10 border-2 border-border hover:border-accent text-foreground p-4 sm:p-5 md:p-6 transition-all hover:shadow-lg flex items-center justify-center min-h-[100px] sm:min-h-[110px] flex-1"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
                      <div className="flex-shrink-0">
                        <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-180 transition-transform duration-500" />
                      </div>
                      <div className="text-center">
                        <div className="text-xs sm:text-sm font-semibold tracking-wide">ПРОДЛИТЬ VPN КЛЮЧ</div>
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Tariffs Section */}
        <section className="relative z-10 px-3 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto">
            {/* Заголовок секции */}
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-accent text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.25em] sm:tracking-[0.35em] mb-2 sm:mb-3">
                [ НАШИ ТАРИФЫ ]
              </h2>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
                ВЫБЕРИТЕ ПОДХОДЯЩИЙ ПЛАН
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm md:text-base max-w-2xl mx-auto">
                Гибкие тарифы для любых потребностей
              </p>
            </div>

            {/* Сетка тарифов */}
            {loadingTariffs ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
              </div>
            ) : (
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
                        {(typeof tariff.features === "string" ? tariff.features.split("\n").filter(Boolean) : tariff.features).map((feature: string, featureIdx: number) => (
                          <div key={featureIdx} className="flex gap-2">
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
                            onClick={() => (tariff.price === 0 ? router.push("/register") : handlePurchaseWithoutRegistration(tariff.id, tariff.name, tariff.price))}
                            disabled={purchasing === tariff.id}
                            className="w-full bg-[#2BD05E] hover:bg-[#24b851] text-slate-900 font-black tracking-[0.12em] uppercase border border-[#2BD05E]"
                            size="lg"
                          >
                            {purchasing === tariff.id ? <Loader2 className="w-4 h-4 animate-spin" /> : tariff.price === 0 ? "ПОПРОБОВАТЬ" : "ВЫБРАТЬ"}
                          </Button>

                          <Button
                            onClick={() => handlePurchaseWithoutRegistration(tariff.id, tariff.name, tariff.price)}
                            variant="outline"
                            disabled={purchasing === tariff.id}
                            className="w-full border-2 border-[#2BD05E] text-[#2BD05E] hover:bg-[#2BD05E] hover:text-slate-900 font-black tracking-[0.12em] uppercase"
                            size="lg"
                          >
                            {purchasing === tariff.id ? <Loader2 className="w-4 h-4 animate-spin" /> : "КУПИТЬ БЕЗ РЕГИСТРАЦИИ"}
                          </Button>
                        </>
                      ) : (
                        <Button
                          onClick={() => handlePurchaseForUser(tariff.id, tariff.name, tariff.price)}
                          disabled={purchasing === tariff.id}
                          className="w-full bg-[#2BD05E] hover:bg-[#24b851] text-slate-900 font-black tracking-[0.12em] uppercase border border-[#2BD05E]"
                          size="lg"
                        >
                          {purchasing === tariff.id ? <Loader2 className="w-4 h-4 animate-spin" /> : "КУПИТЬ VPN"}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tariffs.length === 0 && !loadingTariffs && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-sm sm:text-base">
                  На данный момент нет доступных тарифов
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
