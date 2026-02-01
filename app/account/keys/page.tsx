"use client"

import { useState, useEffect } from "react"
import { Key, Download, Smartphone, Clock, Trash2, RefreshCw, ExternalLink, ChevronUp, ChevronDown } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PixelStars } from "@/components/pixel-stars"
import { useAuth, withAuth } from "@/lib/auth-context"
import {
    getUserVPNKeys,
    getUserVPNClientConfig,
    getHappDeeplink,
    type VPNKeyStatus,
    type VPNConfig,
} from "@/lib/api"

function AccountKeysPageContent() {
    const { user } = useAuth()
    const [keys, setKeys] = useState<VPNKeyStatus[]>([])
    const [vpnConfigs, setVpnConfigs] = useState<Map<number, VPNConfig>>(new Map())
    const [loadingKeys, setLoadingKeys] = useState(true)
    const [installOpen, setInstallOpen] = useState<Record<number, boolean>>({})
    const [error, setError] = useState("")

    useEffect(() => {
        loadKeysAndConfigs()
    }, [])

    const loadKeysAndConfigs = async () => {
        setLoadingKeys(true)
        setError("")

        const response = await getUserVPNKeys()
        if (response.data?.keys) {
            setKeys(response.data.keys)

            // Загружаем конфиги для всех ключей
            const configs = new Map()
            for (const key of response.data.keys) {
                const configResponse = await getUserVPNClientConfig(key.id.toString())
                if (configResponse.data) {
                    configs.set(key.id, configResponse.data)
                }
            }
            setVpnConfigs(configs)
        } else {
            setError(response.error || "Не удалось загрузить список VPN ключей")
        }

        setLoadingKeys(false)
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

    const subscriptionUrlFor = (key: VPNKeyStatus) =>
        (vpnConfigs.get(key.id)?.subscription_url || key.subscription_url) ?? ""

    const handleAddToApp = async (key: VPNKeyStatus, subscriptionUrl: string) => {
        if (!subscriptionUrl) return
        let happDeepLink: string
        try {
            const res = await getHappDeeplink(key.id)
            if (res?.data?.happ_link) {
                happDeepLink = res.data.happ_link
            } else {
                happDeepLink = `happ://add/${encodeURIComponent(subscriptionUrl)}`
            }
        } catch {
            happDeepLink = `happ://add/${encodeURIComponent(subscriptionUrl)}`
        }
        const redirectUrl = `/redirect?redirect_to=${encodeURIComponent(happDeepLink)}`
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
        if (isMobile) {
            window.location.href = redirectUrl
        } else {
            window.open(redirectUrl, '_blank')
        }
    }

    const handleDeleteKey = (keyId: number) => {
        if (confirm('Вы уверены, что хотите удалить этот ключ?')) {
            // TODO: Реализовать удаление ключа
            console.log('Deleting key:', keyId)
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

    const getTimeRemainingText = (key: VPNKeyStatus) => {
        if (key.time_remaining_days === null || key.time_remaining_hours === null) {
            return 'Неизвестно'
        }

        const days = key.time_remaining_days
        const hours = key.time_remaining_hours

        if (days < 0) {
            const daysAgo = Math.abs(days)
            if (key.within_grace_period) {
                return `Истекло ${daysAgo} д. назад (можно продлить)`
            }
            return 'Истёк'
        }

        if (days > 0) {
            const hoursPart = hours % 24
            if (hoursPart > 0) {
                return `${days} д. ${hoursPart} ч.`
            }
            return `${days} д.`
        }

        return `${hours} ч.`
    }

    const hasKeys = keys.length > 0

    const isKeyExpired = (key: VPNKeyStatus) => {
        return key.time_remaining_days !== null && key.time_remaining_days < 0
    }

    const sortedKeys = [...keys].sort((a, b) => Number(isKeyExpired(a)) - Number(isKeyExpired(b)))

    return (
        <div className="min-h-screen bg-background relative">
            <PixelStars />
            <Header />

            <main className="pt-20 sm:pt-24 pb-12 sm:pb-20 px-2 sm:px-4">
                <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
                    {/* Навигация назад вне рамки */}
                    <Link
                        href="/account"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm"
                    >
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Назад в личный кабинет
                    </Link>

                    {/* Заголовок */}
                    <div className="bg-card border border-border p-4 sm:p-6">
                        <p className="text-accent text-[9px] tracking-[0.25em] sm:tracking-[0.35em] mb-2">[ МОИ VPN КЛЮЧИ ]</p>
                        <h1 className="text-foreground text-2xl sm:text-3xl font-bold">
                            Подключение к VPN
                        </h1>
                    </div>

                    {/* Сообщения об ошибках */}
                    {error && (
                        <div className="bg-red-500/10 border-2 border-red-500 p-4 sm:p-6">
                            <div className="flex items-start gap-2 sm:gap-3">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-red-400 text-xs sm:text-sm">{error}</p>
                            </div>
                        </div>
                    )}

                    {/* Состояние загрузки */}
                    {loadingKeys && (
                        <div className="bg-card border border-border p-8 sm:p-12 text-center">
                            <div className="inline-block animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-4 border-primary border-t-transparent"></div>
                            <p className="text-muted-foreground text-xs sm:text-sm mt-4">Загрузка ваших ключей...</p>
                        </div>
                    )}

                    {/* Нет ключей */}
                    {!loadingKeys && !hasKeys && (
                        <div className="bg-gradient-to-br from-primary/10 to-accent/5 border-2 border-primary p-6 sm:p-8 md:p-12 text-center space-y-4 sm:space-y-6">
                            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/20 mb-2 sm:mb-4">
                                <Key className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                            </div>
                            <div>
                                <h2 className="text-foreground text-xl sm:text-2xl font-bold mb-2 sm:mb-3">
                                    У вас пока нет VPN ключа
                                </h2>
                                <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
                                    Купите тариф, чтобы получить доступ к защищенному VPN подключению
                                </p>
                            </div>
                            <Link
                                href="/account/tariffs"
                                className="inline-flex items-center gap-2 sm:gap-3 bg-primary text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-semibold hover:bg-primary/90 transition-colors"
                            >
                                <Key size={18} className="sm:w-5 sm:h-5" />
                                Купить доступ
                            </Link>
                        </div>
                    )}

                    {/* Список ключей в grid - ключи занимают половину экрана */}
                    {!loadingKeys && hasKeys && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                            {sortedKeys.map((key) => {
                                const config = vpnConfigs.get(key.id)
                                const isExpired = isKeyExpired(key)

                                return (
                                    <div key={key.id} className="bg-card border-2 border-border p-3 sm:p-4 flex flex-col h-full">
                                        {/* Шапка ключа */}
                                        <div className="flex items-center justify-between mb-2 sm:mb-3">
                                            <div className="flex items-center gap-1.5 sm:gap-2">
                                                <div className="bg-primary/20 p-1.5 sm:p-2 rounded">
                                                    <Key className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                                                </div>
                                                <div className="flex items-center gap-1.5 sm:gap-2">
                                                    <span className="text-foreground text-sm sm:text-base font-bold">Ключ</span>
                                                    <span className="bg-accent/20 border border-accent text-accent px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-mono font-semibold">
                                                        {key.name || key.key_id}
                                                    </span>
                                                </div>
                                            </div>
                                            {isExpired ? (
                                                key.within_grace_period ? (
                                                    <div className="bg-amber-500/20 border-2 border-amber-500 text-amber-400 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold">
                                                        Можно продлить
                                                    </div>
                                                ) : (
                                                    <div className="bg-red-500/20 border-2 border-red-500 text-red-400 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold">
                                                        Истек
                                                    </div>
                                                )
                                            ) : (
                                                <div className="bg-primary/20 border-2 border-primary text-primary px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold">
                                                    Активен
                                                </div>
                                            )}
                                        </div>

                                        {/* Время до истечения */}
                                        {(key.expires_at || key.expire_date) && (
                                            <div className={`${isExpired ? 'bg-red-500/10 border-red-500' : 'bg-orange-500/10 border-orange-500'} border-2 p-2 sm:p-2.5 mb-2 sm:mb-3`}>
                                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                                                    <div className="flex items-center gap-1.5">
                                                        <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400" />
                                                        <span className="text-orange-300 text-[10px] sm:text-xs font-semibold">
                                                            {isExpired ? 'Истёк' : 'Истекает'}: {formatDateTime(key.expires_at || key.expire_date || '')}
                                                        </span>
                                                    </div>
                                                    <div className={`${isExpired ? 'bg-red-500/20 border-red-500 text-red-300' : 'bg-orange-500/20 border-orange-500 text-orange-300'} border px-2 py-0.5 text-[10px] sm:text-xs font-semibold self-start sm:self-auto`}>
                                                        {isExpired ? 'Истёк' : `Осталось ${getTimeRemainingText(key)}`}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Инструкция */}
                                        <div className="bg-purple-500/10 border-2 border-purple-500 p-2 sm:p-3 space-y-1.5 sm:space-y-2 mb-2 sm:mb-3 flex-1">
                                            <div className="flex items-center gap-1.5 sm:gap-2">
                                                <Smartphone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
                                                <h3 className="text-purple-300 text-xs sm:text-sm font-semibold">Инструкция:</h3>
                                            </div>
                                            <ol className="space-y-1 sm:space-y-1.5 text-muted-foreground text-[10px] sm:text-xs">
                                                <li className="flex gap-1.5 sm:gap-2">
                                                    <span className="text-purple-400 font-bold flex-shrink-0">1.</span>
                                                    <span>Установите приложение для VPN нажав на первую кнопку, а затем вернитесь снова на сайт</span>
                                                </li>
                                                <li className="flex gap-1.5 sm:gap-2">
                                                    <span className="text-purple-400 font-bold flex-shrink-0">2.</span>
                                                    <span>После установки приложения нажмите вторую кнопку «Добавить VPN в приложение»</span>
                                                </li>
                                            </ol>
                                        </div>

                                        {/* Кнопки действий */}
                                        {isExpired ? (
                                            <div className="mb-2 sm:mb-3">
                                                <button
                                                    onClick={() => (window.location.href = '/account/tariffs')}
                                                    className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white p-2 sm:p-2.5 text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 sm:gap-2"
                                                >
                                                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                    <span>Продлить VPN</span>
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="space-y-1.5 sm:space-y-2 mb-2 sm:mb-3">
                                                {/* Install app toggle - dropdown открывается вверх */}
                                                <div className="relative">
                                                    <button
                                                        onClick={() => toggleInstall(key.id)}
                                                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground p-2 sm:p-2.5 text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 sm:gap-2"
                                                    >
                                                        <span className="text-sm sm:text-base">1.</span>
                                                        <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                        <span>Установить приложение для VPN</span>
                                                        {installOpen[key.id] ? <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <ChevronUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                                                    </button>

                                                    {/* Collapsible platform links - открывается вверх */}
                                                    {installOpen[key.id] && (
                                                        <div className="absolute bottom-full left-0 right-0 mb-1 sm:mb-2 border-2 border-emerald-500 bg-card/95 backdrop-blur-sm p-2 sm:p-3 space-y-1.5 sm:space-y-2 z-10 shadow-lg">
                                                            <p className="text-[10px] sm:text-[11px] text-emerald-400 mb-1 sm:mb-2">[ Выберите вашу платформу ]</p>
                                                            <ul className="divide-y divide-emerald-500/30">
                                                                {platformLinks.map((p) => (
                                                                    <li key={p.id} className="flex items-center justify-between py-2 sm:py-3">
                                                                        <div className="flex items-center gap-2 sm:gap-3">
                                                                            <span className="text-foreground text-xs sm:text-sm">{p.label}</span>
                                                                            <span className="text-muted-foreground text-[10px] sm:text-xs">Скачать приложение</span>
                                                                        </div>
                                                                        <a href={p.href} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary">
                                                                            <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                                        </a>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>

                                                {(config?.subscription_url ?? key.subscription_url) && (
                                                    <>
                                                        <button
                                                            onClick={() => handleAddToApp(key, subscriptionUrlFor(key))}
                                                            className="w-full bg-purple-600 hover:bg-purple-700 text-white p-2 sm:p-2.5 text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 sm:gap-2"
                                                        >
                                                            <span className="text-sm sm:text-base">2.</span>
                                                            <Smartphone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                            <span>Добавить VPN в приложение</span>
                                                        </button>
                                                    </>
                                                )}

                                                {/* Extend even if not expired */}
                                                <button
                                                    onClick={() => (window.location.href = '/account/tariffs')}
                                                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white p-2 sm:p-2.5 text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 sm:gap-2"
                                                >
                                                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                    <span>Продлить VPN</span>
                                                </button>
                                            </div>
                                        )}

                                        {/* Кнопка удаления */}
                                        <div className="flex justify-end pt-1 mt-auto">
                                            <button
                                                onClick={() => handleDeleteKey(key.id)}
                                                className="text-red-500 hover:text-red-400 text-[10px] sm:text-xs font-semibold transition-colors flex items-center gap-1"
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
