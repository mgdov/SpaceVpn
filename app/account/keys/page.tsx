"use client"

import { useState, useEffect } from "react"
import { Key, Download, Smartphone, Clock, Trash2, RefreshCw } from "lucide-react"
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
    const [error, setError] = useState("")

    useEffect(() => {
        loadClientsAndConfigs()
    }, [])

    const loadClientsAndConfigs = async () => {
        setLoadingClients(true)
        setError("")

        // Проверяем, используется ли тестовый пользователь
        const token = localStorage.getItem('auth_token')
        if (token === 'test_token_12345') {
            const mockClients: VPNClient[] = [
                {
                    id: 1,
                    client_uuid: 'test-uuid-1234',
                    name: 'TJWMW',
                    status: 'active',
                    created_at: new Date().toISOString(),
                    expires_at: new Date(Date.now() + 20 * 60 * 60 * 1000).toISOString(), // 20 часов
                },
                {
                    id: 2,
                    client_uuid: 'test-uuid-5678',
                    name: 'YCSMT',
                    status: 'expired',
                    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
                    expires_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // истек 2 часа назад
                }
            ]
            setClients(mockClients)

            // Загружаем конфиги для каждого ключа
            const mockConfig1: VPNConfig = {
                client_uuid: 'test-uuid-1234',
                name: 'TJWMW',
                xray_config: {
                    protocol: 'vless',
                    settings: { vnext: [] }
                },
                subscription_url: 'vless://test-uuid-1234@example.spacevpn.com:443?type=tcp&security=reality&flow=xtls-rprx-vision#SpaceVPN-Test',
                qr_code: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...',
            }
            const mockConfig2: VPNConfig = {
                client_uuid: 'test-uuid-5678',
                name: 'YCSMT',
                xray_config: {
                    protocol: 'vless',
                    settings: { vnext: [] }
                },
                subscription_url: 'vless://test-uuid-5678@example.spacevpn.com:443?type=tcp&security=reality&flow=xtls-rprx-vision#SpaceVPN-Test-2',
                qr_code: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...',
            }
            const configs = new Map()
            configs.set(1, mockConfig1)
            configs.set(2, mockConfig2)
            setVpnConfigs(configs)
            setLoadingClients(false)
            return
        }

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

    const handleInstallApp = () => {
        // Определяем платформу и перенаправляем на соответствующее приложение
        const userAgent = navigator.userAgent.toLowerCase()
        if (userAgent.includes('android')) {
            window.open('https://play.google.com/store/apps/details?id=com.v2ray.ang', '_blank')
        } else if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
            window.open('https://apps.apple.com/app/streisand/id6450534064', '_blank')
        } else {
            // Desktop - показываем инструкцию
            window.open('https://github.com/2dust/v2rayN/releases', '_blank')
        }
    }

    const handleAddToApp = (subscriptionUrl: string) => {
        // Копируем ссылку для добавления в приложение
        navigator.clipboard.writeText(subscriptionUrl).then(() => {
            alert('Ссылка скопирована! Вставьте её в приложение VPN.')
        })
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

    return (
        <div className="min-h-screen bg-background relative">
            <PixelStars />
            <Header />

            <main className="pt-24 pb-20 px-4">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Заголовок и навигация */}
                    <div className="bg-card border border-border p-6">
                        <Link
                            href="/account"
                            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm mb-4"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Назад в личный кабинет
                        </Link>
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
                                href="/pricing"
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
                            {clients.map((client) => {
                                const config = vpnConfigs.get(client.id)
                                const isExpired = client.expires_at && new Date(client.expires_at).getTime() < Date.now()
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
                                                    onClick={() => window.location.href = '/pricing'}
                                                    className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white p-2.5 text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                                                >
                                                    <Clock className="w-4 h-4" />
                                                    <span>Продлить ключ</span>
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="space-y-2 mb-3">
                                                <button
                                                    onClick={handleInstallApp}
                                                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground p-2.5 text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                                                >
                                                    <span className="text-base">1.</span>
                                                    <Download className="w-4 h-4" />
                                                    <span>Установить приложение для VPN</span>
                                                </button>

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
