import { Edit, RefreshCw, Trash2, Power, Copy, ExternalLink } from "lucide-react"
import type { AdminVPNClient } from "@/lib/api"
import { useState } from "react"

interface KeyTableProps {
    keys: AdminVPNClient[]
    onEdit: (key: AdminVPNClient) => void
    onExtend: (id: number) => void
    onDelete: (id: number) => void
    onToggle: (id: number) => void
}

const formatDate = (value?: string | null) => {
    if (!value) return "—"
    return new Date(value).toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    })
}

const formatTraffic = (usedGb: number, limitGb: number) => {
    if (limitGb === 0) {
        return `${usedGb.toFixed(1)} ГБ / ∞`
    }
    return `${usedGb.toFixed(1)} / ${limitGb.toFixed(0)} ГБ`
}

const getStatusBadge = (status: string, isExpired: boolean) => {
    if (isExpired) {
        return <span className="text-[8px] px-2 py-1 bg-red-500/20 text-red-400">Истёк</span>
    }
    
    switch (status.toLowerCase()) {
        case "active":
            return <span className="text-[8px] px-2 py-1 bg-primary/20 text-primary">Активен</span>
        case "disabled":
            return <span className="text-[8px] px-2 py-1 bg-orange-500/20 text-orange-400">Отключён</span>
        case "expired":
            return <span className="text-[8px] px-2 py-1 bg-red-500/20 text-red-400">Истёк</span>
        default:
            return <span className="text-[8px] px-2 py-1 bg-muted text-muted-foreground">{status}</span>
    }
}

export function KeyTable({ keys, onEdit, onExtend, onDelete, onToggle }: KeyTableProps) {
    const [copiedId, setCopiedId] = useState<number | null>(null)
    
    const handleCopy = async (text: string, id: number) => {
        await navigator.clipboard.writeText(text)
        setCopiedId(id)
        setTimeout(() => setCopiedId(null), 2000)
    }
    
    if (keys.length === 0) {
        return (
            <div className="bg-card border border-border p-8 text-center">
                <p className="text-muted-foreground text-sm">Нет VPN ключей</p>
            </div>
        )
    }
    
    return (
        <div className="bg-card border border-border overflow-x-auto">
            <table className="w-full min-w-[900px]">
                <thead className="bg-secondary">
                    <tr>
                        <th className="px-3 py-3 text-left text-[8px] text-muted-foreground whitespace-nowrap">ID</th>
                        <th className="px-3 py-3 text-left text-[8px] text-muted-foreground whitespace-nowrap">ПОЛЬЗОВАТЕЛЬ</th>
                        <th className="px-3 py-3 text-left text-[8px] text-muted-foreground whitespace-nowrap">MARZBAN ID</th>
                        <th className="px-3 py-3 text-left text-[8px] text-muted-foreground whitespace-nowrap">УСТРОЙСТВО</th>
                        <th className="px-3 py-3 text-left text-[8px] text-muted-foreground whitespace-nowrap">ИСТЕКАЕТ</th>
                        <th className="px-3 py-3 text-left text-[8px] text-muted-foreground whitespace-nowrap">ТРАФИК</th>
                        <th className="px-3 py-3 text-left text-[8px] text-muted-foreground whitespace-nowrap">СТАТУС</th>
                        <th className="px-3 py-3 text-left text-[8px] text-muted-foreground whitespace-nowrap">ДЕЙСТВИЯ</th>
                    </tr>
                </thead>
                <tbody>
                    {keys.map((key) => (
                        <tr key={key.id} className="border-t border-border hover:bg-secondary/50">
                            <td className="px-3 py-3 text-[9px] text-muted-foreground">#{key.id}</td>
                            <td className="px-3 py-3">
                                {key.user ? (
                                    <div>
                                        <div className="text-[9px] text-foreground">{key.user.username}</div>
                                        <div className="text-[8px] text-muted-foreground">{key.user.email || "—"}</div>
                                    </div>
                                ) : (
                                    <span className="text-[9px] text-muted-foreground italic">Без регистрации</span>
                                )}
                            </td>
                            <td className="px-3 py-3">
                                <div className="flex items-center gap-1">
                                    <code className="text-[8px] text-primary font-mono truncate max-w-[100px]" title={key.marzban_username}>
                                        {key.marzban_username || key.client_uuid.slice(0, 8)}
                                    </code>
                                    {key.subscription_url && (
                                        <button
                                            onClick={() => handleCopy(key.subscription_url!, key.id)}
                                            className="text-muted-foreground hover:text-primary"
                                            title="Копировать VLESS"
                                        >
                                            {copiedId === key.id ? (
                                                <span className="text-[8px] text-green-500">✓</span>
                                            ) : (
                                                <Copy size={12} />
                                            )}
                                        </button>
                                    )}
                                </div>
                            </td>
                            <td className="px-3 py-3 text-[9px] text-foreground">{key.name || key.device_info || "—"}</td>
                            <td className="px-3 py-3">
                                <div>
                                    <div className={`text-[9px] ${key.is_expired ? 'text-red-400' : 'text-foreground'}`}>
                                        {formatDate(key.expire_date)}
                                    </div>
                                    {key.time_remaining && (
                                        <div className={`text-[8px] ${key.is_expired ? 'text-red-400' : 'text-muted-foreground'}`}>
                                            {key.time_remaining}
                                        </div>
                                    )}
                                </div>
                            </td>
                            <td className="px-3 py-3 text-[9px] text-foreground">
                                {formatTraffic(key.traffic_used_gb, key.traffic_limit_gb)}
                            </td>
                            <td className="px-3 py-3">
                                {getStatusBadge(key.status, key.is_expired)}
                            </td>
                            <td className="px-3 py-3">
                                <div className="flex items-center gap-1">
                                    <button 
                                        onClick={() => onToggle(key.id)} 
                                        className={`p-1 rounded ${key.status === 'active' ? 'text-green-500 hover:bg-green-500/10' : 'text-muted-foreground hover:bg-muted'}`}
                                        title={key.status === 'active' ? 'Отключить' : 'Включить'}
                                    >
                                        <Power size={14} />
                                    </button>
                                    <button
                                        onClick={() => onExtend(key.id)}
                                        className="p-1 rounded text-muted-foreground hover:text-accent hover:bg-accent/10"
                                        title="Продлить на 30 дней"
                                    >
                                        <RefreshCw size={14} />
                                    </button>
                                    <button 
                                        onClick={() => onEdit(key)} 
                                        className="p-1 rounded text-muted-foreground hover:text-primary hover:bg-primary/10" 
                                        title="Редактировать"
                                    >
                                        <Edit size={14} />
                                    </button>
                                    <button
                                        onClick={() => onDelete(key.id)}
                                        className="p-1 rounded text-muted-foreground hover:text-red-400 hover:bg-red-400/10"
                                        title="Удалить"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {/* Summary */}
            <div className="border-t border-border px-4 py-2 bg-secondary/50 flex items-center justify-between">
                <span className="text-[9px] text-muted-foreground">
                    Всего ключей: {keys.length}
                </span>
                <span className="text-[9px] text-muted-foreground">
                    Активных: {keys.filter(k => k.status === 'active' && !k.is_expired).length} | 
                    Истекших: {keys.filter(k => k.is_expired).length}
                </span>
            </div>
        </div>
    )
}
