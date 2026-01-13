"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getPublicTariffs, purchaseFreeTariff, type Tariff } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"

export default function TariffsPage() {
  const router = useRouter()
  const [tariffs, setTariffs] = useState<Tariff[]>([])
  const [loading, setLoading] = useState(true)
  const [purchasing, setPurchasing] = useState<number | null>(null)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

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
    // Clear previous messages
    setMessage(null)
    setPurchasing(tariffId)

    try {
      // Если тариф бесплатный, активируем сразу
      if (tariffPrice === 0) {
        const response = await purchaseFreeTariff({
          tariff_id: tariffId,
          bypass_preset: "chrome",
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
      } else {
        // Платные тарифы временно недоступны (до интеграции YooKassa)
        setMessage({
          type: "error",
          text: "Платные тарифы временно недоступны. Используйте бесплатный тариф.",
        })
        setPurchasing(null)
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Произошла ошибка. Попробуйте позже.",
      })
      setPurchasing(null)
    }
  }

  const formatDuration = (months: number) => {
    if (months === 0) return "1 день"
    if (months === 1) return "1 месяц"
    if (months < 12) return `${months} месяца`
    return `${months / 12} год`
  }

  const formatDataLimit = (gb: number) => {
    if (gb === 0) return "Безлимитный"
    if (gb < 1000) return `${gb} ГБ`
    return `${gb / 1000} ТБ`
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-100">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Тарифы</h1>
        <p className="text-muted-foreground">
          Выберите подходящий тариф для вашего VPN подключения
        </p>
      </div>

      {message && (
        <Alert className={`mb-6 ${message.type === "success" ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"}`}>
          {message.type === "success" ? (
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          ) : (
            <XCircle className="h-4 w-4 text-red-600" />
          )}
          <AlertDescription className={message.type === "success" ? "text-green-800" : "text-red-800"}>
            {message.text}
          </AlertDescription>
        </Alert>
      )}

      {tariffs.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            <p>Нет доступных тарифов</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tariffs.map((tariff) => (
            <Card key={tariff.id} className={tariff.is_featured ? "border-primary shadow-lg" : ""}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-1">{tariff.name}</CardTitle>
                    {tariff.tagline && (
                      <p className="text-xs text-muted-foreground">{tariff.tagline}</p>
                    )}
                  </div>
                  {tariff.is_featured && (
                    <Badge variant="default" className="text-xs">
                      Популярный
                    </Badge>
                  )}
                </div>
                {tariff.description && (
                  <CardDescription className="mt-2">{tariff.description}</CardDescription>
                )}
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <div className="text-center py-4 border-y">
                    <div className="text-4xl font-bold">
                      {tariff.price === 0 ? (
                        <span className="text-green-600">Бесплатно</span>
                      ) : (
                        <>
                          {tariff.price}
                          <span className="text-lg text-muted-foreground ml-1">₽</span>
                        </>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {formatDuration(tariff.duration_months)}
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Трафик:</span>
                      <span className="font-medium">{formatDataLimit(tariff.data_limit_gb)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Устройств:</span>
                      <span className="font-medium">{tariff.devices_count}</span>
                    </div>
                  </div>

                  {tariff.features && (
                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground whitespace-pre-wrap">
                        {tariff.features}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => handlePurchase(tariff.id, tariff.name, tariff.price)}
                  disabled={purchasing !== null}
                  variant={tariff.price === 0 ? "outline" : "default"}
                >
                  {purchasing === tariff.id ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {tariff.price === 0 ? "Активация..." : "Подготовка оплаты..."}
                    </>
                  ) : tariff.price === 0 ? (
                    "Активировать"
                  ) : (
                    "Купить"
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
