"use client"

import { useEffect, useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { getPublicTariffs, purchaseFreeTariff, createYookassaPayment, type Tariff } from "@/lib/api"
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

  useEffect(() => {
    loadTariffs()
  }, [])

  const loadTariffs = async () => {
    setLoading(true)

    const response = await getPublicTariffs()
    if (response.data?.length) {
      setTariffs(response.data.filter((tariff) => tariff.is_active))
    }
    setLoading(false)
  }

  const handlePurchase = async (tariffId: number, tariffName: string, tariffPrice: number) => {
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

  const baseMonthlyPrice = useMemo(() => {
    if (!tariffs.length) return 0
    const perMonthPrices = tariffs.map((tariff) => {
      const months = tariff.duration_months === 0 ? 1 : Math.max(1, tariff.duration_months)
      return tariff.price / months
    })
    return Math.min(...perMonthPrices)
  }, [tariffs])

  const highlightTariffId = useMemo(() => {
    if (!tariffs.length) return null
    return tariffs.reduce((best, current) => {
      const currentMonths = current.duration_months === 0 ? 1 : Math.max(1, current.duration_months)
      const bestMonths = best.duration_months === 0 ? 1 : Math.max(1, best.duration_months)
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
                const months = Math.max(1, tariff.duration_months)
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

                    <div className="text-center space-y-4">
                      <p className="text-accent text-[9px] tracking-[0.35em]"># {tariff.name}</p>
                      <h3 className="text-foreground text-base">{formatDuration(tariff.duration_months * 30)}</h3>
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex items-baseline justify-center gap-2">
                          <span className="text-primary text-3xl">{tariff.price}</span>
                          <span className="text-muted-foreground text-[12px]">₽</span>
                        </div>
                        <span className="text-muted-foreground text-[9px] uppercase tracking-[0.25em]">за весь период</span>
                      </div>
                    </div>

                    <p className="flex-1 text-muted-foreground text-[11px] leading-relaxed">
                      {tariff.description || "Стабильный туннель и поддержка 24/7"}
                    </p>

                    <button
                      onClick={() => handlePurchase(tariff.id, tariff.name, tariff.price)}
                      disabled={purchasing !== null}
                      className={`w-full flex items-center justify-center py-3 md:py-4 px-2 md:px-3 text-[9px] md:text-[10px] tracking-[0.1em] md:tracking-[0.12em] transition-colors ${tariff.id === highlightTariffId
                        ? "bg-primary text-primary-foreground hover:bg-primary/80"
                        : "border border-border text-foreground hover:border-primary hover:text-primary"
                        } ${purchasing !== null ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {purchasing === tariff.id ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="h-5 w-5 animate-spin" />
                          {tariff.price === 0 ? "АКТИВАЦИЯ..." : "ПОДГОТОВКА..."}
                        </span>
                      ) : tariff.price === 0 ? (
                        "ПОПРОБОВАТЬ БЕСПЛАТНО"
                      ) : (
                        "КУПИТЬ VPN"
                      )}
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Bypass Preset Selection Dialog */}
      <Dialog open={showPresetDialog} onOpenChange={setShowPresetDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Настройка VPN подключения</DialogTitle>
            <DialogDescription>
              Выберите оптимальные настройки обхода блокировок для вашего региона
            </DialogDescription>
          </DialogHeader>

          <BypassPresetSelector
            value={bypassPreset}
            onChange={setBypassPreset}
            disabled={purchasing !== null}
          />

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowPresetDialog(false)}
              disabled={purchasing !== null}
            >
              Отмена
            </Button>
            <Button
              onClick={confirmPurchase}
              disabled={purchasing !== null}
            >
              {purchasing !== null ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Активация...
                </>
              ) : (
                "Активировать тариф"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
