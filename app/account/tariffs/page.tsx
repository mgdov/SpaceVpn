"use client"

import { useEffect, useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { getPublicTariffs, getMySubscriptions, purchaseFreeTariff, createYookassaPayment, type Tariff } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { BypassPresetSelector } from "@/components/bypass-preset-selector"
import { CheckCircle2, XCircle, Loader2, ArrowLeft } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PixelStars } from "@/components/pixel-stars"
import { formatDuration } from "@/lib/utils/tariffs"

export default function TariffsPage() {
  const router = useRouter()
  const [tariffs, setTariffs] = useState<Tariff[]>([])
  const [loading, setLoading] = useState(true)
  const [purchasing, setPurchasing] = useState<number | null>(null)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [selectedTariff, setSelectedTariff] = useState<Tariff | null>(null)
  const [bypassPreset, setBypassPreset] = useState<string>("yandex")
  const [showPresetDialog, setShowPresetDialog] = useState(false)
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false)

  useEffect(() => {
    loadTariffs()
    loadMySubscriptions()
  }, [])

  const loadMySubscriptions = async () => {
    const res = await getMySubscriptions()
    const active = res.data?.subscriptions?.some((s: { status: string }) => s.status === "active") ?? false
    setHasActiveSubscription(active)
  }

  const loadTariffs = async () => {
    setLoading(true)

    const response = await getPublicTariffs()
    if (response.data?.length) {
      setTariffs(response.data.filter((tariff) => tariff.is_active))
    }
    setLoading(false)
  }

  const handlePurchase = async (tariffId: number, tariffName: string, tariffPrice: number) => {
    if (hasActiveSubscription) {
      router.push("/account/keys")
      return
    }

    // Если тариф бесплатный, сначала показываем диалог выбора bypass preset
    if (tariffPrice === 0) {
      setSelectedTariff(tariffs.find(t => t.id === tariffId) || null)
      setShowPresetDialog(true)
      return
    }

    // Платный тариф — создаём платёж в YooKassa и редиректим
    setPurchasing(tariffId)
    setMessage(null)
    try {
      const response = await createYookassaPayment({
        tariffId,
        plan: tariffName,
        price: tariffPrice,
        description: `Оплата тарифа ${tariffName}`,
      })
      if (response.data?.confirmation_url) {
        window.location.href = response.data.confirmation_url
        return
      }
      setMessage({ type: 'error', text: response.error || 'Не удалось инициировать оплату' })
    } catch (e) {
      setMessage({ type: 'error', text: 'Ошибка подключения к YooKassa' })
    } finally {
      setPurchasing(null)
    }
  }

  const confirmPurchase = async () => {
    if (!selectedTariff) return
    if (hasActiveSubscription) {
      setShowPresetDialog(false)
      router.push("/account/keys")
      return
    }

    // Clear previous messages
    setMessage(null)
    setPurchasing(selectedTariff.id)
    setShowPresetDialog(false)

    try {
      const response = await purchaseFreeTariff({
        tariff_id: selectedTariff.id,
        bypass_preset: bypassPreset,
      })

      if (response.data) {
        setMessage({
          type: "success",
          text: response.data.message,
        })

        // Redirect to keys page after 2 seconds
        setTimeout(() => {
          router.push("/account/keys")
        }, 2000)
      } else {
        setMessage({
          type: "error",
          text: response.error || "Ошибка активации тарифа",
        })
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Произошла ошибка. Попробуйте позже.",
      })
    } finally {
      setPurchasing(null)
      setSelectedTariff(null)
    }
  }

  const formatDataLimit = (gb: number) => {
    if (gb === 0) return "Безлимитный"
    if (gb < 1000) return `${gb} ГБ`
    return `${gb / 1000} ТБ`
  }

  const tariffMonths = (t: { duration_days?: number; duration_months?: number }) =>
    t.duration_days != null ? Math.max(1, t.duration_days / 30) : (t.duration_months === 0 ? 1 : Math.max(1, t.duration_months ?? 1))

  const baseMonthlyPrice = useMemo(() => {
    if (!tariffs.length) return 0
    const perMonthPrices = tariffs.map((tariff) => tariff.price / tariffMonths(tariff))
    return Math.min(...perMonthPrices)
  }, [tariffs])

  const highlightTariffId = useMemo(() => {
    if (!tariffs.length) return null
    return tariffs.reduce((best, current) => {
      const currentMonths = tariffMonths(current)
      const bestMonths = tariffMonths(best)
      const currentRatio = current.price / currentMonths
      const bestRatio = best.price / bestMonths
      return currentRatio < bestRatio ? current : best
    }).id
  }, [tariffs])

  if (loading) {
    return (
      <div className="min-h-screen bg-background relative">
        <PixelStars />
        <Header />
        <div className="container mx-auto px-4 py-32">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background relative">
      <PixelStars />
      <Header />

      <main className="pt-20 sm:pt-24 pb-12 sm:pb-20 px-3 sm:px-4">
        <div className="max-w-6xl mx-auto">
          {/* Кнопка назад */}
          <Link
            href="/account"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm mb-4 sm:mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Назад в личный кабинет
          </Link>

          {/* Заголовок */}
          <div className="bg-card border border-border p-4 sm:p-6 md:p-8 mb-6 sm:mb-10">
            <p className="text-accent text-[9px] tracking-[0.25em] sm:tracking-[0.35em] mb-2">[ ТАРИФЫ ]</p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl text-foreground font-bold mb-2 sm:mb-3">
              Выберите свой план
            </h1>
            <p className="text-muted-foreground text-xs sm:text-sm md:text-base max-w-2xl">
              Гибкие тарифы для любых потребностей. Начните с бесплатного пробного периода.
            </p>
          </div>

          {hasActiveSubscription && (
            <div className="mb-4 sm:mb-6 p-4 bg-primary/10 border-2 border-primary rounded-lg flex flex-wrap items-center justify-between gap-3">
              <p className="text-foreground text-xs sm:text-sm">
                У вас активный тариф. Продлить или посмотреть ключи можно в разделе Ключи.
              </p>
              <Link
                href="/account/keys"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 text-xs sm:text-sm font-semibold hover:bg-primary/90 transition-colors rounded"
              >
                Перейти к ключам
              </Link>
            </div>
          )}

          {message && (
            <Alert className={`mb-4 sm:mb-6 ${message.type === "success" ? "border-2 border-green-500 bg-green-500/10" : "border-2 border-red-500 bg-red-500/10"}`}>
              {message.type === "success" ? (
                <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
              )}
              <AlertDescription className={`text-xs sm:text-sm md:text-base ${message.type === "success" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                {message.text}
              </AlertDescription>
            </Alert>
          )}

          {tariffs.length === 0 ? (
            <div className="bg-card border border-border p-4 sm:p-6 text-center text-muted-foreground text-[10px] sm:text-[11px]">
              Нет доступных тарифов
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {tariffs.map((tariff) => {
                const months = tariffMonths(tariff)
                const nominalPrice = baseMonthlyPrice * months
                const discountPercent = nominalPrice > tariff.price && months > 1
                  ? Math.round(((nominalPrice - tariff.price) / nominalPrice) * 100)
                  : 0

                return (
                  <div
                    key={tariff.id}
                    className={`relative bg-card border ${tariff.id === highlightTariffId ? "border-primary" : "border-border"} p-5 sm:p-6 md:p-8 flex flex-col gap-6`}
                  >
                    {tariff.id === highlightTariffId && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 text-[8px]">
                        ПОПУЛЯРНЫЙ
                      </div>
                    )}

                    {discountPercent > 0 && (
                      <div className="absolute top-3 right-3 bg-primary/15 border border-primary/40 text-primary px-3 py-1 text-[9px] tracking-[0.3em]">
                        -{discountPercent}%
                      </div>
                    )}

                    {/* Сетка тарифов */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      {tariffs.map((tariff, idx) => (
                        <div
                          key={tariff.id}
                          className="relative bg-card/80 border-2 border-green-500 hover:border-green-400 transition-all p-5 sm:p-6 flex flex-col gap-4 shadow-[0_0_20px_rgba(34,197,94,0.15)]"
                        >
                          {idx === 0 && (
                            <span className="absolute -top-4 left-4 bg-green-500 text-slate-900 text-[10px] sm:text-xs font-bold tracking-[0.08em] px-3 py-1">
                              ПОПУЛЯРНЫЙ
                            </span>
                          )}

                          {/* Название и длительность */}
                          <div className="text-center space-y-2">
                            <p className="text-teal-300 text-[11px] sm:text-xs tracking-[0.2em] uppercase">{tariff.name}</p>
                            <p className="text-3xl sm:text-4xl font-bold text-foreground uppercase leading-tight">
                              {formatDuration(tariff.duration_days)}
                            </p>
                          </div>

                          {/* Цена */}
                          <div className="text-center space-y-1">
                            <div className="text-5xl sm:text-6xl font-extrabold text-green-500 leading-none">
                              {tariff.price === 0 ? "0" : tariff.price}
                              <span className="text-3xl sm:text-4xl align-top">₽</span>
                            </div>
                            <div className="text-xs sm:text-sm tracking-[0.25em] text-muted-foreground uppercase">
                              за весь период
                            </div>
                          </div>

                          {/* Особенности */}
                          {tariff.features && (
                            <div className="space-y-2 text-left">
                              <ul className="space-y-2">
                                {(typeof tariff.features === 'string' ? tariff.features.split('\n').filter(Boolean) : tariff.features).map((feature: string, idx: number) => (
                                  <li key={idx} className="flex items-start gap-2 text-sm text-foreground/90 leading-relaxed">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Кнопки */}
                          <div className="mt-auto space-y-2 pt-2">
                            {!user ? (
                              <>
                                {/* Для незарегистрированных пользователей */}
                                <Button
                                  onClick={() => handlePurchaseWithoutRegistration(tariff.id, tariff.name, tariff.price)}
                                  disabled={purchasing === tariff.id}
                                  className="w-full bg-green-500 hover:bg-green-400 text-slate-900 font-black tracking-[0.08em]"
                                  size="lg"
                                >
                                  {purchasing === tariff.id ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <>
                                      <ShoppingCart className="w-4 h-4 mr-2" />
                                      КУПИТЬ БЕЗ РЕГИСТРАЦИИ
                                    </>
                                  )}
                                </Button>

                                <Button
                                  onClick={() => router.push("/register")}
                                  variant="outline"
                                  className="w-full border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-slate-900 hover:border-green-500 transition-colors font-black tracking-[0.08em]"
                                  size="lg"
                                >
                                  <Gift className="w-4 h-4 mr-2" />
                                  ПОПРОБОВАТЬ БЕСПЛАТНО
                                </Button>
                              </>
                            ) : (
                              <>
                                {/* Для зарегистрированных пользователей */}
                                <Button
                                  onClick={() => handlePurchase(tariff.id, tariff.name, tariff.price)}
                                  disabled={purchasing === tariff.id}
                                  className="w-full bg-green-500 hover:bg-green-400 text-slate-900 font-black tracking-[0.08em]"
                                  size="lg"
                                >
                                  {purchasing === tariff.id ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <>
                                      <ShoppingCart className="w-4 h-4 mr-2" />
                                      КУПИТЬ VPN
                                    </>
                                  )}
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
