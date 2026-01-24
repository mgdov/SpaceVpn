"use client"

import { useState } from "react"
import { Clock, Key, Download, Trash2, RefreshCw } from "lucide-react"
import type { VPNKeyStatus } from "@/lib/api"

interface VPNKeyCardProps {
    keyData: VPNKeyStatus
    onAddToApp: () => void
    onExtend: () => void
    onDelete: () => void
    extending?: boolean
    deleting?: boolean
}

export function VPNKeyCard({ 
    keyData, 
    onAddToApp, 
    onExtend, 
    onDelete,
    extending = false,
    deleting = false,
}: VPNKeyCardProps) {
    const isExpired = keyData.is_expired || keyData.status === 'expired'
    const isActive = keyData.status === 'active' && !isExpired
    
    const formatExpireDate = (dateStr: string | null) => {
        if (!dateStr) return "—"
        const date = new Date(dateStr)
        return date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }) + ', ' + date.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    return (
        <div className="bg-card border-2 border-border p-4 md:p-6 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Key className="w-5 h-5 text-primary" />
                    <span className="text-foreground font-bold">Ключ</span>
                    <span className="px-2 py-1 bg-muted text-muted-foreground text-xs font-mono">
                        {keyData.key_id}
                    </span>
                </div>
                <span className={`px-3 py-1 text-xs font-semibold border-2 ${
                    isActive 
                        ? 'border-green-500 text-green-500 bg-green-500/10' 
                        : 'border-red-500 text-red-500 bg-red-500/10'
                }`}>
                    {isActive ? 'Активен' : 'Истёк'}
                </span>
            </div>

            {/* Expiration */}
            <div className={`flex items-center justify-between p-3 border-2 ${
                isActive ? 'border-orange-500 bg-orange-500/10' : 'border-red-500 bg-red-500/10'
            }`}>
                <div className="flex items-center gap-2">
                    <Clock className={`w-4 h-4 ${isActive ? 'text-orange-500' : 'text-red-500'}`} />
                    <span className="text-sm">
                        Истекает: {formatExpireDate(keyData.expire_date)}
                    </span>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold ${
                    isActive 
                        ? 'bg-orange-500 text-white' 
                        : 'border border-red-500 text-red-500'
                }`}>
                    {keyData.time_remaining || 'Истёк'}
                </span>
            </div>

            {/* Instructions - only for active keys */}
            {isActive && (
                <div className="border-2 border-primary p-4 space-y-2">
                    <p className="text-foreground font-semibold flex items-center gap-2">
                        📋 Инструкция:
                    </p>
                    <ol className="text-muted-foreground text-sm space-y-1 list-decimal list-inside">
                        <li>Установите приложение для VPN нажав на первую кнопку, а затем вернитесь снова на сайт</li>
                        <li>После установки приложения нажмите вторую кнопку «Добавить VPN в приложение»</li>
                    </ol>
                </div>
            )}

            {/* Action Buttons */}
            {isActive ? (
                <div className="space-y-3">
                    <a
                        href="https://apps.apple.com/app/happ-vpn/id6478556657"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-4 bg-green-500 hover:bg-green-600 text-white font-semibold transition-colors"
                    >
                        <Download className="w-5 h-5" />
                        1. Установить приложение для VPN
                    </a>
                    <button
                        onClick={onAddToApp}
                        className="flex items-center justify-center gap-2 w-full py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-colors"
                    >
                        📱 2. Добавить VPN в приложение
                    </button>
                </div>
            ) : (
                <div className="space-y-3">
                    {/* Instructions for expired */}
                    <div className="border-2 border-muted p-4 space-y-2">
                        <p className="text-foreground font-semibold flex items-center gap-2">
                            📋 Инструкция:
                        </p>
                        <ol className="text-muted-foreground text-sm space-y-1 list-decimal list-inside">
                            <li>Установите приложение для VPN нажав на первую кнопку, а затем вернитесь снова на сайт</li>
                            <li>После установки приложения нажмите вторую кнопку «Добавить VPN в приложение»</li>
                        </ol>
                    </div>

                    <button
                        onClick={onExtend}
                        disabled={extending}
                        className="flex items-center justify-center gap-2 w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors disabled:opacity-50"
                    >
                        {extending ? (
                            <>
                                <RefreshCw className="w-5 h-5 animate-spin" />
                                Продление...
                            </>
                        ) : (
                            <>
                                <Clock className="w-5 h-5" />
                                Продлить ключ
                            </>
                        )}
                    </button>
                </div>
            )}

            {/* Delete button */}
            <div className="flex justify-end">
                <button
                    onClick={onDelete}
                    disabled={deleting}
                    className="flex items-center gap-2 text-red-500 hover:text-red-400 text-sm transition-colors disabled:opacity-50"
                >
                    <Trash2 className="w-4 h-4" />
                    {deleting ? 'Удаление...' : 'Удалить'}
                </button>
            </div>
        </div>
    )
}
