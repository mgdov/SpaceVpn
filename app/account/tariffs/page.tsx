import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PixelStars } from "@/components/pixel-stars"
import { pricingPlans } from "@/lib/pricing-data"
import { mockUser } from "@/lib/account-data"

export default function AccountTariffsPage() {
    return (
        <div className="min-h-screen bg-background relative">
            <PixelStars />
            <Header />

            <main className="pt-32 pb-20 px-4">
                <div className="max-w-5xl mx-auto space-y-10">
                    <header className="bg-card border border-border p-6 flex flex-col gap-2">
                        <p className="text-accent text-[9px] tracking-[0.35em]">[ ТАРИФЫ ]</p>
                        <h1 className="text-foreground text-2xl">Продлите действие ключа</h1>
                        <p className="text-muted-foreground text-[11px]">
                            Активный пользователь: {mockUser.name}. Текущий план — {mockUser.plan}, продление {mockUser.nextRenewal}.
                        </p>
                    </header>

                    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {pricingPlans.map((plan) => (
                            <div key={plan.duration} className="border border-border bg-card p-5 flex flex-col gap-4">
                                <div>
                                    <p className="text-accent text-[8px] tracking-[0.3em]">{plan.tagline}</p>
                                    <h3 className="text-foreground text-base mt-2">{plan.duration}</h3>
                                </div>
                                <p className="text-muted-foreground text-[10px] flex-1">{plan.description}</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-primary text-3xl">{plan.price}</span>
                                    <span className="text-muted-foreground text-[11px]">₽ / {plan.months === 1 ? "мес" : `${plan.months} мес`}</span>
                                </div>
                                <button className="w-full bg-primary text-primary-foreground py-2 text-[10px] hover:bg-primary/80">
                                    Купить тариф
                                </button>
                            </div>
                        ))}
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    )
}
