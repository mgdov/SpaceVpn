"use client"

import { useState, useEffect } from "react"
import { Key, Download, Smartphone, Clock, Trash2, RefreshCw, ExternalLink, ChevronUp, ChevronDown } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PixelStars } from "@/components/pixel-stars"
import { useAuth, withAuth } from "@/lib/auth-context"
import {
    listUserVPNClients,
    getUserVPNClientConfig,
    type VPNClient,
    type VPNConfig,
} from "@/lib/api"

function AccountKeysPageContent() {
    const { user } = useAuth()
    const [clients, setClients] = useState<VPNClient[]>([])
    const [vpnConfigs, setVpnConfigs] = useState<Map<number, VPNConfig>>(new Map())
    const [loadingClients, setLoadingClients] = useState(true)
    const [installOpen, setInstallOpen] = useState<Record<number, boolean>>({})
    const [error, setError] = useState("")

    useEffect(() => {
        loadClientsAndConfigs()
    }, [])

    const loadClientsAndConfigs = async () => {
        setLoadingClients(true)
        setError("")

        const response = await listUserVPNClients()
        if (response.data) {
            setClients(response.data)

            // Загружаем конфиги для всех ключей
            const configs = new Map()
            for (const client of response.data) {
                const configResponse = await getUserVPNClientConfig(client.id.toString())
                if (configResponse.data) {
                    configs.set(client.id, configResponse.data)
                }
            }
            setVpnConfigs(configs)
        } else {
            setError(response.error || "Не удалось загрузить список VPN ключей")
        }

        setLoadingClients(false)
    }

    const platformLinks = [
        { id: 'ios', label: 'iOS', href: 'https://apps.apple.com/ru/app/happ-proxy-utility-plus/id6746188973' },
        { id: 'android', label: 'Android', href: 'https://play.google.com/store/apps/details?id=com.happproxy' },
        { id: 'macos', label: 'macOS', href: 'https://apps.apple.com/ru/mac/search?term=happ' },
        { id: 'windows', label: 'Windows', href: 'https://www.happ.su/main/ru' },
    ] as const

    const toggleInstall = (id: number) => {
        setInstallOpen((prev) => ({ ...prev, [id]: !prev[id] }))
    }

    const handleAddToApp = (subscriptionUrl: string) => {
        if (!subscriptionUrl) return
        const url = `/redirect?redirect_to=${encodeURIComponent(subscriptionUrl)}`
        window.location.href = url
    }

    const handleDeleteKey = (clientId: number) => {
        if (confirm('Вы уверены, что хотите удалить этот ключ?')) {
            // TODO: Реализовать удаление ключа
            console.log('Deleting key:', clientId)
        }
    }

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const getTimeRemaining = (expiresAt: string) => {
        const now = new Date().getTime()
        const expiry = new Date(expiresAt).getTime()
        const diff = expiry - now

        if (diff <= 0) return 'Истёк'

        const hours = Math.floor(diff / (1000 * 60 * 60))
        const days = Math.floor(hours / 24)

        if (days > 0) {
            return `${days} д.`
        }
        return `${hours} ч.`
    }

    const hasClients = clients.length > 0

    const isClientExpired = (c: any) => !!(c.expires_at && new Date(c.expires_at).getTime() < Date.now())
    const sortedClients = [...clients].sort((a, b) => Number(isClientExpired(a)) - Number(isClientExpired(b)))

    return (
        <div className="min-h-screen bg-background relative">
            <PixelStars />
            <Header />

            <main className="pt-24 pb-20 px-4">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Навигация назад вне рамки */}
                    <Link
                        href="/account"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Назад в личный кабинет
                    </Link>

                    {/* Заголовок */}
                    <div className="bg-card border border-border p-6">
                        <p className="text-accent text-[9px] tracking-[0.35em] mb-2">[ МОИ VPN КЛЮЧИ ]</p>
                        <h1 className="text-foreground text-3xl font-bold">
                            Подключение к VPN
                        </h1>
                    </div>

                    {/* Сообщения об ошибках */}
                    {error && (
                        <div className="bg-red-500/10 border-2 border-red-500 p-6">
                            <div className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-red-400 text-sm">{error}</p>
                            </div>
                        </div>
                    )}

                    {/* Состояние загрузки */}
                    {loadingClients && (
                        <div className="bg-card border border-border p-12 text-center">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
                            <p className="text-muted-foreground text-sm mt-4">Загрузка ваших ключей...</p>
                        </div>
                    )}

                    {/* Нет ключей */}
                    {!loadingClients && !hasClients && (
                        <div className="bg-gradient-to-br from-primary/10 to-accent/5 border-2 border-primary p-8 md:p-12 text-center space-y-6">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-4">
                                <Key className="w-10 h-10 text-primary" />
                            </div>
                            <div>
                                <h2 className="text-foreground text-2xl font-bold mb-3">
                                    У вас пока нет VPN ключа
                                </h2>
                                <p className="text-muted-foreground text-base max-w-md mx-auto">
                                    Купите тариф, чтобы получить доступ к защищенному VPN подключению
                                </p>
                            </div>
                            <Link
                                href="/account/tariffs"
                                className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 text-sm font-semibold hover:bg-primary/90 transition-colors"
                            >
                                <Key size={20} />
                                Купить доступ
                            </Link>
                        </div>
                    )}

                    {/* Список ключей в grid */}
                    {!loadingClients && hasClients && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {sortedClients.map((client) => {
                                const config = vpnConfigs.get(client.id)
                                const isExpired = isClientExpired(client)
                                const isExpiring = client.expires_at && !isExpired && new Date(client.expires_at).getTime() - Date.now() < 24 * 60 * 60 * 1000

                                return (
                                    <div key={client.id} className="bg-card border-2 border-border p-4 flex flex-col h-full">
                                        {/* Шапка ключа */}
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <div className="bg-primary/20 p-2 rounded">
                                                    <Key className="w-4 h-4 text-primary" />
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-foreground text-base font-bold">Ключ</span>
                                                    <span className="bg-accent/20 border border-accent text-accent px-2 py-0.5 text-xs font-mono font-semibold">
                                                        {client.name}
                                                    </span>
                                                </div>
                                            </div>
                                            {isExpired ? (
                                                <div className="bg-red-500/20 border-2 border-red-500 text-red-400 px-3 py-1 text-xs font-semibold">
                                                    Истек
                                                </div>
                                            ) : (
                                                <div className="bg-primary/20 border-2 border-primary text-primary px-3 py-1 text-xs font-semibold">
                                                    Активен
                                                </div>
                                            )}
                                        </div>

                                        {/* Предупреждение об истечении/истёк */}
                                        {client.expires_at && (
                                            <div className="bg-orange-500/10 border-2 border-orange-500 p-2 mb-3">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-1.5">
                                                        <Clock className="w-4 h-4 text-orange-400" />
                                                        <span className="text-orange-300 text-xs font-semibold">
                                                            Истекает: {formatDateTime(client.expires_at)}
                                                        </span>
                                                    </div>
                                                    <div className="bg-orange-500/20 border border-orange-500 text-orange-300 px-2 py-1 text-xs font-semibold">
                                                        {isExpired ? 'Истёк' : `Осталось ${getTimeRemaining(client.expires_at)}`}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Инструкция */}
                                        <div className="bg-purple-500/10 border-2 border-purple-500 p-3 space-y-2 mb-3 flex-1">
                                            <div className="flex items-center gap-2">
                                                <Smartphone className="w-4 h-4 text-purple-400" />
                                                <h3 className="text-purple-300 text-sm font-semibold">Инструкция:</h3>
                                            </div>
                                            <ol className="space-y-1.5 text-muted-foreground text-xs">
                                                <li className="flex gap-2">
                                                    <span className="text-purple-400 font-bold flex-shrink-0">1.</span>
                                                    <span>Установите приложение для VPN нажав на первую кнопку, а затем вернитесь снова на сайт</span>
                                                </li>
                                                <li className="flex gap-2">
                                                    <span className="text-purple-400 font-bold flex-shrink-0">2.</span>
                                                    <span>После установки приложения нажмите вторую кнопку «Добавить VPN в приложение»</span>
                                                </li>
                                            </ol>
                                        </div>

                                        {/* Кнопки действий */}
                                        {isExpired ? (
                                            <div className="mb-3">
                                                <button
                                                    onClick={() => (window.location.href = '/account/tariffs')}
                                                    className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white p-2.5 text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                                                >
                                                    <Clock className="w-4 h-4" />
                                                    <span>Продлить VPN</span>
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="space-y-2 mb-3">
                                                {/* Install app toggle */}
                                                <button
                                                    onClick={() => toggleInstall(client.id)}
                                                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground p-2.5 text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                                                >
                                                    <span className="text-base">1.</span>
                                                    <Download className="w-4 h-4" />
                                                    <span>Установить приложение для VPN</span>
                                                    {installOpen[client.id] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                                </button>

                                                {/* Collapsible platform links */}
                                                {installOpen[client.id] && (
                                                    <div className="border-2 border-emerald-500 bg-emerald-500/10 p-3 space-y-2">
                                                        <p className="text-[11px] text-emerald-400 mb-2">[ Выберите вашу платформу ]</p>
                                                        <ul className="divide-y divide-emerald-500/30">
                                                            {platformLinks.map((p) => (
                                                                <li key={p.id} className="flex items-center justify-between py-3">
                                                                    <div className="flex items-center gap-3">
                                                                        <span className="text-foreground text-sm">{p.label}</span>
                                                                        <span className="text-muted-foreground text-xs">Скачать приложение</span>
                                                                    </div>
                                                                    <a href={p.href} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary">
                                                                        <ExternalLink className="w-4 h-4" />
                                                                    </a>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {config && (
                                                    <button
                                                        onClick={() => handleAddToApp(config.subscription_url)}
                                                        className="w-full bg-purple-600 hover:bg-purple-700 text-white p-2.5 text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                                                    >
                                                        <span className="text-base">2.</span>
                                                        <Smartphone className="w-4 h-4" />
                                                        <span>Добавить VPN в приложение</span>
                                                    </button>
                                                )}

                                                {/* Extend even if not expired */}
                                                <button
                                                    onClick={() => (window.location.href = '/account/tariffs')}
                                                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white p-2.5 text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                                                >
                                                    <Clock className="w-4 h-4" />
                                                    <span>Продлить VPN</span>
                                                </button>
                                            </div>
                                        )}

                                        {/* Кнопка удаления */}
                                        <div className="flex justify-end pt-1 mt-auto">
                                            <button
                                                onClick={() => handleDeleteKey(client.id)}
                                                className="text-red-500 hover:text-red-400 text-xs font-semibold transition-colors flex items-center gap-1"
                                            >
                                                Удалить
                                                <Trash2 className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default withAuth(AccountKeysPageContent)
