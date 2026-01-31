import { Edit, Trash2, Power } from "lucide-react"
import type { Tariff } from "@/lib/api"
import { formatDuration } from "@/lib/utils/tariffs"

interface TariffTableProps {
    tariffs: Tariff[]
    onEdit: (tariff: Tariff) => void
    onDelete: (id: number) => void
    onToggle: (id: number) => void
}

export function TariffTable({ tariffs, onEdit, onDelete, onToggle }: TariffTableProps) {
    if (!tariffs.length) {
        return (
            <div className="bg-card border border-border overflow-hidden">
                <div className="px-4 py-6 text-center text-[9px] text-muted-foreground">
                    Тарифы отсутствуют. Добавьте первый тариф, чтобы выдавать ключи.
                </div>
            </div>
        )
    }

    return (
        <div className="bg-card border border-border overflow-hidden">
            <table className="w-full">
                <thead className="bg-secondary">
                    <tr>
                        <th className="px-4 py-3 text-left text-[8px] text-muted-foreground">НАЗВАНИЕ</th>
                        <th className="px-4 py-3 text-left text-[8px] text-muted-foreground">СРОК</th>
                        <th className="px-4 py-3 text-left text-[8px] text-muted-foreground">СТОИМОСТЬ</th>
                        <th className="px-4 py-3 text-left text-[8px] text-muted-foreground">СТАТУС</th>
                        <th className="px-4 py-3 text-left text-[8px] text-muted-foreground">ДЕЙСТВИЯ</th>
                    </tr>
                </thead>
                <tbody>
                    {tariffs.map((tariff) => (
                        <tr key={tariff.id} className="border-t border-border">
                            <td className="px-4 py-3 text-[9px] text-foreground">
                                <div>{tariff.name}</div>
                                <p className="text-muted-foreground text-[8px] mt-1">{tariff.description || "—"}</p>
                            </td>
                            <td className="px-4 py-3 text-[9px] text-muted-foreground">{formatDuration(tariff.duration_days ?? (tariff.duration_months != null ? tariff.duration_months * 30 : 0))}</td>
                            <td className="px-4 py-3 text-[9px] text-primary">{tariff.price} ₽</td>
                            <td className="px-4 py-3 text-[9px] text-foreground">
                                <span className={`text-[8px] px-2 py-1 ${tariff.is_active ? "bg-primary/20 text-primary" : "bg-border text-muted-foreground"}`}>
                                    {tariff.is_active ? "Активен" : "Выключен"}
                                </span>
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                    <button onClick={() => onEdit(tariff)} className="text-muted-foreground hover:text-primary">
                                        <Edit size={14} />
                                    </button>
                                    <button onClick={() => onToggle(tariff.id)} className="text-muted-foreground hover:text-accent">
                                        <Power size={14} />
                                    </button>
                                    <button onClick={() => onDelete(tariff.id)} className="text-muted-foreground hover:text-red-400">
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
