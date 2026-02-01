"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PixelStars } from "@/components/pixel-stars"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, LogIn, PlayCircle, RefreshCw, ShoppingCart } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useEffect, useState } from "react"
import { getPublicTariffs, type Tariff } from "@/lib/api"

export default function HomePage() {
  const { user } = useAuth()
  const [tariffs, setTariffs] = useState<Tariff[]>([])
  const [loadingTariffs, setLoadingTariffs] = useState(true)

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
                {tariffs.map((tariff, index) => {
                  const isPopular = index === 0
                  const isFree = tariff.price === 0
                  const description = tariff.description?.trim()
                    || (typeof tariff.features === "string" ? tariff.features.split("\n")[0] : tariff.features?.[0])
                    || ""

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

                      <Link
                        href="/tariffs"
                        className="w-full flex items-center justify-center py-3 md:py-4 px-2 md:px-3 text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] transition-colors bg-primary text-primary-foreground hover:bg-primary/80"
                      >
                        ВЫБРАТЬ ТАРИФ
                      </Link>
                    </div>
                  )
                })}
              </div>
            )}

          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
