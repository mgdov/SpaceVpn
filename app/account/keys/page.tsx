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
    type VPNClient,
    type VPNConfig,
} from "@/lib/api"

function AccountKeysPageContent() {
    const { user } = useAuth()
    const [clients, setClients] = useState<VPNClient[]>([])
    const [selectedClientId, setSelectedClientId] = useState<string | null>(null)
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

        const response = await listUserVPNClients()
        if (response.data) {
            setClients(response.data)
            if (!response.data.length) {
                setSelectedClientId(null)
                setVpnConfig(null)
            } else if (!selectedClientId || !response.data.find((client) => client.id === selectedClientId)) {
                setSelectedClientId(response.data[0].id)
            }
        } else {
            setError(response.error || "Не удалось загрузить список VPN ключей")
        }

        setLoadingClients(false)
    }

    const loadConfig = async (clientId: string) => {
        setLoadingConfig(true)
        setConfigError("")

        const response = await getUserVPNClientConfig(clientId)
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

        const response = await createUserVPNClient()
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

        const response = await regenerateUserVPNClient(selectedClientId)
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

        const response = await syncUserVPNClient(selectedClientId)
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

            <main className="pt-32 pb-20 px-4">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="bg-card border border-border p-6">
                        <p className="text-accent text-[9px] tracking-[0.35em]">[ КЛЮЧ ]</p>
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mt-4">
                            <div>
                                <h1 className="text-foreground text-2xl">
                                    {user?.full_name || user?.username}
                                </h1>
                                <p className="text-muted-foreground text-[11px]">{user?.email}</p>
                            </div>
                            {hasClients && selectedClient && (
                                <div className="flex flex-col items-start md:items-end gap-3 w-full md:w-auto">
                                    <div className="w-full md:w-60">
                                        <label className="text-muted-foreground text-[9px] uppercase tracking-[0.35em] block mb-2">
                                            Активный ключ
                                        </label>
                                        <select
                                            value={selectedClientId ?? ""}
                                            onChange={(event) => setSelectedClientId(event.target.value)}
                                            className="w-full bg-background border border-border text-[10px] px-3 py-2 focus:outline-none focus:border-primary"
                                        >
                                            {clients.map((client) => (
                                                <option key={client.id} value={client.id}>
                                                    {client.name || client.email || client.uuid}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-muted-foreground text-[9px] uppercase tracking-[0.35em]">Тип</p>
                                        <p className="text-foreground text-lg">VLESS / TLS Reality</p>
                                        <p className="text-muted-foreground text-[10px]">
                                            Обновлено: {formatDate(selectedClient.updated_at)}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {(error || configError) && (
                        <div className="bg-card border border-border p-4 text-[11px] text-red-400">
                            {error || configError}
                        </div>
                    )}

                    {loadingClients && (
                        <div className="bg-card border border-border p-6">
                            <p className="text-muted-foreground text-[11px]">Загрузка...</p>
                        </div>
                    )}

                    {!loadingClients && !hasClients && (
                        <div className="bg-card border border-border p-6 space-y-4">
                            <p className="text-muted-foreground text-[11px]">
                                У вас пока нет VPN ключа. Создайте первый, чтобы получить доступ к конфигурации.
                            </p>
                            <button
                                onClick={handleCreateClient}
                                disabled={creating}
                                className="flex items-center gap-2 border border-primary bg-primary text-primary-foreground px-6 py-3 text-[10px] hover:bg-primary/80 transition-colors disabled:opacity-50"
                            >
                                <Plus size={16} />
                                {creating ? "Создание..." : "Создать VPN ключ"}
                            </button>
                        </div>
                    )}

                    {hasClients && (
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={handleCreateClient}
                                disabled={creating}
                                className="flex-1 min-w-[220px] border border-border bg-card px-4 py-3 text-[10px] hover:border-primary disabled:opacity-50"
                            >
                                {creating ? "Создание..." : "Добавить ещё ключ"}
                            </button>
                            <button
                                onClick={handleSync}
                                disabled={!selectedClient || syncing}
                                className="flex-1 min-w-[220px] border border-border bg-card px-4 py-3 text-[10px] hover:border-primary flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                <RefreshCw size={14} />
                                {syncing ? "Синхронизация..." : "Синхронизировать"}
                            </button>
                            <button
                                onClick={handleRegenerate}
                                disabled={!selectedClient || regenerating}
                                className="flex-1 min-w-[220px] border border-border bg-card px-4 py-3 text-[10px] hover:border-accent text-accent flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                <RotateCw size={14} />
                                {regenerating ? "Обновление..." : "Перегенерировать"}
                            </button>
                        </div>
                    )}

                    {vpnConfig && selectedClient && !loadingConfig && (
                        <>
                            <section className="bg-card border border-border p-6 space-y-4">
                                <div className="flex flex-col gap-2">
                                    <p className="text-muted-foreground text-[10px]">VLESS / TLS Reality ссылка</p>
                                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                                        <code className="flex-1 text-foreground text-[11px] break-all bg-background border border-border p-3">
                                            {vpnConfig.share_link}
                                        </code>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleCopy(vpnConfig.share_link, "link")}
                                                className="border border-border px-4 py-2 text-[10px] hover:border-primary flex items-center gap-2"
                                            >
                                                {copiedField === "link" ? (
                                                    <>
                                                        <CheckCircle2 size={16} />
                                                        <span className="hidden sm:inline">Скопировано</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Copy size={16} />
                                                        <span className="hidden sm:inline">Копировать</span>
                                                    </>
                                                )}
                                            </button>
                                            <a
                                                href={vpnConfig.share_link}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="border border-border px-4 py-2 text-[10px] hover:border-primary flex items-center gap-2"
                                            >
                                                Открыть
                                                <ExternalLink size={14} />
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-border">
                                    <p className="text-muted-foreground text-[10px] mb-3">QR код для быстрой настройки</p>
                                    <div className="flex justify-center">
                                        <img
                                            src={vpnConfig.qr_code_base64}
                                            alt="VPN QR Code"
                                            className="w-64 h-64 border border-border"
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-border">
                                    <p className="text-muted-foreground text-[10px] mb-2">JSON конфигурация</p>
                                    <details className="cursor-pointer">
                                        <summary className="text-[10px] text-primary mb-2">Показать JSON</summary>
                                        <code className="block text-[9px] text-foreground break-all bg-background border border-border p-3 max-h-60 overflow-y-auto">
                                            {vpnConfig.config_json}
                                        </code>
                                        <button
                                            onClick={() => handleCopy(vpnConfig.config_json, "json")}
                                            className="mt-2 border border-border px-4 py-2 text-[10px] hover:border-primary"
                                        >
                                            {copiedField === "json" ? "Скопировано!" : "Копировать JSON"}
                                        </button>
                                    </details>
                                </div>

                                <Link
                                    href="/account/tariffs"
                                    className="inline-flex items-center gap-2 text-[10px] text-muted-foreground hover:text-primary"
                                >
                                    Нужен другой тариф? Перейти к оплате →
                                </Link>
                            </section>

                            <section className="bg-card border border-border p-6 space-y-3">
                                <p className="text-foreground text-[11px] font-semibold">Статистика использования</p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div>
                                        <p className="text-muted-foreground text-[9px]">Использовано</p>
                                        <p className="text-foreground text-lg">{selectedClient.data_used_gb.toFixed(2)} GB</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-[9px]">Лимит</p>
                                        <p className="text-foreground text-lg">
                                            {selectedClient.data_limit_gb === 0 ? "∞" : `${selectedClient.data_limit_gb} GB`}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-[9px]">Истекает</p>
                                        <p className="text-foreground text-lg">
                                            {selectedClient.expiry_date ? formatDate(selectedClient.expiry_date) : "Никогда"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-[9px]">Статус</p>
                                        <p className={`text-lg ${selectedClient.is_active ? "text-green-500" : "text-red-500"}`}>
                                            {selectedClient.is_active ? "Активен" : "Неактивен"}
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </>
                    )}

                    {loadingConfig && hasClients && (
                        <div className="bg-card border border-border p-6">
                            <p className="text-muted-foreground text-[11px]">Загрузка конфигурации...</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default withAuth(AccountKeysPageContent)
