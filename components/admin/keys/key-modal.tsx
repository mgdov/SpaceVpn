import type { KeyFormState, Tariff } from "@/types/admin"

interface KeyModalProps {
    open: boolean
    isEditing: boolean
    form: KeyFormState
    tariffs: Tariff[]
    onChange: (form: KeyFormState) => void
    onSubmit: () => void
    onClose: () => void
}

export function KeyModal({ open, isEditing, form, tariffs, onChange, onSubmit, onClose }: KeyModalProps) {
    if (!open) return null

    const updateField = (key: keyof KeyFormState, value: string) => {
        onChange({ ...form, [key]: value })
    }

    return (
        <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50 p-4">
            <div className="bg-card border border-border p-6 w-full max-w-md">
                <h2 className="text-foreground text-sm mb-4">{isEditing ? "РЕДАКТИРОВАТЬ КЛЮЧ" : "СОЗДАТЬ КЛЮЧ"}</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-foreground text-[10px] mb-2">Email пользователя</label>
                        <input
                            type="email"
                            value={form.user}
                            onChange={(e) => updateField("user", e.target.value)}
                            className="w-full bg-secondary border border-border px-4 py-2 text-foreground text-[10px] focus:outline-none focus:border-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-foreground text-[10px] mb-2">Тариф</label>
                        <select
                            value={form.plan}
                            onChange={(e) => updateField("plan", e.target.value)}
                            disabled={!tariffs.length}
                            className="w-full bg-secondary border border-border px-4 py-2 text-foreground text-[10px] focus:outline-none focus:border-primary disabled:opacity-50"
                        >
                            {tariffs.length ? (
                                tariffs.map((tariff) => (
                                    <option key={tariff.id} value={tariff.name}>
                                        {tariff.name} - {tariff.price} ₽
                                    </option>
                                ))
                            ) : (
                                <option value="">Нет тарифов</option>
                            )}
                        </select>
                    </div>
                    <div>
                        <label className="block text-foreground text-[10px] mb-2">Дата истечения</label>
                        <input
                            type="date"
                            value={form.expiresAt}
                            onChange={(e) => updateField("expiresAt", e.target.value)}
                            className="w-full bg-secondary border border-border px-4 py-2 text-foreground text-[10px] focus:outline-none focus:border-primary"
                        />
                    </div>
                    <div className="flex gap-4 pt-4">
                        <button onClick={onClose} className="flex-1 border border-border text-foreground py-2 text-[10px] hover:border-primary">
                            Отмена
                        </button>
                        <button onClick={onSubmit} className="flex-1 bg-primary text-primary-foreground py-2 text-[10px] hover:bg-primary/80">
                            {isEditing ? "Сохранить" : "Создать"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
