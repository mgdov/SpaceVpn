"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PixelStars } from "@/components/pixel-stars"
import { ArrowLeft, Loader2, Search, CheckCircle2, Clock, AlertCircle, Copy } from "lucide-react"
import {
    searchKeyPublic,
    renewKeyPublic,
    getPublicTariffsNoAuth,
    type KeySearchResult,
    type PublicTariff,
    type RenewKeyResult,
} from "@/lib/api"

export default function ExtendKeyPage() {
    const [step, setStep] = useState<'search' | 'select-tariff' | 'success'>('search')
    const [keyIdentifier, setKeyIdentifier] = useState("")
    const [searchResult, setSearchResult] = useState<KeySearchResult | null>(null)
    const [tariffs, setTariffs] = useState<PublicTariff[]>([])
    const [renewResult, setRenewResult] = useState<RenewKeyResult | null>(null)

    const [searching, setSearching] = useState(false)
    const [loadingTariffs, setLoadingTariffs] = useState(false)
    const [renewing, setRenewing] = useState(false)
    const [error, setError] = useState("")
    const [copied, setCopied] = useState(false)

    const handleSearch = async () => {
        if (!keyIdentifier.trim()) {
            setError("Введите идентификатор ключа")
            return
        }

        setSearching(true)
        setError("")
        setSearchResult(null)

        const response = await searchKeyPublic(keyIdentifier.trim())

        if (response.data?.found) {
            setSearchResult(response.data)
            // Load tariffs for renewal
            await loadTariffs()
            setStep('select-tariff')
        } else if (response.data && !response.data.found) {
            setError("Ключ не найден. Проверьте идентификатор и попробуйте снова.")
        } else {
            setError(response.error || "Ошибка поиска")
        }

        setSearching(false)
    }

    const loadTariffs = async () => {
        setLoadingTariffs(true)
        const response = await getPublicTariffsNoAuth()
        if (response.data?.tariffs) {
            setTariffs(response.data.tariffs)
        }
        setLoadingTariffs(false)
    }

    const handleRenew = async (tariffId: number) => {
        setRenewing(true)
        setError("")

        const response = await renewKeyPublic({
            key_identifier: keyIdentifier,
            tariff_id: tariffId,
        })

        if (response.data?.success) {
            setRenewResult(response.data)
            setStep('success')
        } else {
            setError(response.error || "Ошибка продления")
        }

        setRenewing(false)
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

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    // Success screen
    if (step === 'success' && renewResult) {
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
                                    Ключ продлён!
                                </h1>
                                <p className="text-muted-foreground">{renewResult.message}</p>
                            </div>

                            <div className="bg-primary/10 border border-primary p-4 text-center">
                                <p className="text-sm text-muted-foreground mb-1">Ваш ключ:</p>
                                <p className="text-3xl font-mono font-bold text-primary">{renewResult.key_id}</p>
                                <p className="text-sm text-muted-foreground mt-2">
                                    Новая дата истечения: {formatDate(renewResult.new_expires_at)}
                                </p>
                            </div>

                            {renewResult.subscription_url && (
                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground">VLESS ссылка:</p>
                                    <div className="relative">
                                        <code className="block bg-muted p-4 text-xs break-all rounded">
                                            {renewResult.subscription_url}
                                        </code>
                                        <button
                                            onClick={() => handleCopy(renewResult.subscription_url)}
                                            className="absolute top-2 right-2 p-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded"
                                        >
                                            {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-col gap-3">
                                <Link
                                    href="/"
                                    className="block text-center bg-primary text-primary-foreground py-3 font-semibold hover:bg-primary/90"
                                >
                                    На главную
                                </Link>
                                <button
                                    onClick={() => {
                                        setStep('search')
                                        setKeyIdentifier("")
                                        setSearchResult(null)
                                        setRenewResult(null)
                                    }}
                                    className="text-muted-foreground hover:text-primary text-sm"
                                >
                                    Продлить другой ключ
                                </button>
                            </div>
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
                <div className="max-w-2xl mx-auto">
                    {/* Back Button */}
                    <Link
                        href="/buy-no-register"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary text-sm mb-8"
                    >
                        <ArrowLeft size={16} />
                        Назад
                    </Link>

                    {/* Title */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Продлить ключ
                        </h1>
                        <p className="text-muted-foreground">
                            Введите идентификатор ключа или VLESS ссылку
                        </p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="bg-red-500/10 border border-red-500 p-4 mb-6 flex items-center gap-3">
                            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                            <p className="text-red-400 text-sm">{error}</p>
                        </div>
                    )}

                    {/* Step 1: Search */}
                    {step === 'search' && (
                        <div className="bg-card border-2 border-border p-6 space-y-6">
                            <div>
                                <label className="block text-sm text-foreground mb-2">
                                    Идентификатор ключа
                                </label>
                                <div className="flex gap-3">
                                    <input
                                        type="text"
                                        value={keyIdentifier}
                                        onChange={(e) => setKeyIdentifier(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="TJWMW или vless://..."
                                        className="flex-1 bg-background border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                                    />
                                    <button
                                        onClick={handleSearch}
                                        disabled={searching}
                                        className="bg-primary text-primary-foreground px-6 py-3 font-semibold hover:bg-primary/90 disabled:opacity-50 flex items-center gap-2"
                                    >
                                        {searching ? (
                                            <Loader2 size={18} className="animate-spin" />
                                        ) : (
                                            <Search size={18} />
                                        )}
                                        Найти
                                    </button>
                                </div>
                                <p className="text-muted-foreground text-xs mt-2">
                                    Введите 5-буквенный код ключа (например TJWMW) или полную VLESS ссылку
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Select Tariff */}
                    {step === 'select-tariff' && searchResult && (
                        <div className="space-y-6">
                            {/* Key Info */}
                            <div className={`bg-card border-2 p-6 ${searchResult.is_expired ? 'border-red-500' : 'border-green-500'}`}>
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Найден ключ:</p>
                                        <p className="text-2xl font-mono font-bold text-primary">{searchResult.key_id}</p>
                                    </div>
                                    <span className={`px-3 py-1 text-xs font-semibold ${searchResult.is_expired
                                            ? 'bg-red-500/20 text-red-500 border border-red-500'
                                            : 'bg-green-500/20 text-green-500 border border-green-500'
                                        }`}>
                                        {searchResult.is_expired ? 'Истёк' : 'Активен'}
                                    </span>
                                </div>

                                {searchResult.expires_at && (
                                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                        <Clock size={14} />
                                        <span>
                                            {searchResult.is_expired ? 'Истёк: ' : 'Истекает: '}
                                            {formatDate(searchResult.expires_at)}
                                        </span>
                                        {searchResult.time_remaining && !searchResult.is_expired && (
                                            <span className="text-primary">({searchResult.time_remaining})</span>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Select Tariff */}
                            <div>
                                <h2 className="text-lg font-semibold text-foreground mb-4">
                                    Выберите тариф для продления:
                                </h2>

                                {loadingTariffs ? (
                                    <div className="text-center py-8">
                                        <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto" />
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {tariffs.map(tariff => (
                                            <button
                                                key={tariff.id}
                                                onClick={() => handleRenew(tariff.id)}
                                                disabled={renewing || tariff.price > 0}
                                                className="p-4 border-2 border-border hover:border-primary text-left transition-all disabled:opacity-50"
                                            >
                                                <div className="flex justify-between items-center">
                                                    <p className="text-sm text-foreground font-semibold">+{tariff.duration_days} дней</p>
                                                    <span className="font-bold text-primary">{tariff.price} ₽</span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Back to search */}
                            <button
                                onClick={() => {
                                    setStep('search')
                                    setSearchResult(null)
                                }}
                                className="text-muted-foreground hover:text-primary text-sm"
                            >
                                ← Искать другой ключ
                            </button>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    )
}
