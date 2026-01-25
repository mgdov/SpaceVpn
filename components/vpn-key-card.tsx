"use client"

import { Clock, Key, Download, Trash2, RefreshCw, Smartphone } from "lucide-react"
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
  const expiresAt = keyData.expire_date || keyData.expires_at || null
  const isExpired =
    keyData.is_expired ||
    keyData.status === 'expired' ||
    (expiresAt ? new Date(expiresAt).getTime() < Date.now() : false)
  const isActive = keyData.status === 'active' && !isExpired

  const formatExpireDate = (dateStr: string | null) => {
    if (!dateStr) return "—"
    const date = new Date(dateStr)
    return (
      date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' }) +
      ', ' +
      date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    )
  }

  return (
    <div className="bg-[#0F1A2E] border border-[#1f2c45] rounded-xl p-5 md:p-6 space-y-4 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-white">
          <div className="w-10 h-10 rounded-full bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Key className="w-5 h-5" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-lg font-extrabold">Ключ</span>
              {keyData.key_id && (
                <span className="px-3 py-1 rounded-md bg-[#1f3f72] text-[#8cb6ff] font-mono text-sm border border-[#2f5fa8]">
                  {keyData.key_id}
                </span>
              )}
            </div>
            <span className="text-sm text-slate-300/90">VLESS</span>
          </div>
        </div>
        <span className={`px-4 py-2 text-sm font-semibold rounded-full border ${isActive
          ? 'bg-emerald-900/60 border-emerald-600 text-emerald-200'
          : 'bg-red-900/40 border-red-600 text-red-200'
          }`}>
          {isActive ? 'Активен' : 'Истёк'}
        </span>
      </div>

      {/* Expiration */}
      <div className="flex items-center justify-between rounded-lg border border-[#b1582f] bg-gradient-to-r from-[#4a1e16] to-[#5c2b1d] px-4 py-3 text-white shadow-inner">
        <div className="flex items-center gap-2 text-orange-200">
          <span className="text-lg">🧭</span>
          <span className="font-semibold">Истекает:</span>
          <span className="font-bold">{formatExpireDate(expiresAt)}</span>
        </div>
        <span className="px-3 py-1 rounded-md bg-[#a44a2f] text-white font-bold text-sm">
          {keyData.time_remaining || 'Истёк'}
        </span>
      </div>

      {/* Instruction */}
      <div className="border border-[#4e3a8a] bg-gradient-to-r from-[#221743] to-[#2b1f52] rounded-xl p-4 space-y-3 text-white">
        <div className="flex items-center gap-2 text-lg font-bold">
          <Smartphone className="w-5 h-5 text-purple-200" />
          Инструкция:
        </div>
        <ol className="text-sm text-[#d6d2f5] space-y-2 list-decimal list-inside">
          <li>Установите приложение для VPN нажав на первую кнопку, а затем вернитесь снова на сайт</li>
          <li>После установки приложения нажмите вторую кнопку «Добавить VPN в приложение»</li>
        </ol>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <a
          href="https://apps.apple.com/app/happ-vpn/id6478556657"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full py-4 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-extrabold text-lg tracking-tight shadow-[0_10px_30px_rgba(16,185,129,0.3)] transition-colors"
        >
          <span className="text-lg">1.</span>
          <Download className="w-5 h-5" />
          Установить приложение для VPN
        </a>

        <button
          onClick={onAddToApp}
          disabled={!isActive}
          className="flex items-center justify-center gap-3 w-full py-4 rounded-lg bg-gradient-to-r from-[#6a3af7] to-[#7f4cff] hover:from-[#7f4cff] hover:to-[#9b6bff] text-white font-extrabold text-lg tracking-tight shadow-[0_10px_30px_rgba(122,67,255,0.35)] transition-colors disabled:opacity-50"
        >
          <span className="text-lg">2.</span>
          <Smartphone className="w-5 h-5" />
          Добавить VPN в приложение
        </button>
      </div>

      {/* Delete / Extend */}
      <div className="flex items-center justify-between pt-1">
        <div className="text-sm text-slate-300" />
        <div className="flex gap-3">
          {!isActive && onExtend && (
            <button
              onClick={onExtend}
              disabled={extending}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-orange-600 hover:bg-orange-500 text-white text-sm font-semibold transition-colors disabled:opacity-50"
            >
              {extending ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Clock className="w-4 h-4" />}
              {extending ? 'Продление...' : 'Продлить'}
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              disabled={deleting}
              className="flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 text-sm font-semibold transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" />
              {deleting ? 'Удаление...' : 'Удалить'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
