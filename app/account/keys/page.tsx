"use client"

import { useState, useEffect } from "react"
import { Copy, CheckCircle2, ExternalLink, Plus } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PixelStars } from "@/components/pixel-stars"
import { useAuth, withAuth } from "@/lib/auth-context"
import { getMyVPNClient, getVPNConfig, createVPNClient, type VPNClient, type VPNConfig } from "@/lib/api"

function AccountKeysPageContent() {
    const { user } = useAuth()
    const [copied, setCopied] = useState(false)
    const [vpnClient, setVpnClient] = useState<VPNClient | null>(null)
    const [vpnConfig, setVpnConfig] = useState<VPNConfig | null>(null)
    const [loading, setLoading] = useState(true)
    const [creating, setCreating] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        loadVPNClient()
    }, [])

    const loadVPNClient = async () => {
        setLoading(true)
        setError("")
        
        const clientResponse = await getMyVPNClient()
        if (clientResponse.data) {
            setVpnClient(clientResponse.data)
            
            // Load config
            const configResponse = await getVPNConfig()
            if (configResponse.data) {
                setVpnConfig(configResponse.data)
            } else {
                setError(configResponse.error || "Не удалось загрузить конфигурацию")
            }
        } else if (clientResponse.error) {
            if (clientResponse.error.includes("404") || clientResponse.error.includes("not found")) {
                setError("У вас пока нет VPN ключа")
            } else {
                setError(clientResponse.error)
            }
        }
        
        setLoading(false)
    }

    const handleCreateClient = async () => {
        setCreating(true)
        setError("")
        
        const response = await createVPNClient()
        if (response.data) {
            await loadVPNClient()
        } else {
            setError(response.error || "Не удалось создать VPN клиент")
        }
        
        setCreating(false)
    }

    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
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
                            {vpnClient && (
                                <div className="text-right">
                                    <p className="text-muted-foreground text-[9px] uppercase tracking-[0.35em]">Тип</p>
                                    <p className="text-foreground text-lg">VLESS / TLS Reality</p>
                                    <p className="text-muted-foreground text-[10px]">
                                        Обновлено: {formatDate(vpnClient.updated_at)}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {error && !vpnClient && (
                        <div className="bg-card border border-border p-6 space-y-4">
                            <p className="text-muted-foreground text-[11px]">{error}</p>
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

                    {loading && !error && (
                        <div className="bg-card border border-border p-6">
                            <p className="text-muted-foreground text-[11px]">Загрузка...</p>
                        </div>
                    )}

                    {vpnConfig && vpnClient && (
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
                                                onClick={() => handleCopy(vpnConfig.share_link)}
                                                className="border border-border px-4 py-2 text-[10px] hover:border-primary flex items-center gap-2"
                                            >
                                                {copied ? (
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
                                            onClick={() => handleCopy(vpnConfig.config_json)}
                                            className="mt-2 border border-border px-4 py-2 text-[10px] hover:border-primary"
                                        >
                                            {copied ? "Скопировано!" : "Копировать JSON"}
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
                                        <p className="text-foreground text-lg">{vpnClient.data_used_gb.toFixed(2)} GB</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-[9px]">Лимит</p>
                                        <p className="text-foreground text-lg">
                                            {vpnClient.data_limit_gb === 0 ? "∞" : `${vpnClient.data_limit_gb} GB`}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-[9px]">Истекает</p>
                                        <p className="text-foreground text-lg">
                                            {vpnClient.expiry_date ? formatDate(vpnClient.expiry_date) : "Никогда"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-[9px]">Статус</p>
                                        <p className={`text-lg ${vpnClient.is_active ? "text-green-500" : "text-red-500"}`}>
                                            {vpnClient.is_active ? "Активен" : "Неактивен"}
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default withAuth(AccountKeysPageContent)
