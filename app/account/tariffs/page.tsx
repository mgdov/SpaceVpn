"use client"

import { useEffect, useState } from "react"
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
    void loadTariffs()
    void loadMySubscriptions()
  }, [])

  const loadMySubscriptions = async () => {
    const res = await getMySubscriptions()
    const active = res.data?.subscriptions?.some((s: { status: string }) => s.status === "active") ?? false
    setHasActiveSubscription(active)
  }

  const loadTariffs = async () => {
    setLoading(true)
    try {
      const response = await getPublicTariffs()
      if (response.data?.length) {
        setTariffs(response.data.filter((tariff) => tariff.is_active))
      }
    } finally {
      setLoading(false)
    }
  }

  const handlePurchase = async (tariffId: number, tariffName: string, tariffPrice: number) => {
    if (hasActiveSubscription) {
      router.push("/account/keys")
      return
    }

    if (tariffPrice === 0) {
      setSelectedTariff(tariffs.find((t) => t.id === tariffId) || null)
      setShowPresetDialog(true)
      return
    }

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

      setMessage({ type: "error", text: response.error || "Не удалось инициировать оплату" })
    } catch (error) {
      setMessage({ type: "error", text: "Ошибка подключения к YooKassa" })
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

    setMessage(null)
    setPurchasing(selectedTariff.id)
    setShowPresetDialog(false)

    try {
      const response = await purchaseFreeTariff({
        tariff_id: selectedTariff.id,
        bypass_preset: bypassPreset,
      })

      if (response.data) {
        setMessage({ type: "success", text: response.data.message })
        setTimeout(() => router.push("/account/keys"), 2000)
      } else {
        setMessage({ type: "error", text: response.error || "Ошибка активации тарифа" })
      }
    } catch (error) {
      setMessage({ type: "error", text: "Произошла ошибка. Попробуйте позже." })
    } finally {
      setPurchasing(null)
      setSelectedTariff(null)
    }
  }

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
          <Link
            href="/account"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm mb-4 sm:mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Назад в личный кабинет
          </Link>

          <div className="bg-card border border-border p-4 sm:p-6 md:p-8 mb-6 sm:mb-10">
            <p className="text-accent text-[9px] tracking-[0.25em] sm:tracking-[0.35em] mb-2">[ ТАРИФЫ ]</p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl text-foreground font-bold mb-2 sm:mb-3">Выберите свой план</h1>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {tariffs.map((tariff, idx) => (
                <div
                  key={tariff.id}
                  className="relative bg-card border border-[#2BD05E] p-6 sm:p-7 flex flex-col gap-5"
                >
                  {idx === 0 && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#2BD05E] text-slate-900 text-[11px] sm:text-xs font-bold tracking-[0.08em] px-4 py-1 uppercase">
                      ПОПУЛЯРНЫЙ
                    </span>
                  )}

                  <div className="text-center space-y-3">
                    <p className="text-[#31D4C2] text-[11px] sm:text-xs tracking-[0.22em] uppercase">{tariff.name}</p>
                    <p className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
                      {formatDuration(tariff.duration_days)}
                    </p>
                    <div className="text-5xl sm:text-6xl font-black text-[#2BD05E] leading-none">
                      {tariff.price === 0 ? "0" : tariff.price}
                      <span className="text-3xl sm:text-4xl align-top">₽</span>
                    </div>
                    <div className="text-xs sm:text-sm tracking-[0.28em] text-muted-foreground uppercase">за весь период</div>
                  </div>

                  {tariff.features && (
                    <div className="space-y-2 text-left text-[15px] sm:text-base text-[#C5C5C5] leading-relaxed">
                      {(typeof tariff.features === "string" ? tariff.features.split("\n").filter(Boolean) : tariff.features).map((feature: string, featureIdx: number) => (
                        <div key={featureIdx} className="flex gap-2">
                          <span className="text-[#2BD05E]">•</span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-auto space-y-3 pt-1">
                    <Button
                      onClick={() => handlePurchase(tariff.id, tariff.name, tariff.price)}
                      disabled={purchasing === tariff.id}
                      className="w-full bg-[#2BD05E] hover:bg-[#24b851] text-slate-900 font-black tracking-[0.12em] uppercase border border-[#2BD05E]"
                      size="lg"
                    >
                      {purchasing === tariff.id ? <Loader2 className="w-4 h-4 animate-spin" /> : 'КУПИТЬ VPN'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Dialog open={showPresetDialog} onOpenChange={setShowPresetDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Выберите обход</DialogTitle>
            <DialogDescription>Этот параметр нужен для подключения к бесплатному тарифу.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <BypassPresetSelector value={bypassPreset} onChange={setBypassPreset} />
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowPresetDialog(false)}>
              Отмена
            </Button>
            <Button onClick={confirmPurchase} disabled={!selectedTariff || purchasing === selectedTariff?.id}>
              {purchasing === selectedTariff?.id ? <Loader2 className="w-4 h-4 animate-spin" /> : "Подтвердить"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
