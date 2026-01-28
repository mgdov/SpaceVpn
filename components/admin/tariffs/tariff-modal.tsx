import type { TariffFormState } from "@/types/admin"

interface TariffModalProps {
    open: boolean
    isEditing: boolean
    form: TariffFormState
    onChange: (form: TariffFormState) => void
    onSubmit: () => void
    onClose: () => void
}

export function TariffModal({ open, isEditing, form, onChange, onSubmit, onClose }: TariffModalProps) {
    if (!open) return null

    const updateField = (key: keyof TariffFormState, value: string) => {
        onChange({ ...form, [key]: value })
    }

    return (
        <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50 p-4">
            <div className="bg-card border border-border p-6 w-full max-w-md">
                <h2 className="text-foreground text-sm mb-4">{isEditing ? "РЕДАКТИРОВАТЬ ТАРИФ" : "ДОБАВИТЬ ТАРИФ"}</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-foreground text-[10px] mb-2">Название</label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => updateField("name", e.target.value)}
                            className="w-full bg-secondary border border-border px-4 py-2 text-foreground text-[10px] focus:outline-none focus:border-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-foreground text-[10px] mb-2">Срок (дней)</label>
                        <p className="text-muted-foreground text-[8px] mb-2">менее 30 дней = в днях, 30-365 = в месяцах, больше 365 = в годах</p>
                        <input
                            type="number"
                            min={1}
                            value={form.durationDays}
                            onChange={(e) => updateField("durationDays", e.target.value)}
                            className="w-full bg-secondary border border-border px-4 py-2 text-foreground text-[10px] focus:outline-none focus:border-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-foreground text-[10px] mb-2">Стоимость (₽)</label>
                        <input
                            type="number"
                            min={0}
                            value={form.price}
                            onChange={(e) => updateField("price", e.target.value)}
                            className="w-full bg-secondary border border-border px-4 py-2 text-foreground text-[10px] focus:outline-none focus:border-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-foreground text-[10px] mb-2">Описание</label>
                        <textarea
                            value={form.description}
                            onChange={(e) => updateField("description", e.target.value)}
                            rows={3}
                            className="w-full bg-secondary border border-border px-4 py-2 text-foreground text-[10px] focus:outline-none focus:border-primary resize-none"
                        />
                    </div>
                    <div className="flex gap-4 pt-4">
                        <button
                            onClick={onClose}
                            className="flex-1 border border-border text-foreground py-2 text-[10px] hover:border-primary"
                        >
                            Отмена
                        </button>
                        <button
                            onClick={onSubmit}
                            className="flex-1 bg-primary text-primary-foreground py-2 text-[10px] hover:bg-primary/80"
                        >
                            {isEditing ? "Сохранить" : "Добавить"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
