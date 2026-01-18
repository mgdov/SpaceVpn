"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { PixelStars } from "@/components/pixel-stars"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useAuth, withAuth } from "@/lib/auth-context"
import { listUserVPNClients } from "@/lib/api"
import {
    Key,
    CreditCard,
    PlayCircle,
    RefreshCw,
    HelpCircle
} from "lucide-react"

function AccountPageContent() {
    const { user } = useAuth()
    const [keysCount, setKeysCount] = useState<number>(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadKeys = async () => {
            setLoading(true)

            // Проверяем, используется ли тестовый пользователь
            const token = localStorage.getItem('auth_token')
            if (token === 'test_token_12345') {
                setKeysCount(1)
                setLoading(false)
                return
            }

            const response = await listUserVPNClients()
            if (response.data) {
                setKeysCount(response.data.length)
            }
            setLoading(false)
        }

        loadKeys()
    }, [])

    return (
        <div className="min-h-screen bg-background relative">
            <PixelStars />
            <Header />

            <main className="pt-24 pb-20 px-4">
                <div className="max-w-6xl mx-auto space-y-6">
                    {/* Приветствие */}
                    <div className="bg-card border border-border p-6">
                        <p className="text-accent text-[9px] tracking-[0.35em] mb-2">[ ЛИЧНЫЙ КАБИНЕТ ]</p>
                        <h1 className="text-foreground text-3xl font-bold">
                            Привет, {user?.full_name || user?.username}!
                        </h1>
                        <p className="text-muted-foreground text-sm mt-2">
                            {user?.email}
                        </p>
                    </div>

                    {/* Количество ключей */}
                    <div className="bg-card border-2 border-primary p-8">
                        <p className="text-accent text-[9px] tracking-[0.35em] mb-4">[ ВАШИ КЛЮЧИ ]</p>
                        {loading ? (
                            <p className="text-muted-foreground">Загрузка...</p>
                        ) : (
                            <div className="flex items-center gap-4">
                                <div className="bg-primary/20 p-4 rounded">
                                    <Key className="w-8 h-8 text-primary" />
                                </div>
                                <div>
                                    <p className="text-5xl font-bold text-primary">{keysCount}</p>
                                    <p className="text-muted-foreground text-sm mt-1">
                                        {keysCount === 0 ? 'У вас пока нет ключей' :
                                            keysCount === 1 ? 'Активный VPN ключ' :
                                                `Активных VPN ключ${keysCount < 5 ? 'а' : 'ей'}`}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Быстрые действия */}
                    <div>
                        <p className="text-accent text-[9px] tracking-[0.35em] mb-4">[ БЫСТРЫЕ ДЕЙСТВИЯ ]</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Инструкция по подключению */}
                            <Link
                                href="#"
                                className="group bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary hover:border-primary hover:from-primary/30 hover:to-primary/10 p-6 transition-all hover:shadow-lg hover:shadow-primary/20"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/20 p-3 rounded">
                                        <PlayCircle className="w-6 h-6 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-foreground text-lg font-semibold mb-1">
                                            Смотреть инструкцию
                                        </h3>
                                        <p className="text-muted-foreground text-sm">
                                            Видеоинструкция по подключению и настройке VPN
                                        </p>
                                    </div>
                                </div>
                            </Link>

                            {/* Продлить подписку */}
                            <Link
                                href="/account/tariffs"
                                className="group bg-gradient-to-br from-green-500/20 to-green-500/5 border-2 border-green-500 hover:border-green-400 hover:from-green-500/30 hover:to-green-500/10 p-6 transition-all hover:shadow-lg hover:shadow-green-500/20"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="bg-green-500/20 p-3 rounded">
                                        <RefreshCw className="w-6 h-6 text-green-500 group-hover:rotate-180 transition-transform duration-500" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-foreground text-lg font-semibold mb-1">
                                            Продлить подписку
                                        </h3>
                                        <p className="text-muted-foreground text-sm">
                                            Выберите тариф и продлите доступ к VPN
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Основные разделы */}
                    <div>
                        <p className="text-accent text-[9px] tracking-[0.35em] mb-4">[ МОИ ДАННЫЕ ]</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* VPN Ключи */}
                            <Link
                                href="/account/keys"
                                className="group border-2 border-border hover:border-primary bg-card p-6 transition-all hover:shadow-lg"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="bg-primary/10 p-2 rounded">
                                        <Key className="w-5 h-5 text-primary" />
                                    </div>
                                    <span className="text-accent text-[9px] tracking-[0.35em]">КЛЮЧИ</span>
                                </div>
                                <h2 className="text-foreground text-lg font-semibold mb-2">VPN Ключи</h2>
                                <p className="text-muted-foreground text-sm mb-4">
                                    Ваши VLESS ссылки для подключения
                                </p>
                                <span className="text-primary text-xs tracking-[0.25em] group-hover:translate-x-1 inline-block transition-transform">
                                    ОТКРЫТЬ →
                                </span>
                            </Link>

                            {/* Тарифы */}
                            <Link
                                href="/account/tariffs"
                                className="group border-2 border-border hover:border-accent bg-card p-6 transition-all hover:shadow-lg"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="bg-accent/10 p-2 rounded">
                                        <CreditCard className="w-5 h-5 text-accent" />
                                    </div>
                                    <span className="text-accent text-[9px] tracking-[0.35em]">ТАРИФЫ</span>
                                </div>
                                <h2 className="text-foreground text-lg font-semibold mb-2">Мои тарифы</h2>
                                <p className="text-muted-foreground text-sm mb-4">
                                    Управление подписками и оплата
                                </p>
                                <span className="text-accent text-xs tracking-[0.25em] group-hover:translate-x-1 inline-block transition-transform">
                                    ОТКРЫТЬ →
                                </span>
                            </Link>

                            {/* Поддержка */}
                            <Link
                                href="/support"
                                className="group border-2 border-border hover:border-green-500 bg-card p-6 transition-all hover:shadow-lg"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="bg-green-500/10 p-2 rounded">
                                        <HelpCircle className="w-5 h-5 text-green-500" />
                                    </div>
                                    <span className="text-accent text-[9px] tracking-[0.35em]">SUPPORT</span>
                                </div>
                                <h2 className="text-foreground text-lg font-semibold mb-2">Поддержка</h2>
                                <p className="text-muted-foreground text-sm mb-4">
                                    Помощь через Telegram, email или телефон
                                </p>
                                <span className="text-green-500 text-xs tracking-[0.25em] group-hover:translate-x-1 inline-block transition-transform">
                                    ОТКРЫТЬ →
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default withAuth(AccountPageContent)

