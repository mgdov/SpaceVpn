"use client"

import { Suspense, useCallback, useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PixelStars } from "@/components/pixel-stars"
import { useAuth } from "@/lib/auth-context"
import {
    getPublicTariffs,
    getUserSubscriptions,
    createYookassaPayment,
    confirmYookassaPayment,
    type Tariff,
    type Subscription,
} from "@/lib/api"

function PaymentHandler({ 
    onPaymentConfirmed 
}: { 
    onPaymentConfirmed: () => void 
}) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [confirmingPaymentId, setConfirmingPaymentId] = useState<string | null>(null)
    const searchParamsString = searchParams?.toString() || ""

    useEffect(() => {
        const params = new URLSearchParams(searchParamsString)
        const paymentId = params.get("payment_id")
        if (!paymentId || confirmingPaymentId === paymentId) {
            return
        }

        setConfirmingPaymentId(paymentId)

        const confirmPayment = async () => {
            const response = await confirmYookassaPayment(paymentId)
            if (response.data?.success) {
                onPaymentConfirmed()
            }
            router.replace("/account/tariffs")
        }

        confirmPayment()
    }, [confirmingPaymentId, onPaymentConfirmed, router, searchParamsString])

    return null
}

function AccountTariffsContent() {
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
            }
            setLoadingTariffs(false)
        }

        loadTariffs()
    }, [])

    useEffect(() => {
        loadSubscription()
    }, [loadSubscription])

    const handlePaymentConfirmed = useCallback(async () => {
        setMessage({ type: "success", text: "Платёж подтверждён" })
                await loadSubscription()
    }, [loadSubscription])

    const handlePurchase = async (tariff: Tariff) => {
        setMessage(null)
        setPurchaseMap((prev) => ({ ...prev, [tariff.id]: true }))
        const normalizedName = tariff.name.toLowerCase()
        const plan = normalizedName.includes('basic')
            ? 'basic'
            : normalizedName.includes('premium')
                ? 'premium'
                : normalizedName.includes('unlimited')
                    ? 'unlimited'
                    : 'free'

        const response = await createYookassaPayment({
            tariffId: tariff.id,
            plan,
            price: tariff.price,
            description: `Оплата тарифа ${tariff.name}`,
        })

        if (response.data?.confirmation_url) {
            window.location.href = response.data.confirmation_url
            return
        }

        setMessage({ type: "error", text: response.error || "Не удалось инициировать платёж" })
        setPurchaseMap((prev) => ({ ...prev, [tariff.id]: false }))
    }

    const formatDuration = (months: number) => {
        if (months === 0) {
            return "1 день"
        }
        return `${months} мес.`
    }

    const subscriptionInfo = useMemo(() => {
        if (loadingSubscription) {
            return "Загрузка статуса подписки..."
        }
        if (!subscription) {
            return "Активная подписка отсутствует."
        }
        const expireDate = subscription.expire_date ? formatDate(subscription.expire_date) : "—"
        return `Текущий план — ${subscription.plan}, продление ${expireDate}`
    }, [loadingSubscription, subscription])

    const formatDate = (dateString?: string) => {
        if (!dateString) return "—"
        return new Date(dateString).toLocaleDateString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })
    }

    const visibleTariffs = tariffs

    return (
        <>
            <Suspense fallback={null}>
                <PaymentHandler onPaymentConfirmed={handlePaymentConfirmed} />
            </Suspense>
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
                                        <h3 className="text-foreground text-base mt-2">{formatDuration(tariff.duration_months)}</h3>
                                    </div>
                                    <p className="text-muted-foreground text-[10px] flex-1">{tariff.description || "Гибкий тариф Space VPN"}</p>
                                    <p className="text-muted-foreground text-[9px]">
                                        Лимит: {tariff.data_limit_gb === 0 ? "Безлимит" : `${tariff.data_limit_gb} GB`}
                                    </p>
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
        </>
    )
}

export default function AccountTariffsPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-background relative">
                <PixelStars />
                <Header />
                <main className="pt-32 pb-20 px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="bg-card border border-border p-6 text-muted-foreground text-[11px]">
                            Загрузка...
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        }>
            <AccountTariffsContent />
        </Suspense>
    )
}
