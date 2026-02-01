"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PixelStars } from "@/components/pixel-stars"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, LogIn, PlayCircle, RefreshCw, ShoppingCart, CheckCircle2, Gift, Loader2 } from "lucide-react"
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
                {tariffs.map((tariff) => (
                  <div
                    key={tariff.id}
                    className="bg-card border-2 border-border hover:border-primary transition-all p-4 sm:p-6 flex flex-col"
                  >
                    {/* Название */}
                    <div className="mb-4">
                      <h4 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                        {tariff.name}
                      </h4>
                      {tariff.description && (
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {tariff.description}
                        </p>
                      )}
                    </div>

                    {/* Цена */}
                    <div className="mb-4 sm:mb-6">
                      <div className="text-2xl sm:text-3xl font-bold text-primary">
                        {tariff.price === 0 ? "БЕСПЛАТНО" : `${tariff.price} ₽`}
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                        {formatDuration(tariff.duration_days)}
                      </div>
                    </div>

                    {/* Особенности */}
                    {tariff.features && (
                      <div className="mb-6 grow">
                        <ul className="space-y-2">
                          {(typeof tariff.features === 'string' ? tariff.features.split('\n').filter(f => f.trim()) : tariff.features).slice(0, 3).map((feature: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm">
                              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500 shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Кнопка */}
                    <Link
                      href="/tariffs"
                      className="mt-auto w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 sm:py-3 text-xs sm:text-sm font-semibold transition-colors text-center"
                    >
                      ВЫБРАТЬ ТАРИФ
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {/* Кнопка "Все тарифы" */}
            {tariffs.length > 0 && (
              <div className="text-center mt-8 sm:mt-12">
                <Link
                  href="/tariffs"
                  className="inline-flex items-center gap-2 bg-card hover:bg-accent/10 border-2 border-border hover:border-primary text-foreground px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-semibold transition-all"
                >
                  ПОСМОТРЕТЬ ВСЕ ТАРИФЫ
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
