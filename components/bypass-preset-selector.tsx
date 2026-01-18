"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getBypassPresets, type BypassPreset } from "@/lib/api"
import { Loader2, Shield, Globe, AlertCircle } from "lucide-react"

interface BypassPresetSelectorProps {
    value: string
    onChange: (value: string) => void
    disabled?: boolean
}

export function BypassPresetSelector({ value, onChange, disabled = false }: BypassPresetSelectorProps) {
    const [presets, setPresets] = useState<BypassPreset[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        loadPresets()
    }, [])

    const loadPresets = async () => {
        try {
            const response = await getBypassPresets()
            if (response.data?.presets) {
                setPresets(response.data.presets)
                // Если не выбран preset, выбираем первый (yandex)
                if (!value && response.data.presets.length > 0) {
                    onChange(response.data.presets[0].id)
                }
            } else if (response.error) {
                setError(response.error)
            }
        } catch (err) {
            setError('Не удалось загрузить настройки обхода')
        } finally {
            setLoading(false)
        }
    }

    const getRiskBadge = (risk: string) => {
        const riskConfig: Record<string, { variant: "default" | "outline" | "destructive"; label: string }> = {
            low: { variant: "default", label: "Низкий риск" },
            medium: { variant: "outline", label: "Средний риск" },
        }
        const config = riskConfig[risk] || { variant: "default", label: risk }
        return <Badge variant={config.variant}>{config.label}</Badge>
    }

    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Настройки обхода блокировок
                    </CardTitle>
                    <CardDescription>
                        Выберите оптимальный профиль для вашей локации
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </CardContent>
            </Card>
        )
    }

    if (error) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Настройки обхода блокировок
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Настройки обхода блокировок
                </CardTitle>
                <CardDescription>
                    Выберите оптимальный профиль для вашей локации. Рекомендуем Яндекс для России.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <RadioGroup value={value} onValueChange={onChange} disabled={disabled} className="gap-4">
                    {presets.map((preset) => (
                        <div
                            key={preset.id}
                            className={`flex items-start space-x-3 rounded-lg border p-4 transition-colors ${value === preset.id ? 'border-primary bg-primary/5' : 'border-border'
                                } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-primary/50'}`}
                            onClick={() => !disabled && onChange(preset.id)}
                        >
                            <RadioGroupItem value={preset.id} id={preset.id} disabled={disabled} />
                            <div className="flex-1 space-y-2">
                                <Label
                                    htmlFor={preset.id}
                                    className="flex items-center justify-between cursor-pointer"
                                >
                                    <div className="flex items-center gap-2">
                                        <Globe className="h-4 w-4 text-muted-foreground" />
                                        <span className="font-semibold">{preset.name}</span>
                                    </div>
                                    {getRiskBadge(preset.risk)}
                                </Label>
                                <p className="text-sm text-muted-foreground">{preset.description}</p>
                                <div className="flex gap-3 text-xs text-muted-foreground">
                                    <span>
                                        <span className="font-medium">Отпечаток:</span> {preset.fingerprint}
                                    </span>
                                    <span>
                                        <span className="font-medium">Регион:</span> {preset.region}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </RadioGroup>
            </CardContent>
        </Card>
    )
}
