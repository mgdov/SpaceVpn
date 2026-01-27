"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PixelStars } from "@/components/pixel-stars"
import { ArrowLeft, Loader2, CheckCircle2, Copy, QrCode, Download } from "lucide-react"
import {
    getPublicTariffsNoAuth,
    createKeyPublic,
    type PublicTariff,
    type CreateKeyResult
} from "@/lib/api"
import { initiatePayment } from "@/lib/api/payments"
import { pollKeyByPayment } from "@/lib/api/public-api"

export default function NewKeyPage() {
    const [tariffs, setTariffs] = useState<PublicTariff[]>([])
    const [loading, setLoading] = useState(true)
    const [creating, setCreating] = useState(false)
    const [error, setError] = useState("")
    const [result, setResult] = useState<CreateKeyResult | null>(null)
    const [copied, setCopied] = useState(false)
    const [showQR, setShowQR] = useState(false)
    const [selectedTariffId, setSelectedTariffId] = useState<number | null>(null)
    const [paying, setPaying] = useState(false)

    const searchParams = useSearchParams()

    useEffect(() => {
        loadTariffs()
    }, [])

    // If redirected back after payment, poll for the created key
    useEffect(() => {
        let paymentId = searchParams?.get("payment_id")
        if (!paymentId && typeof window !== 'undefined') {
            paymentId = localStorage.getItem('last_payment_id') || undefined
        }
        if (!paymentId) return

        const fetchKey = async () => {
            setError("")
            const response = await pollKeyByPayment(paymentId)
            if (response.data) {
                // Normalize to CreateKeyResult-like structure for display
                setResult({
                    success: true,
                    key_id: response.data.key_id,
                    client_id: response.data.client_id,
                    subscription_url: response.data.subscription_url,
                    qr_code: response.data.qr_code,
                    expires_at: response.data.expires_at,
                    message: "Оплата успешно выполнена. Ваш ключ создан!",
                })
                // cleanup saved payment id
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('last_payment_id')
                }
            } else {
                setError(response.error || "Не удалось получить ключ после оплаты")
            }
        }

        fetchKey()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams])

    const loadTariffs = async () => {
        setLoading(true)
        const response = await getPublicTariffsNoAuth()
        if (response.data?.tariffs) {
            setTariffs(response.data.tariffs)
        } else {
            setError("Не удалось загрузить тарифы")
        }
        setLoading(false)
    }

    const handleCreateKey = async (tariffId: number) => {
        setCreating(true)
        setError("")

        const response = await createKeyPublic({
            tariff_id: tariffId,
            bypass_preset: "yandex",
        })

        if (response.data?.success) {
            setResult(response.data)
        } else {
            setError(response.error || "Не удалось создать ключ")
        }

        setCreating(false)
    }

    const handleSelectTariff = (tariff: PublicTariff) => {
        setSelectedTariffId(tariff.id)
        setError("")
        // For free tariffs – create immediately
        if (tariff.price === 0) {
            handleCreateKey(tariff.id)
        }
    }

    const handleProceedToPayment = async () => {
        if (!selectedTariffId) return
        setPaying(true)
        setError("")
        try {
            const returnUrl = `${window.location.origin}/buy-no-register/new-key`
            const response = await initiatePayment(selectedTariffId, returnUrl)
            if (response.data?.confirmation_url) {
                if (response.data.payment_id && typeof window !== 'undefined') {
                    localStorage.setItem('last_payment_id', response.data.payment_id)
                }
                // Redirect to YooKassa confirmation
                window.location.href = response.data.confirmation_url
            } else {
                setError(response.error || "Не удалось инициировать оплату")
            }
        } catch (e) {
            setError(e instanceof Error ? e.message : "Ошибка оплаты")
        } finally {
            setPaying(false)
        }
    }

    const handleCopy = async (text: string) => {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    // Show result if key created
    if (result) {
        return (
            <div className="min-h-screen bg-background relative">
                <PixelStars />
                <Header />
                <main className="relative z-10 px-4 pt-24 pb-20">
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-card border-2 border-green-500 p-8 space-y-6">
                            <div className="text-center">
                                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                                <h1 className="text-2xl font-bold text-foreground mb-2">
                                    Ключ создан!
                                </h1>
                                <p className="text-muted-foreground">{result.message}</p>
                            </div>

                            {/* Key ID */}
                            <div className="bg-primary/10 border border-primary p-4 text-center">
                                <p className="text-sm text-muted-foreground mb-1">Ваш ключ:</p>
                                <p className="text-3xl font-mono font-bold text-primary">{result.key_id}</p>
                                <p className="text-xs text-muted-foreground mt-2">
                                    Действует до: {formatDate(result.expires_at)}
                                </p>
                            </div>

                            {/* VLESS URL */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-muted-foreground">VLESS ссылка:</p>
                                    <button
                                        onClick={() => setShowQR(!showQR)}
                                        className="text-primary hover:text-primary/80 text-sm flex items-center gap-1"
                                    >
                                        <QrCode size={16} />
                                        {showQR ? 'Скрыть QR' : 'Показать QR'}
                                    </button>
                                </div>
                                <div className="relative">
                                    <code className="block bg-muted p-4 text-xs break-all rounded">
                                        {result.subscription_url}
                                    </code>
                                    <button
                                        onClick={() => handleCopy(result.subscription_url)}
                                        className="absolute top-2 right-2 p-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded"
                                    >
                                        {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                                    </button>
                                </div>
                            </div>

                            {/* QR Code */}
                            {showQR && result.qr_code && (
                                <div className="flex justify-center bg-white p-4 rounded">
                                    <img src={result.qr_code} alt="QR Code" className="w-48 h-48" />
                                </div>
                            )}

                            {/* Instructions */}
                            <div className="bg-primary/5 border border-primary/20 p-4 space-y-2">
                                <p className="text-foreground font-semibold">Как подключиться:</p>
                                <ol className="text-muted-foreground text-sm space-y-1 list-decimal list-inside">
                                    <li>Скачайте Happ VPN из App Store или Google Play</li>
                                    <li>Нажмите кнопку "Копировать" выше</li>
                                    <li>В приложении нажмите + → Импорт из буфера</li>
                                    <li>Подключитесь к VPN</li>
                                </ol>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <a
                                    href="https://apps.apple.com/app/happ-vpn/id6478556657"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 font-semibold transition-colors"
                                >
                                    <Download size={18} />
                                    Скачать Happ VPN
                                </a>
                                <button
                                    onClick={() => handleCopy(result.subscription_url)}
                                    className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground py-3 font-semibold transition-colors"
                                >
                                    {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                                    {copied ? 'Скопировано!' : 'Копировать ссылку'}
                                </button>
                            </div>

                            {/* Warning */}
                            <div className="bg-orange-500/10 border border-orange-500/50 p-4 text-center">
                                <p className="text-orange-500 text-sm font-semibold">
                                    ⚠️ Сохраните ключ {result.key_id}!
                                </p>
                                <p className="text-orange-400 text-xs mt-1">
                                    Он понадобится для продления подписки
                                </p>
                            </div>

                            <Link
                                href="/"
                                className="block text-center text-muted-foreground hover:text-primary text-sm"
                            >
                                ← Вернуться на главную
                            </Link>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background relative">
            <PixelStars />
            <Header />
            <main className="relative z-10 px-4 pt-24 pb-20">
                <div className="max-w-4xl mx-auto">
                    {/* Warning banner */}
                    <div className="bg-red-900/40 border-2 border-red-500 text-red-200 p-6 mb-8">
                        <p className="font-bold text-red-100 mb-2">⚠️ ВАЖНО! Сохраните ваш ключ!</p>
                        <p className="text-red-100 mb-3">После покупки обязательно сохраните subscription URL ключа!</p>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Скопируйте ключ и сохраните его в надежном месте</li>
                            <li>Без ключа вы не сможете подключиться к VPN</li>
                            <li>Ключ понадобится для продления подписки</li>
                            <li>Восстановить потерянный ключ невозможно!</li>
                        </ul>
                    </div>
                    {/* Back Button */}
                    <Link
                        href="/buy-no-register"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary text-sm mb-8"
                    >
                        <ArrowLeft size={16} />
                        Назад
                    </Link>

                    {/* Title */}
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Купить новый ключ
                        </h1>
                        <p className="text-muted-foreground">
                            Выберите тариф. Регистрация не требуется.
                        </p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="bg-red-500/10 border border-red-500 p-4 mb-6 text-center">
                            <p className="text-red-400">{error}</p>
                        </div>
                    )}

                    {/* Loading */}
                    {loading && (
                        <div className="text-center py-12">
                            <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
                            <p className="text-muted-foreground mt-4">Загрузка тарифов...</p>
                        </div>
                    )}

                    {/* Tariffs */}
                    {!loading && tariffs.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {tariffs.map(tariff => {
                                const isSelected = selectedTariffId === tariff.id
                                const isFree = tariff.price === 0
                                return (
                                    <div
                                        key={tariff.id}
                                        className={`bg-card p-6 flex flex-col text-center border-2 ${isSelected ? 'border-green-500' : 'border-border'}`}
                                    >
                                        <button
                                            onClick={() => handleSelectTariff(tariff)}
                                            className="text-left w-full"
                                        >
                                            <p className="text-foreground text-lg font-semibold">
                                                {tariff.duration_days} {tariff.duration_days === 1 ? 'день' : tariff.duration_days < 5 ? 'дня' : 'дней'}
                                            </p>
                                            <div className="mt-4">
                                                <span className="text-4xl font-bold text-primary">{tariff.price}</span>
                                                <span className="text-muted-foreground ml-1">₽</span>
                                            </div>
                                        </button>

                                        {isSelected && !isFree && (
                                            <div className="mt-6">
                                                <button
                                                    onClick={handleProceedToPayment}
                                                    className="w-full py-3 font-semibold bg-green-500 hover:bg-green-600 text-white flex items-center justify-center gap-2"
                                                    disabled={paying}
                                                >
                                                    {paying ? (
                                                        <>
                                                            <Loader2 size={16} className="animate-spin" />
                                                            Переход к оплате...
                                                        </>
                                                    ) : (
                                                        <>Перейти к оплате</>
                                                    )}
                                                </button>
                                            </div>
                                        )}

                                        {isSelected && isFree && creating && (
                                            <div className="mt-6 text-muted-foreground">
                                                <span className="inline-flex items-center gap-2"><Loader2 size={16} className="animate-spin" /> Создание ключа...</span>
                                            </div>
                                        )}
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
