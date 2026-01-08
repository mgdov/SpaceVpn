"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getTariffs, type Tariff } from "@/lib/api-tariffs"

export function PricingSectionDynamic() {
  const [tariffs, setTariffs] = useState<Tariff[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const loadTariffs = async () => {
      const response = await getTariffs()
      if (response.data) {
        setTariffs(response.data)
      } else {
        setError(response.error || "Не удалось загрузить тарифы")
      }
      setLoading(false)
    }

    loadTariffs()
  }, [])

  if (loading) {
    return (
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground text-[11px]">Загрузка тарифов...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-red-500 text-[11px]">{error}</p>
        </div>
      </section>
    )
  }

  // Calculate base monthly price for discount calculation
  const baseTariff = tariffs.find(t => t.duration_months === 1)
  const baseMonthlyPrice = baseTariff ? baseTariff.price : (tariffs.find(t => t.duration_months > 0)?.price || 199)

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {tariffs.map((tariff) => {
            const months = tariff.duration_months === 0 ? 1 : tariff.duration_months
            const fullPrice = baseMonthlyPrice * months
            const discountPercent = months > 1 ? Math.round(((fullPrice - tariff.price) / fullPrice) * 100) : 0

            return (
              <div
                key={tariff.id}
                className={`relative bg-card border ${
                  tariff.is_featured ? "border-primary" : "border-border"
                } p-8 flex flex-col gap-6`}
              >
                {tariff.is_featured && (
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
                  <p className="text-accent text-[9px] tracking-[0.35em]">{tariff.tagline || ""}</p>
                  <h3 className="text-foreground text-base">{tariff.name}</h3>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-primary text-3xl">{tariff.price}</span>
                      <span className="text-muted-foreground text-[12px]">₽</span>
                    </div>
                    <span className="text-muted-foreground text-[9px] uppercase tracking-[0.25em]">за весь период</span>
                  </div>
                </div>

                <p className="flex-1 text-muted-foreground text-[11px] leading-relaxed">
                  {tariff.description || ""}
                </p>

                {tariff.features && (
                  <div className="space-y-2">
                    {tariff.features.split(",").map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[10px] text-muted-foreground">
                        <span className="text-primary">✓</span>
                        <span>{feature.trim()}</span>
                      </div>
                    ))}
                  </div>
                )}

                <Link
                  href="/register"
                  className={`text-center py-3 text-[11px] tracking-[0.15em] transition-colors ${
                    tariff.is_featured
                      ? "bg-primary text-primary-foreground hover:bg-primary/80"
                      : "border border-border text-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  ВЫБРАТЬ
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

