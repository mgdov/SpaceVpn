import type { KeyFormState } from "@/types/admin"
import type { User } from "@/lib/api"

interface KeyModalProps {
    open: boolean
    isEditing: boolean
    form: KeyFormState
    users: User[]
    onChange: (form: KeyFormState) => void
    onSubmit: () => void
    onClose: () => void
}

export function KeyModal({ open, isEditing, form, users, onChange, onSubmit, onClose }: KeyModalProps) {
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
                        <label className="block text-foreground text-[10px] mb-2">Пользователь</label>
                        <select
                            value={form.userId}
                            onChange={(e) => updateField("userId", e.target.value)}
                            className="w-full bg-secondary border border-border px-4 py-2 text-foreground text-[10px] focus:outline-none focus:border-primary"
                        >
                            <option value="">Без пользователя (анонимный ключ)</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.username} ({user.email || "без email"})
                                </option>
                            ))}
                        </select>
                        <p className="text-[8px] text-muted-foreground mt-1">
                            Оставьте пустым для создания анонимного ключа
                        </p>
                    </div>
                    <div>
                        <label className="block text-foreground text-[10px] mb-2">Название устройства</label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => updateField("name", e.target.value)}
                            placeholder="iPhone, MacBook и т.д."
                            className="w-full bg-secondary border border-border px-4 py-2 text-foreground text-[10px] focus:outline-none focus:border-primary"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-foreground text-[10px] mb-2">Срок (дней)</label>
                            <input
                                type="number"
                                value={form.expiryDays || "30"}
                                onChange={(e) => updateField("expiryDays", e.target.value)}
                                min="1"
                                max="365"
                                className="w-full bg-secondary border border-border px-4 py-2 text-foreground text-[10px] focus:outline-none focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-foreground text-[10px] mb-2">Лимит трафика (ГБ)</label>
                            <input
                                type="number"
                                value={form.dataLimitGb || "0"}
                                onChange={(e) => updateField("dataLimitGb", e.target.value)}
                                min="0"
                                placeholder="0 = безлимит"
                                className="w-full bg-secondary border border-border px-4 py-2 text-foreground text-[10px] focus:outline-none focus:border-primary"
                            />
                            <p className="text-[8px] text-muted-foreground mt-1">0 = безлимит</p>
                        </div>
                    </div>
                    <div>
                        <label className="block text-foreground text-[10px] mb-2">Описание</label>
                        <textarea
                            value={form.deviceInfo}
                            onChange={(e) => updateField("deviceInfo", e.target.value)}
                            rows={2}
                            placeholder="Дополнительная информация"
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
