"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PixelStars } from "@/components/pixel-stars"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, LogIn, PlayCircle, RefreshCw, ShoppingCart, Gift, Loader2 } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
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
      // Показываем только первые 3 тарифа на главной
      setTariffs(response.data.filter((t) => t.is_active).slice(0, 3))
    }
    setLoadingTariffs(false)
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
    } catch (e) {
      console.error('Payment error:', e)
    } finally {
      setPurchasing(null)
    }
  }

  const handlePurchaseForUser = async (tariffId: number, tariffName: string, tariffPrice: number) => {
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
    } catch (e) {
      console.error('Payment error:', e)
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

  return (
    <div className="min-h-screen bg-background relative">
      <PixelStars />
      <Header />
      <main>
        {/* Hero Section with Title and Action Buttons */}
        <section className="relative z-10 px-2 sm:px-6 md:px-8 pt-16 mt-[110px] sm:pt-28 md:pt-32 pb-8 sm:pb-16 md:pb-20">
          <div className="max-w-5xl mx-auto text-center">
            {/* Title */}
            <div>
              <h1 className="text-accent text-[8px] sm:text-[10px] md:text-[11px] tracking-[0.15em] sm:tracking-[0.35em] md:tracking-[0.4em] mb-2 sm:mb-4">
                [ ДОБРО ПОЖАЛОВАТЬ В ]
              </h1>
              <h2 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight mb-3 sm:mb-5 md:mb-6">
                SPACE VPN
              </h2>
              <p className="text-muted-foreground text-[10px] sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-16 md:mb-20 lg:mb-[100px] px-1">
                Космическая скорость соединения • Полная анонимность • Защита данных 24/7
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 max-w-4xl mx-auto">
              {!user ? (
                <>
                  {/* Попробовать бесплатно */}
                  <Link href="/register" className="group relative bg-primary hover:bg-primary/90 border-2 border-primary text-primary-foreground p-2.5 sm:p-5 md:p-6 transition-all hover:shadow-lg hover:shadow-primary/20 flex items-center justify-center min-h-[85px] sm:min-h-[110px]">
                    <div className="flex items-center gap-1.5 sm:gap-4 md:gap-5 w-full justify-center">
                      <div className="text-center flex-1">
                        <div className="text-[9px] sm:text-sm font-semibold mb-0.5 sm:mb-2 tracking-wide">ПОПРОБОВАТЬ БЕСПЛАТНО</div>
                        <div className="text-[8px] sm:text-[10px] text-primary-foreground/80 leading-relaxed">
                          При регистрации аккаунта<br />бесплатный 2-дневный VPN-ключ
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <ArrowRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>

                  {/* Войти в аккаунт */}
                  <Link href="/login" className="group bg-card hover:bg-accent/10 border-2 border-border hover:border-accent text-foreground p-2.5 sm:p-5 md:p-6 transition-all hover:shadow-lg flex items-center justify-center min-h-[85px] sm:min-h-[110px]">
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
                  <Link href="#" className="group bg-card hover:bg-primary/10 border-2 border-border hover:border-primary text-foreground p-2.5 sm:p-5 md:p-6 transition-all hover:shadow-lg flex items-center justify-center min-h-[85px] sm:min-h-[110px]">
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
                  <Link href="/buy-no-register/extend-key" className="group bg-card hover:bg-accent/10 border-2 border-border hover:border-accent text-foreground p-2.5 sm:p-5 md:p-6 transition-all hover:shadow-lg flex items-center justify-center min-h-[85px] sm:min-h-[110px]">
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
                  <Link href="/buy-no-register" className="group bg-card hover:bg-green-500/10 border-2 border-green-500 hover:border-green-400 text-foreground p-2.5 sm:p-5 md:p-6 transition-all hover:shadow-lg hover:shadow-green-500/20 sm:col-span-2 lg:col-span-2 flex items-center justify-center min-h-[85px] sm:min-h-[110px]">
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
                <div className="col-span-full flex justify-center gap-3 sm:gap-4">
                  {/* Смотреть видеоинструкцию */}
                  <Link href="#" className="group bg-card hover:bg-primary/10 border-2 border-border hover:border-primary text-foreground p-4 sm:p-5 md:p-6 transition-all hover:shadow-lg flex items-center justify-center min-h-[100px] sm:min-h-[110px] flex-1 max-w-md">
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
                  <Link href="/account/tariffs" className="group bg-card hover:bg-accent/10 border-2 border-border hover:border-accent text-foreground p-4 sm:p-5 md:p-6 transition-all hover:shadow-lg flex items-center justify-center min-h-[100px] sm:min-h-[110px] flex-1 max-w-md">
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
                {tariffs.map((tariff, index) => (
                  <div
                    key={tariff.id}
                    className="relative bg-card/80 border-2 border-green-500/70 hover:border-green-400 transition-all p-5 sm:p-6 flex flex-col gap-3"
                  >
                    {(tariff.is_featured || index === 0) && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-black text-[10px] font-bold px-3 py-1 uppercase tracking-[0.1em]">
                        популярный
                      </div>
                    )}

                    <div className="text-center space-y-2 mt-1">
                      <div className="text-green-400 text-[11px] sm:text-xs tracking-[0.25em] uppercase">
                        {tariff.tagline || `# ${tariff.name}`}
                      </div>
                      <div className="text-3xl sm:text-4xl font-black text-foreground">
                        {formatDuration(tariff.duration_days)}
                      </div>
                      <div className="flex items-baseline justify-center gap-1 text-green-500">
                        <span className="text-5xl sm:text-6xl font-black">{tariff.price === 0 ? "0" : tariff.price}</span>
                        <span className="text-2xl sm:text-3xl font-extrabold">₽</span>
                      </div>
                      <div className="text-[11px] sm:text-xs text-muted-foreground uppercase tracking-[0.2em]">
                        за весь период
                      </div>
                    </div>

                    {tariff.features && (
                      <div className="mb-2">
                        <ul className="space-y-2">
                          {(typeof tariff.features === 'string' ? tariff.features.split('\n').filter(f => f.trim()) : tariff.features).map((feature: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
                              <span className="mt-1 inline-block h-2 w-2 rounded-full bg-green-500"></span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="mt-auto space-y-2">
                      {!user ? (
                        <>
                          {/* Для незарегистрированных пользователей */}
                          <Button
                            onClick={() => handlePurchaseWithoutRegistration(tariff.id, tariff.name, tariff.price)}
                            disabled={purchasing === tariff.id}
                            className="w-full bg-green-500 text-black hover:bg-green-400 border-2 border-green-500 font-bold uppercase tracking-[0.05em] py-3 sm:py-3.5"
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
                            className="w-full border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-black font-bold uppercase tracking-[0.05em] py-3 sm:py-3.5 transition-colors"
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
                            className="w-full bg-green-500 text-black hover:bg-green-400 border-2 border-green-500 font-bold uppercase tracking-[0.05em] py-3 sm:py-3.5"
                            size="lg"
                          >
                            {purchasing === tariff.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
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
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
