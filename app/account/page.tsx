"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { PixelStars } from "@/components/pixel-stars"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useAuth, withAuth } from "@/lib/auth-context"
import { getUserSubscriptions, type Subscription } from "@/lib/api"

const sections = [
    {
        title: "VPN Ключ",
        description: "Получите VLESS / TLS Reality ссылку и подключитесь в один клик.",
        href: "/account/keys",
        accent: "# Ключи",
    },
    {
        title: "Тарифы",
        description: "Продлите срок действия ключа или переключитесь на выгодный план.",
        href: "/account/tariffs",
        accent: "# Тарифы",
    },
    {
        title: "Поддержка",
        description: "Получите мгновенную помощь через Telegram, email или телефон.",
        href: "/support",
        accent: "# Support",
    },
]

function AccountPageContent() {
    const { user } = useAuth()
    const [subscription, setSubscription] = useState<Subscription | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadSubscription = async () => {
            const response = await getUserSubscriptions()
            if (response.data && response.data.length > 0) {
                // Get the active subscription
                const activeSub = response.data.find(s => s.is_active) || response.data[0]
                setSubscription(activeSub)
            }
            setLoading(false)
        }

        loadSubscription()
    }, [])

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('ru-RU', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric' 
        })
    }

    const getPlanName = () => {
        if (!subscription) return "Бесплатный"
        if (subscription.data_limit_gb === 0) return "Ultimate"
        return `${subscription.data_limit_gb} GB`
    }

    return (
        <div className="min-h-screen bg-background relative">
            <PixelStars />
            <Header />

            <main className="pt-32 pb-20 px-4">
                <div className="max-w-4xl mx-auto space-y-10">
                    <section className="bg-card border border-border p-6">
                        <p className="text-accent text-[9px] tracking-[0.35em]">[ ЛИЧНЫЙ КАБИНЕТ ]</p>
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mt-4">
                            <div>
                                <h1 className="text-foreground text-2xl">
                                    Привет, {user?.full_name || user?.username}
                                </h1>
                                <p className="text-muted-foreground text-[11px] mt-2">
                                    {user?.email}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-muted-foreground text-[9px] uppercase tracking-[0.35em]">
                                    Текущий тариф
                                </p>
                                {loading ? (
                                    <p className="text-foreground text-lg mt-1">Загрузка...</p>
                                ) : (
                                    <>
                                        <p className="text-foreground text-lg mt-1">{getPlanName()}</p>
                                        {subscription && (
                                            <p className="text-muted-foreground text-[10px]">
                                                Продление: {formatDate(subscription.end_date)}
                                            </p>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {sections.map((section) => (
                            <Link
                                key={section.href}
                                href={section.href}
                                className="border border-border bg-card p-5 flex flex-col gap-3 hover:border-primary transition-colors"
                            >
                                <span className="text-accent text-[9px] tracking-[0.35em]">{section.accent}</span>
                                <h2 className="text-foreground text-lg">{section.title}</h2>
                                <p className="text-muted-foreground text-[11px] flex-1">{section.description}</p>
                                <span className="text-primary text-[10px] tracking-[0.25em]">ОТКРЫТЬ →</span>
                            </Link>
                        ))}
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default withAuth(AccountPageContent)
