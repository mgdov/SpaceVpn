"use client"

import Link from "next/link"

const plans = [
  {
    duration: "1 месяц",
    months: 1,
    price: 99,
    tagline: "Гибкая оплата",
    description: "Идеально для быстрого тест-драйва: подключитесь за минуту и ощутите стабильный тоннель связи без долгих обязательств.",
    popular: false,
  },
  {
    duration: "3 месяца",
    months: 3,
    price: 249,
    tagline: "Баланс выгоды",
    description: "Три месяца уверенного соединения, расширенный доступ к локациям и приоритет на новые маршруты сети Pixel Space.",
    popular: true,
  },
  {
    duration: "12 месяцев",
    months: 12,
    price: 679,
    tagline: "Год без забот",
    description: "Закрепите годовой тариф и пользуйтесь VPN с максимальной экономией, круглосуточной поддержкой и стабильной скоростью.",
    popular: false,
  },
]

const baseMonthlyPrice = plans[0].price / (plans[0].months || 1)

export function PricingSection() {
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
          {plans.map((plan) => {
            const fullPrice = baseMonthlyPrice * plan.months
            const discountPercent = plan.months > 1 ? Math.round(((fullPrice - plan.price) / fullPrice) * 100) : 0

            return (
              <div
                key={plan.duration}
                className={`relative bg-card border ${plan.popular ? "border-primary" : "border-border"
                  } p-8 flex flex-col gap-6`}
              >
                {plan.popular && (
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
                  <p className="text-accent text-[9px] tracking-[0.35em]">{plan.tagline}</p>
                  <h3 className="text-foreground text-base">{plan.duration}</h3>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-primary text-3xl">{plan.price}</span>
                      <span className="text-muted-foreground text-[12px]">₽</span>
                    </div>
                    <span className="text-muted-foreground text-[9px] uppercase tracking-[0.25em]">за весь период</span>
                  </div>
                </div>

                <p className="flex-1 text-muted-foreground text-[11px] leading-relaxed">{plan.description}</p>

                <Link
                  href="/register"
                  className={`text-center py-3 text-[11px] tracking-[0.15em] transition-colors ${plan.popular
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
