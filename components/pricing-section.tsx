"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { getPublicTariffs, type Tariff } from "@/lib/api"

export function PricingSection() {
  const [tariffs, setTariffs] = useState<Tariff[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTariffs = async () => {
      setLoading(true)
      const response = await getPublicTariffs()
      if (response.data?.length) {
        setTariffs(response.data.filter((tariff) => tariff.is_active))
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
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-accent text-[10px] tracking-widest">[ ТАРИФЫ ]</span>
          <h2 className="text-xl md:text-2xl text-foreground mt-4 mb-4">
            ВЫБЕРИТЕ СВОЙ <span className="text-primary">ПЛАН</span>
          </h2>
          <p className="text-muted-foreground text-[10px] max-w-xl mx-auto">
            Гибкие тарифы для любых потребностей. Начните с бесплатного пробного периода.
          </p>
        </div>

        {loading ? (
          <div className="bg-card border border-border p-6 text-center text-muted-foreground text-[11px]">
            Загрузка тарифов...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {displayTariffs.map((tariff) => {
              const months = Math.max(1, tariff.duration_months)
              const nominalPrice = baseMonthlyPrice * months
              const discountPercent = nominalPrice > tariff.price && months > 1
                ? Math.round(((nominalPrice - tariff.price) / nominalPrice) * 100)
                : 0

              return (
                <div
                  key={tariff.id}
                  className={`relative bg-card border ${tariff.id === highlightTariffId ? "border-primary" : "border-border"} p-8 flex flex-col gap-6`}
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

                  <Link
                    href={tariff.price === 0 ? "/register" : "/login"}
                    className={`text-center py-3 text-[11px] tracking-[0.15em] transition-colors ${tariff.id === highlightTariffId
                      ? "bg-primary text-primary-foreground hover:bg-primary/80"
                      : "border border-border text-foreground hover:border-primary hover:text-primary"
                      }`}
                  >
                    {tariff.price === 0 ? "ПОПРОБОВАТЬ" : "ВЫБРАТЬ"}
                  </Link>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
