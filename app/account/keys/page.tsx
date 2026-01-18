"use client"

import { useState, useEffect } from "react"
import { Copy, CheckCircle2, ExternalLink, Plus, RefreshCw, RotateCw } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PixelStars } from "@/components/pixel-stars"
import { useAuth, withAuth } from "@/lib/auth-context"
import {
    listUserVPNClients,
    getUserVPNClientConfig,
    createUserVPNClient,
    regenerateUserVPNClient,
    syncUserVPNClient,
    getUserSubscriptions,
    type VPNClient,
    type VPNConfig,
    type Subscription,
} from "@/lib/api"

function AccountKeysPageContent() {
    const { user } = useAuth()
    const [clients, setClients] = useState<VPNClient[]>([])
    const [selectedClientId, setSelectedClientId] = useState<number | null>(null)
    const [vpnConfig, setVpnConfig] = useState<VPNConfig | null>(null)
    const [copiedField, setCopiedField] = useState<"link" | "json" | null>(null)
    const [loadingClients, setLoadingClients] = useState(true)
    const [loadingConfig, setLoadingConfig] = useState(false)
    const [creating, setCreating] = useState(false)
    const [regenerating, setRegenerating] = useState(false)
    const [syncing, setSyncing] = useState(false)
    const [error, setError] = useState("")
    const [configError, setConfigError] = useState("")

    useEffect(() => {
        loadClients()
    }, [])

    useEffect(() => {
        if (!selectedClientId) {
            setVpnConfig(null)
            return
        }
        loadConfig(selectedClientId)
    }, [selectedClientId])

    const loadClients = async () => {
        setLoadingClients(true)
        setError("")

        // Проверяем, используется ли тестовый пользователь
        const token = localStorage.getItem('auth_token')
        if (token === 'test_token_12345') {
            const mockClients: VPNClient[] = [
                {
                    id: 1,
                    client_uuid: 'test-uuid-1234',
                    name: 'Мой тестовый ключ',
                    status: 'active',
                    created_at: new Date().toISOString(),
                }
            ]
            setClients(mockClients)
            if (!selectedClientId) {
                setSelectedClientId(mockClients[0]?.id || null)
            }
            setLoadingClients(false)
            return
        }

        const response = await listUserVPNClients()
        if (response.data) {
            setClients(response.data)
            if (!response.data.length) {
                setSelectedClientId(null)
                setVpnConfig(null)
            } else if (!selectedClientId || !response.data.find((client) => client.id === selectedClientId)) {
                setSelectedClientId(response.data[0]?.id || null)
            }
        } else {
            setError(response.error || "Не удалось загрузить список VPN ключей")
        }

        setLoadingClients(false)
    }

    const loadConfig = async (clientId: number) => {
        setLoadingConfig(true)
        setConfigError("")

        // Проверяем, используется ли тестовый пользователь
        const token = localStorage.getItem('auth_token')
        if (token === 'test_token_12345') {
            const mockConfig: VPNConfig = {
                client_uuid: 'test-uuid-1234',
                name: 'Мой тестовый ключ',
                xray_config: {
                    protocol: 'vless',
                    settings: { vnext: [] }
                },
                subscription_url: 'vless://test-uuid-1234@example.spacevpn.com:443?type=tcp&security=reality&flow=xtls-rprx-vision#SpaceVPN-Test',
                qr_code: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...',
            }
            setVpnConfig(mockConfig)
            setLoadingConfig(false)
            return
        }

        const response = await getUserVPNClientConfig(clientId.toString())
        if (response.data) {
            setVpnConfig(response.data)
        } else {
            setConfigError(response.error || "Не удалось загрузить конфигурацию")
        }

        setLoadingConfig(false)
    }

    const handleCreateClient = async () => {
        setCreating(true)
        setError("")

        // Получить активную подписку через /subscriptions/my
        const subscriptionsResponse = await getUserSubscriptions()
        const subscriptions = subscriptionsResponse.data?.subscriptions || []

        if (subscriptions.length === 0) {
            setError("У вас нет активной подписки. Сначала оформите подписку.")
            setCreating(false)
            return
        }

        const activeSubscription = subscriptions.find((sub) => sub.status === 'active') || subscriptions[0]
        if (!activeSubscription) {
            setError("Не найдена активная подписка для создания VPN ключа")
            setCreating(false)
            return
        }

        const response = await createUserVPNClient({
            subscription_id: activeSubscription.id,
            name: `Device ${new Date().toLocaleDateString()}`,
        })
        if (response.data) {
            await loadClients()
            setSelectedClientId(response.data.id)
        } else {
            setError(response.error || "Не удалось создать VPN клиент")
        }

        setCreating(false)
    }

    const handleRegenerate = async () => {
        if (!selectedClientId) return
        setRegenerating(true)
        setError("")

        const response = await regenerateUserVPNClient(selectedClientId.toString())
        if (response.data) {
            setVpnConfig(response.data)
        } else {
            setError(response.error || "Не удалось перегенерировать конфигурацию")
        }

        setRegenerating(false)
    }

    const handleSync = async () => {
        if (!selectedClientId) return
        setSyncing(true)
        setError("")

        const response = await syncUserVPNClient(selectedClientId.toString())
        if (!response.data && response.error) {
            setError(response.error || "Не удалось синхронизировать ключ")
        } else {
            // Refresh stats to reflect backend state
            await loadClients()
        }

        setSyncing(false)
    }

    const handleCopy = async (text: string, field: "link" | "json") => {
        try {
            await navigator.clipboard.writeText(text)
            setCopiedField(field)
            setTimeout(() => setCopiedField(null), 2000)
        } catch (error) {
            console.error("copy failed", error)
        }
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
    }

    const selectedClient = selectedClientId ? clients.find((client) => client.id === selectedClientId) || null : null
    const hasClients = clients.length > 0

    return (
        <div className="min-h-screen bg-background relative">
            <PixelStars />
            <Header />

            <main className="pt-24 pb-20 px-4">
                <div className="max-w-6xl mx-auto space-y-6">
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
                        <p className="text-muted-foreground text-sm mt-2">
                            Скопируйте VLESS ссылку и вставьте в приложение V2Ray или аналогичное
                        </p>
                    </div>

                    {/* Сообщения об ошибках */}
                    {(error || configError) && (
                        <div className="bg-red-500/10 border-2 border-red-500 p-6">
                            <div className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-red-400 text-sm">{error || configError}</p>
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
                                <Plus className="w-10 h-10 text-primary" />
                            </div>
                            <div>
                                <h2 className="text-foreground text-2xl font-bold mb-3">
                                    У вас пока нет VPN ключа
                                </h2>
                                <p className="text-muted-foreground text-base max-w-md mx-auto">
                                    Активируйте тариф, чтобы получить доступ к защищенному VPN подключению
                                </p>
                            </div>
                            <Link
                                href="/account/tariffs"
                                className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 text-sm font-semibold hover:bg-primary/90 transition-colors"
                            >
                                <Plus size={20} />
                                Выбрать тариф
                            </Link>
                        </div>
                    )}

                    {hasClients && (
                        <>
                            {/* Конфигурация выбранного ключа */}
                            {selectedClient && !loadingConfig && vpnConfig && (
                                <div className="bg-card border-2 border-primary p-6 md:p-8 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-accent text-[9px] tracking-[0.35em] mb-2">[ ВАШ КЛЮЧ ]</p>
                                            <h2 className="text-foreground text-2xl font-bold">{vpnConfig.name}</h2>
                                            {selectedClient.created_at && (
                                                <p className="text-muted-foreground text-sm mt-1">
                                                    Создан: {formatDate(selectedClient.created_at)}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={handleRegenerate}
                                                disabled={regenerating}
                                                className="border-2 border-border hover:border-accent px-4 py-3 transition-colors disabled:opacity-50"
                                                title="Перегенерировать ключ"
                                            >
                                                <RotateCw size={20} className={regenerating ? "animate-spin" : ""} />
                                            </button>
                                            <button
                                                onClick={handleSync}
                                                disabled={syncing}
                                                className="border-2 border-border hover:border-primary px-4 py-3 transition-colors disabled:opacity-50"
                                                title="Синхронизировать"
                                            >
                                                <RefreshCw size={20} className={syncing ? "animate-spin" : ""} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="bg-background border-2 border-border p-6 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-primary/20 p-2 rounded">
                                                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="text-muted-foreground text-xs uppercase tracking-wider">VLESS ССЫЛКА</p>
                                                    <p className="text-foreground text-sm font-semibold">Скопируйте для подключения</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleCopy(vpnConfig.subscription_url, "link")}
                                                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 text-sm font-semibold transition-colors flex items-center gap-2"
                                            >
                                                {copiedField === "link" ? (
                                                    <>
                                                        <CheckCircle2 size={18} />
                                                        Скопировано!
                                                    </>
                                                ) : (
                                                    <>
                                                        <Copy size={18} />
                                                        Копировать
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                        <code className="block text-foreground text-xs break-all bg-muted/50 border border-border p-4 rounded">
                                            {vpnConfig.subscription_url}
                                        </code>
                                    </div>

                                    {/* Инструкция */}
                                    <div className="bg-primary/5 border border-primary/20 p-6 space-y-3">
                                        <div className="flex items-start gap-3">
                                            <div className="bg-primary/20 p-2 rounded mt-1">
                                                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-foreground font-semibold mb-2">Как подключиться?</h3>
                                                <ol className="text-muted-foreground text-sm space-y-2 list-decimal list-inside">
                                                    <li>Скопируйте VLESS ссылку выше</li>
                                                    <li>Откройте приложение V2Ray, V2RayNG или аналогичное</li>
                                                    <li>Вставьте ссылку в приложение (обычно кнопка "+" или "Импорт")</li>
                                                    <li>Подключитесь к VPN</li>
                                                </ol>
                                                <Link href="#" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm mt-3 font-semibold">
                                                    Смотреть видеоинструкцию
                                                    <ExternalLink size={16} />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {loadingConfig && selectedClient && (
                                <div className="bg-card border border-border p-12 text-center">
                                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
                                    <p className="text-muted-foreground text-sm mt-4">Загрузка конфигурации...</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default withAuth(AccountKeysPageContent)
