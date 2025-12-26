"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PixelStars } from "@/components/pixel-stars"
import { useAuth } from "@/lib/auth-context"
import {
    getPublicTariffs,
    createSubscription,
    getUserSubscriptions,
    type Tariff,
    type Subscription,
} from "@/lib/api"
import { pricingPlans } from "@/lib/pricing-data"

const fallbackTariffs: Tariff[] = pricingPlans.map((plan, index) => ({
    id: `fallback-${index}`,
    name: plan.duration,
    description: plan.description,
    duration_days: plan.months * 30,
    price: plan.price,
    data_limit_gb: null,
    is_active: true,
    created_at: "",
    updated_at: "",
}))

export default function AccountTariffsPage() {
    const { user } = useAuth()
    const [tariffs, setTariffs] = useState<Tariff[]>([])
    const [loadingTariffs, setLoadingTariffs] = useState(true)
    const [subscription, setSubscription] = useState<Subscription | null>(null)
    const [loadingSubscription, setLoadingSubscription] = useState(true)
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
    const [purchaseMap, setPurchaseMap] = useState<Record<string, boolean>>({})

    const loadSubscription = useCallback(async () => {
        setLoadingSubscription(true)
        const response = await getUserSubscriptions()
        if (response.data) {
            const active = response.data.find((item) => item.is_active) || response.data[0] || null
            setSubscription(active)
        }
        setLoadingSubscription(false)
    }, [])

    useEffect(() => {
        const loadTariffs = async () => {
            setLoadingTariffs(true)
            const response = await getPublicTariffs()
            if (response.data?.length) {
                setTariffs(response.data.filter((tariff) => tariff.is_active))
            } else {
                setTariffs(fallbackTariffs)
            }
            setLoadingTariffs(false)
        }

        loadTariffs()
    }, [])

    useEffect(() => {
        loadSubscription()
    }, [loadSubscription])

    const handlePurchase = async (tariff: Tariff) => {
        setMessage(null)
        setPurchaseMap((prev) => ({ ...prev, [tariff.id]: true }))
        const response = await createSubscription({ tariff_id: tariff.id })
        if (response.data) {
            setMessage({ type: "success", text: `Тариф «${tariff.name}» успешно оформлен` })
            await loadSubscription()
        } else {
            setMessage({ type: "error", text: response.error || "Не удалось оформить подписку" })
        }
        setPurchaseMap((prev) => ({ ...prev, [tariff.id]: false }))
    }

    const formatDuration = (days: number) => {
        const months = days / 30
        if (Number.isInteger(months)) {
            return `${months} мес.`
        }
        return `${days} дн.`
    }

    const subscriptionInfo = useMemo(() => {
        if (loadingSubscription) {
            return "Загрузка статуса подписки..."
        }
        if (!subscription) {
            return "Активная подписка отсутствует."
        }
        return `Текущий план — ${subscription.plan_name || subscription.tariff_id || "—"}, продление ${formatDate(subscription.end_date)}`
    }, [loadingSubscription, subscription])

    const formatDate = (dateString?: string) => {
        if (!dateString) return "—"
        return new Date(dateString).toLocaleDateString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })
    }

    const visibleTariffs = tariffs.length ? tariffs : fallbackTariffs

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
                            Активный пользователь: {user?.full_name || user?.username || "—"}. {subscriptionInfo}
                        </p>
                        {message && (
                            <p className={`text-[11px] ${message.type === "success" ? "text-primary" : "text-red-400"}`}>
                                {message.text}
                            </p>
                        )}
                    </header>

                    {loadingTariffs ? (
                        <div className="bg-card border border-border p-6 text-muted-foreground text-[11px]">Загрузка тарифов...</div>
                    ) : (
                        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {visibleTariffs.map((tariff) => (
                                <div key={tariff.id} className="border border-border bg-card p-5 flex flex-col gap-4">
                                    <div>
                                        <p className="text-accent text-[8px] tracking-[0.3em]">{tariff.name}</p>
                                        <h3 className="text-foreground text-base mt-2">{formatDuration(tariff.duration_days)}</h3>
                                    </div>
                                    <p className="text-muted-foreground text-[10px] flex-1">{tariff.description || "Гибкий тариф Space VPN"}</p>
                                    {tariff.data_limit_gb !== null && (
                                        <p className="text-muted-foreground text-[9px]">Лимит: {tariff.data_limit_gb || "Безлимит"} GB</p>
                                    )}
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-primary text-3xl">{tariff.price}</span>
                                        <span className="text-muted-foreground text-[11px]">₽ за период</span>
                                    </div>
                                    <button
                                        onClick={() => handlePurchase(tariff)}
                                        disabled={purchaseMap[tariff.id]}
                                        className="w-full bg-primary text-primary-foreground py-2 text-[10px] hover:bg-primary/80 disabled:opacity-50"
                                    >
                                        {purchaseMap[tariff.id] ? "Оформление..." : "Купить тариф"}
                                    </button>
                                </div>
                            ))}
                        </section>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    )
}
