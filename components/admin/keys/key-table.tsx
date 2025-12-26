import { Edit, RefreshCw, Trash2, Power } from "lucide-react"
import type { AdminVPNClient } from "@/lib/api"

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
    })
}

export function KeyTable({ keys, onEdit, onExtend, onDelete, onToggle }: KeyTableProps) {
    return (
        <div className="bg-card border border-border overflow-hidden">
            <table className="w-full">
                <thead className="bg-secondary">
                    <tr>
                        <th className="px-4 py-3 text-left text-[8px] text-muted-foreground">UUID</th>
                        <th className="px-4 py-3 text-left text-[8px] text-muted-foreground">ПОЛЬЗОВАТЕЛЬ</th>
                        <th className="px-4 py-3 text-left text-[8px] text-muted-foreground">УСТРОЙСТВО</th>
                        <th className="px-4 py-3 text-left text-[8px] text-muted-foreground">ИСТЕКАЕТ</th>
                        <th className="px-4 py-3 text-left text-[8px] text-muted-foreground">ТРАФИК</th>
                        <th className="px-4 py-3 text-left text-[8px] text-muted-foreground">СТАТУС</th>
                        <th className="px-4 py-3 text-left text-[8px] text-muted-foreground">ДЕЙСТВИЯ</th>
                    </tr>
                </thead>
                <tbody>
                    {keys.map((key) => (
                        <tr key={key.id} className="border-t border-border">
                            <td className="px-4 py-3 text-[9px] text-foreground font-mono">{key.client_uuid}</td>
                            <td className="px-4 py-3 text-[9px] text-muted-foreground">{key.user?.email || "—"}</td>
                            <td className="px-4 py-3 text-[9px] text-foreground">{key.name || key.device_info || "—"}</td>
                            <td className="px-4 py-3 text-[9px] text-muted-foreground">—</td>
                            <td className="px-4 py-3 text-[9px] text-foreground">—</td>
                            <td className="px-4 py-3">
                                <span className="text-[8px] px-2 py-1 bg-primary/20 text-primary">
                                    Активен
                                </span>
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                    <button onClick={() => onEdit(key)} className="text-muted-foreground hover:text-primary" title="Редактировать">
                                        <Edit size={14} />
                                    </button>
                                    <button
                                        onClick={() => onExtend(key.id)}
                                        className="text-muted-foreground hover:text-accent"
                                        title="Продлить на месяц"
                                    >
                                        <RefreshCw size={14} />
                                    </button>
                                    <button
                                        onClick={() => onDelete(key.id)}
                                        className="text-muted-foreground hover:text-red-400"
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
        </div>
    )
}
