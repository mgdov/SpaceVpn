"use client"

import { useState, useEffect } from "react"
import { Plus } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PixelStars } from "@/components/pixel-stars"
import { VPNKeyCard } from "@/components/vpn-key-card"
import { useAuth, withAuth } from "@/lib/auth-context"
import {
    getUserVPNKeys,
    extendVPNKey,
    deleteUserVPNClient,
    getPublicTariffs,
    type VPNKeyStatus,
    type Tariff,
} from "@/lib/api"

function AccountKeysPageContent() {
    const { user } = useAuth()
    const [keys, setKeys] = useState<VPNKeyStatus[]>([])
    const [tariffs, setTariffs] = useState<Tariff[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [extendingId, setExtendingId] = useState<number | null>(null)
    const [deletingId, setDeletingId] = useState<number | null>(null)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null)
    const [showExtendModal, setShowExtendModal] = useState<number | null>(null)

    useEffect(() => {
        loadKeys()
        loadTariffs()
    }, [])

    const loadKeys = async () => {
        setLoading(true)
        setError("")

        // Тестовый пользователь
        const token = localStorage.getItem('auth_token')
        if (token === 'test_token_12345') {
            const mockKeys: VPNKeyStatus[] = [
                {
                    id: 1,
                    key_id: 'TJWMW',
                    status: 'active',
                    expire_date: new Date(Date.now() + 19 * 60 * 60 * 1000).toISOString(),
                    time_remaining: '19 ч.',
                    time_remaining_seconds: 19 * 60 * 60,
                    is_expired: false,
                    traffic_used_bytes: 0,
                    traffic_limit_bytes: 10 * 1024 * 1024 * 1024,
                    traffic_used_gb: 0,
                    traffic_limit_gb: 10,
                    traffic_percentage: 0,
                    subscription_url: 'vless://test@example.com:443?security=reality#SpaceVPN',
                    qr_code: null,
                    happ_deeplink: 'happ://add?url=vless%3A%2F%2Ftest',
                    can_extend: true,
                    can_delete: true,
                },
                {
                    id: 2,
                    key_id: 'YCSMT',
                    status: 'expired',
                    expire_date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
                    time_remaining: 'Истёк',
                    time_remaining_seconds: 0,
                    is_expired: true,
                    traffic_used_bytes: 0,
                    traffic_limit_bytes: 10 * 1024 * 1024 * 1024,
                    traffic_used_gb: 0,
                    traffic_limit_gb: 10,
                    traffic_percentage: 0,
                    subscription_url: 'vless://test2@example.com:443?security=reality#SpaceVPN',
                    qr_code: null,
                    happ_deeplink: 'happ://add?url=vless%3A%2F%2Ftest2',
                    can_extend: true,
                    can_delete: true,
                }
            ]
            setKeys(mockKeys)
            setLoading(false)
            return
        }

        const response = await getUserVPNKeys()
        if (response.data) {
            setKeys(response.data.keys)
        } else {
            setError(response.error || "Не удалось загрузить ключи")
        }

        setLoading(false)
    }

    const loadTariffs = async () => {
        const response = await getPublicTariffs()
        if (response.data) {
            setTariffs(response.data.filter(t => t.is_active))
        }
    }

    const handleAddToApp = (key: VPNKeyStatus) => {
        if (key.happ_deeplink) {
            // Try to open Happ VPN app
            window.location.href = key.happ_deeplink
        } else if (key.subscription_url) {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(key.subscription_url)
            alert('VLESS ссылка скопирована в буфер обмена')
        }
    }

    const handleExtend = async (keyId: number, tariffId?: number) => {
        setExtendingId(keyId)
        setError("")

        const response = await extendVPNKey(keyId, tariffId ? { tariff_id: tariffId } : undefined)
        if (response.data?.success) {
            await loadKeys()
            setShowExtendModal(null)
        } else {
            setError(response.error || response.data?.message || "Не удалось продлить ключ")
        }

        setExtendingId(null)
    }

    const handleDelete = async (keyId: number) => {
        setDeletingId(keyId)
        setError("")

        const response = await deleteUserVPNClient(keyId.toString())
        if (!response.error) {
            await loadKeys()
            setShowDeleteConfirm(null)
        } else {
            setError(response.error || "Не удалось удалить ключ")
        }

        setDeletingId(null)
    }

    const freeTariff = tariffs.find(t => t.price === 0)

    return (
        <div className="min-h-screen bg-background relative">
            <PixelStars />
            <Header />

            <main className="pt-24 pb-20 px-4">
                <div className="max-w-4xl mx-auto space-y-6">
                    {/* Заголовок */}
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
                            Мои ключи
                        </h1>
                    </div>

                    {/* Ошибки */}
                    {error && (
                        <div className="bg-red-500/10 border-2 border-red-500 p-4">
                            <p className="text-red-400 text-sm">{error}</p>
                        </div>
                    )}

                    {/* Загрузка */}
                    {loading && (
                        <div className="bg-card border border-border p-12 text-center">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
                            <p className="text-muted-foreground text-sm mt-4">Загрузка ключей...</p>
                        </div>
                    )}

                    {/* Нет ключей */}
                    {!loading && keys.length === 0 && (
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

                    {/* Список ключей */}
                    {!loading && keys.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {keys.map(key => (
                                <VPNKeyCard
                                    key={key.id}
                                    keyData={key}
                                    onAddToApp={() => handleAddToApp(key)}
                                    onExtend={() => setShowExtendModal(key.id)}
                                    onDelete={() => setShowDeleteConfirm(key.id)}
                                    extending={extendingId === key.id}
                                    deleting={deletingId === key.id}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />

            {/* Модальное окно подтверждения удаления */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-card border-2 border-red-500 p-6 max-w-md w-full space-y-4">
                        <h3 className="text-foreground text-lg font-bold">Удалить VPN ключ?</h3>
                        <p className="text-muted-foreground text-sm">
                            Это действие нельзя отменить. Ключ будет удалён из вашего аккаунта.
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setShowDeleteConfirm(null)}
                                className="px-6 py-2 border-2 border-border hover:border-primary transition-colors text-sm"
                            >
                                Отмена
                            </button>
                            <button
                                onClick={() => handleDelete(showDeleteConfirm)}
                                disabled={deletingId === showDeleteConfirm}
                                className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white transition-colors text-sm disabled:opacity-50"
                            >
                                {deletingId === showDeleteConfirm ? "Удаление..." : "Удалить"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Модальное окно продления */}
            {showExtendModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-card border-2 border-primary p-6 max-w-md w-full space-y-4">
                        <h3 className="text-foreground text-lg font-bold">Продлить ключ</h3>
                        <p className="text-muted-foreground text-sm">
                            Выберите тариф для продления вашего VPN ключа.
                        </p>
                        
                        <div className="space-y-3">
                            {freeTariff && (
                                <button
                                    onClick={() => handleExtend(showExtendModal, freeTariff.id)}
                                    disabled={extendingId === showExtendModal}
                                    className="w-full p-4 border-2 border-green-500 bg-green-500/10 hover:bg-green-500/20 transition-colors text-left"
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-foreground font-semibold">{freeTariff.name}</p>
                                            <p className="text-muted-foreground text-sm">
                                                {freeTariff.duration_months > 0 ? `${freeTariff.duration_months} мес.` : '1 день'}
                                            </p>
                                        </div>
                                        <span className="text-green-500 font-bold">Бесплатно</span>
                                    </div>
                                </button>
                            )}
                            
                            {tariffs.filter(t => t.price > 0).slice(0, 3).map(tariff => (
                                <button
                                    key={tariff.id}
                                    onClick={() => handleExtend(showExtendModal, tariff.id)}
                                    disabled={extendingId === showExtendModal}
                                    className="w-full p-4 border-2 border-border hover:border-primary transition-colors text-left opacity-50 cursor-not-allowed"
                                    title="Платные тарифы временно недоступны"
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-foreground font-semibold">{tariff.name}</p>
                                            <p className="text-muted-foreground text-sm">
                                                {tariff.duration_months} мес.
                                            </p>
                                        </div>
                                        <span className="text-primary font-bold">{tariff.price} ₽</span>
                                    </div>
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setShowExtendModal(null)}
                            className="w-full py-2 border-2 border-border hover:border-primary transition-colors text-sm"
                        >
                            Отмена
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default withAuth(AccountKeysPageContent)
