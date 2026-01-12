"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PixelStars } from "@/components/pixel-stars"
import Link from "next/link"
import { useState, useEffect } from "react"
import { getPublicTariffs, type Tariff } from "@/lib/api"

// Тестовые тарифы (на случай если API недоступен)
const testTariffs: Tariff[] = [
    {
        id: 1,
        name: "Тест IP / 1 день",
        description: "Тестовый период на 1 день",
        duration_months: 0,
        price: 1,
        data_limit_gb: 10,
        devices_count: 1,
        is_active: true,
    },
    {
        id: 2,
        name: "149₽ / 1 месяц",
        description: "1 месяц VPN доступа",
        duration_months: 1,
        price: 149,
        data_limit_gb: 100,
        devices_count: 3,
        is_active: true,
    },
    {
        id: 3,
        name: "299₽ / 3 месяца",
        description: "3 месяца VPN доступа",
        duration_months: 3,
        price: 299,
        data_limit_gb: 300,
        devices_count: 5,
        is_active: true,
    },
    {
        id: 4,
        name: "549₽ / 6 месяцев",
        description: "6 месяцев VPN доступа",
        duration_months: 6,
        price: 549,
        data_limit_gb: 600,
        devices_count: 5,
        is_active: true,
    },
    {
        id: 5,
        name: "999₽ / 1 год",
        description: "12 месяцев VPN доступа",
        duration_months: 12,
        price: 999,
        data_limit_gb: 1200,
        devices_count: 10,
        is_active: true,
    },
]

export default function NewKeyPage() {
    const [tariffs, setTariffs] = useState<Tariff[]>(testTariffs)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadTariffs = async () => {
            setLoading(true)
            const response = await getPublicTariffs()
            if (response.data?.length) {
                setTariffs(response.data.filter((tariff) => tariff.is_active))
            } else {
                setTariffs(testTariffs)
            }
            setLoading(false)
        }

        loadTariffs()
    }, [])

    const formatDuration = (months: number) => {
        if (months === 0) return "1 день"
        if (months === 1) return "1 месяц"
        if (months === 3) return "3 месяца"
        if (months === 6) return "6 месяцев"
        if (months === 12) return "12 месяцев"
        return `${months} мес.`
    }

    return (
        <div className="min-h-screen bg-background relative">
            <PixelStars />
            <Header />
            <main className="relative z-10 px-4 pt-32 pb-20">
                <div className="max-w-3xl mx-auto">
                    {/* Back Button */}
                    <Link
                        href="/buy-no-register"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-12 transition-colors"
                    >
                        ← Назад
                    </Link>

                    {/* Title */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
                            Купить новый ключ
                        </h1>
                        <p className="text-muted-foreground text-sm md:text-base">
                            Выберите тариф для покупки
                        </p>
                    </div>

                    {/* Tariff List */}
                    {loading ? (
                        <div className="bg-card border border-border p-6 text-center text-muted-foreground">
                            Загрузка тарифов...
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {tariffs.map((tariff) => (
                                <button
                                    key={tariff.id}
                                    onClick={() => {
                                        // TODO: Implement payment logic
                                        alert(`Выбран тариф: ${tariff.name} за ${tariff.price}₽`)
                                    }}
                                    className="w-full bg-card hover:bg-accent/5 border-2 border-border hover:border-primary p-6 transition-all text-left group"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                                                {tariff.name}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                {formatDuration(tariff.duration_months)}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-3xl font-bold text-primary">
                                                {tariff.price} <span className="text-xl text-muted-foreground">₽</span>
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    )
}
