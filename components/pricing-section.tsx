"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { getPublicTariffs, type Tariff } from "@/lib/api"

// Тестовые тарифы
const testTariffs: Tariff[] = [
  {
    id: 1,
    name: "ПРОБНЫЙ",
    description: "🚀 Идеально для знакомства с сервисом! Полный доступ ко всем функциям на 2 дня",
    duration_months: 0,
    price: 0,
    data_limit_gb: 10,
    devices_count: 1,
    is_active: true,
    is_featured: false,
  },
  {
    id: 2,
    name: "ЛУНА-1",
    description: "✨ Месяц космической свободы! Быстрая скорость, стабильное соединение и защита данных по цене чашки кофе в неделю",
    duration_months: 1,
    price: 100,
    data_limit_gb: 100,
    devices_count: 3,
    is_active: true,
    is_featured: true,
  },
  {
    id: 3,
    name: "КОСМОС-6",
    description: "🌟 Полгода без забот! Лучшее соотношение цены и качества для активных пользователей",
    duration_months: 6,
    price: 500,
    data_limit_gb: 1000,
    devices_count: 5,
    is_active: true,
    is_featured: false,
  },
]

export function PricingSection() {
  const [tariffs, setTariffs] = useState<Tariff[]>(testTariffs)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTariffs = async () => {
      setLoading(true)
      const response = await getPublicTariffs()
      if (response.data?.length) {
        setTariffs(response.data.filter((tariff) => tariff.is_active))
      } else {
        // Если тарифов с сервера нет, используем тестовые
        setTariffs(testTariffs)
      }
      setLoading(false)
    }

    loadTariffs()
  }, [])

  const displayTariffs = tariffs

  const baseMonthlyPrice = useMemo(() => {
    if (!displayTariffs.length) return 0
    const perMonthPrices = displayTariffs.map((tariff) => {
      const months = tariff.duration_months === 0 ? 1 : Math.max(1, tariff.duration_months)
      return tariff.price / months
    })
    return Math.min(...perMonthPrices)
  }, [displayTariffs])

  const highlightTariffId = useMemo(() => {
    if (!displayTariffs.length) return null
    return displayTariffs.reduce((best, current) => {
      const currentMonths = current.duration_months === 0 ? 1 : Math.max(1, current.duration_months)
      const bestMonths = best.duration_months === 0 ? 1 : Math.max(1, best.duration_months)
      const currentRatio = current.price / currentMonths
      const bestRatio = best.price / bestMonths
      return currentRatio < bestRatio ? current : best
    }).id
  }, [displayTariffs])

  const formatDuration = (months: number) => {
    if (months === 0) {
      return "1 день"
    }
    return `${months} мес.`
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <span className="text-accent text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.3em] sm:tracking-[0.35em] md:tracking-[0.4em]">[ ТАРИФЫ ]</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground font-bold tracking-tight mt-3 sm:mt-4 mb-3 sm:mb-4 px-4">
            ВЫБЕРИТЕ<br />СВОЙ <span className="text-primary">ПЛАН</span>
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed px-4">
            Гибкие тарифы для любых потребностей. Начните с бесплатного пробного периода.
          </p>
        </div>

        {loading ? (
          <div className="bg-card border border-border p-6 text-center text-muted-foreground text-[11px]">
            Загрузка тарифов...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            {displayTariffs.map((tariff) => {
              const months = Math.max(1, tariff.duration_months)
              const nominalPrice = baseMonthlyPrice * months
              const discountPercent = nominalPrice > tariff.price && months > 1
                ? Math.round(((nominalPrice - tariff.price) / nominalPrice) * 100)
                : 0

              return (
                <div
                  key={tariff.id}
                  className={`relative bg-card border ${tariff.id === highlightTariffId ? "border-primary" : "border-border"} p-5 sm:p-6 md:p-8 flex flex-col gap-6`}
                >
                  {tariff.id === highlightTariffId && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 text-[8px]">
                      ПОПУЛЯРНЫЙ
                    </div>
                  )}

                  {discountPercent > 0 && (
                    <div className="absolute top-3 right-3 bg-primary/15 border border-primary/40 text-primary px-3 py-1 text-[9px] tracking-[0.3em]">
                      -{discountPercent}%
                    </div>
                  )}

                  <div className="text-center space-y-4">
                    <p className="text-accent text-[9px] tracking-[0.35em]"># {tariff.name}</p>
                    <h3 className="text-foreground text-base">{formatDuration(tariff.duration_months)}</h3>
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-primary text-3xl">{tariff.price}</span>
                        <span className="text-muted-foreground text-[12px]">₽</span>
                      </div>
                      <span className="text-muted-foreground text-[9px] uppercase tracking-[0.25em]">за весь период</span>
                    </div>
                  </div>

                  <p className="flex-1 text-muted-foreground text-[11px] leading-relaxed">{tariff.description || "Стабильный туннель и поддержка 24/7"}</p>

                  <div className="flex flex-col xs:flex-row gap-2">
                    <Link
                      href={tariff.price === 0 ? "/register" : "/login"}
                      className={`flex-1 flex items-center justify-center py-3 md:py-4 px-2 md:px-3 text-[9px] md:text-[10px] tracking-[0.1em] md:tracking-[0.12em] transition-colors ${tariff.id === highlightTariffId
                        ? "bg-primary text-primary-foreground hover:bg-primary/80"
                        : "border border-border text-foreground hover:border-primary hover:text-primary"
                        }`}
                    >
                      {tariff.price === 0 ? "ПОПРОБОВАТЬ" : "ВЫБРАТЬ"}
                    </Link>
                    <Link
                      href="/buy-no-register"
                      className="flex-1 flex items-center justify-center py-3 md:py-4 px-2 md:px-3 text-[9px] md:text-[10px] tracking-[0.1em] md:tracking-[0.12em] transition-colors bg-transparent border border-green-500 text-green-500 hover:bg-green-500/10 hover:border-green-400 hover:text-green-400 text-center leading-tight"
                    >
                      КУПИТЬ БЕЗ РЕГИСТРАЦИИ
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
