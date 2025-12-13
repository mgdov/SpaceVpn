import { Edit, RefreshCw, Trash2 } from "lucide-react"
import type { VPNKey } from "@/types/admin"

interface KeyTableProps {
    keys: VPNKey[]
    onEdit: (key: VPNKey) => void
    onExtend: (id: string) => void
    onDelete: (id: string) => void
}

export function KeyTable({ keys, onEdit, onExtend, onDelete }: KeyTableProps) {
    return (
        <div className="bg-card border border-border overflow-hidden">
            <table className="w-full">
                <thead className="bg-secondary">
                    <tr>
                        <th className="px-4 py-3 text-left text-[8px] text-muted-foreground">КЛЮЧ</th>
                        <th className="px-4 py-3 text-left text-[8px] text-muted-foreground">ПОЛЬЗОВАТЕЛЬ</th>
                        <th className="px-4 py-3 text-left text-[8px] text-muted-foreground">ТАРИФ</th>
                        <th className="px-4 py-3 text-left text-[8px] text-muted-foreground">ИСТЕКАЕТ</th>
                        <th className="px-4 py-3 text-left text-[8px] text-muted-foreground">СТАТУС</th>
                        <th className="px-4 py-3 text-left text-[8px] text-muted-foreground">ДЕЙСТВИЯ</th>
                    </tr>
                </thead>
                <tbody>
                    {keys.map((key) => (
                        <tr key={key.id} className="border-t border-border">
                            <td className="px-4 py-3 text-[9px] text-foreground font-mono">{key.key}</td>
                            <td className="px-4 py-3 text-[9px] text-muted-foreground">{key.user}</td>
                            <td className="px-4 py-3 text-[9px] text-foreground">{key.plan}</td>
                            <td className="px-4 py-3 text-[9px] text-muted-foreground">{key.expiresAt}</td>
                            <td className="px-4 py-3">
                                <span
                                    className={`text-[8px] px-2 py-1 ${key.status === "active"
                                            ? "bg-primary/20 text-primary"
                                            : key.status === "expired"
                                                ? "bg-red-500/20 text-red-400"
                                                : "bg-yellow-500/20 text-yellow-400"
                                        }`}
                                >
                                    {key.status === "active" ? "Активен" : key.status === "expired" ? "Истек" : "Ожидание"}
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
