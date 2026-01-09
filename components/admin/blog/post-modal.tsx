import { useRef, useState } from "react"
import type { PostFormState } from "@/types/admin"
import { Upload, Type, Heading1, FileText } from "lucide-react"

interface PostModalProps {
    open: boolean
    isEditing: boolean
    form: PostFormState
    onChange: (form: PostFormState) => void
    onSubmit: () => void
    onClose: () => void
}

export function PostModal({ open, isEditing, form, onChange, onSubmit, onClose }: PostModalProps) {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [imagePreview, setImagePreview] = useState<string>(form.image || "")

    if (!open) return null

    const updateField = (key: keyof PostFormState, value: string) => {
        onChange({ ...form, [key]: value })
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const base64 = reader.result as string
                setImagePreview(base64)
                updateField("image", base64)
            }
            reader.readAsDataURL(file)
        }
    }

    const insertStyle = (openTag: string, closeTag: string, placeholder: string = "") => {
        const textarea = textareaRef.current
        if (!textarea) return

        const start = textarea.selectionStart ?? textarea.value.length
        const end = textarea.selectionEnd ?? start
        const before = textarea.value.slice(0, start)
        const selected = textarea.value.slice(start, end)
        const after = textarea.value.slice(end)

        const textToInsert = selected || placeholder
        const nextValue = `${before}${openTag}${textToInsert}${closeTag}${after}`
        const caretPosition = start + openTag.length
        const selectionEnd = caretPosition + textToInsert.length

        textarea.value = nextValue
        onChange({ ...form, content: nextValue })

        requestAnimationFrame(() => {
            if (!textareaRef.current) return
            textareaRef.current.selectionStart = caretPosition
            textareaRef.current.selectionEnd = selectionEnd
            textareaRef.current.focus()
        })
    }

    return (
        <div className="fixed inset-0 bg-background/90 backdrop-blur-sm flex items-start justify-center z-50 p-6 overflow-y-auto pt-[50px]">
            <div className="bg-card border border-border rounded-lg p-10 w-full max-w-5xl my-8 shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-foreground text-lg tracking-wider font-medium">
                        {isEditing ? "РЕДАКТИРОВАТЬ СТАТЬЮ" : "СОЗДАТЬ СТАТЬЮ"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-muted-foreground hover:text-foreground text-2xl leading-none w-8 h-8 flex items-center justify-center hover:bg-muted/20 rounded transition-colors"
                    >
                        ×
                    </button>
                </div>

                <div className="space-y-8">
                    {/* Основная информация */}
                    <div className="bg-secondary/30 border border-border rounded-lg p-6">
                        <h3 className="text-primary text-[11px] uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                            <span>📄</span> Основная информация
                        </h3>

                        <div className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-foreground text-xs mb-3 font-medium">
                                        Зелёный заголовок *
                                    </label>
                                    <input
                                        type="text"
                                        value={form.heroHighlight}
                                        onChange={(e) => updateField("heroHighlight", e.target.value)}
                                        placeholder="VPN"
                                        className="w-full bg-background border border-border rounded px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                    />
                                    <p className="text-muted-foreground text-[10px] mt-2">Отображается зелёным в списке</p>
                                </div>

                                <div>
                                    <label className="block text-foreground text-xs mb-3 font-medium">
                                        Серое описание *
                                    </label>
                                    <input
                                        type="text"
                                        value={form.heroDescription}
                                        onChange={(e) => updateField("heroDescription", e.target.value)}
                                        placeholder="Безопасность • Гайд"
                                        className="w-full bg-background border border-border rounded px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                    />
                                    <p className="text-muted-foreground text-[10px] mt-2">Отображается серым в списке</p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-foreground text-xs mb-3 font-medium">
                                    Название статьи *
                                </label>
                                <input
                                    type="text"
                                    value={form.title}
                                    onChange={(e) => updateField("title", e.target.value)}
                                    placeholder="Введите название статьи (3-100 символов)"
                                    className="w-full bg-background border border-border rounded px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-foreground text-xs mb-3 font-medium">
                                    Дополнительное описание *
                                </label>
                                <textarea
                                    value={form.excerpt}
                                    onChange={(e) => updateField("excerpt", e.target.value)}
                                    placeholder="Краткое описание статьи (10-200 символов)"
                                    rows={3}
                                    className="w-full bg-background border border-border rounded px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none transition-all"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-foreground text-xs mb-3 font-medium">
                                        Теги *
                                    </label>
                                    <input
                                        type="text"
                                        value={form.tags}
                                        onChange={(e) => updateField("tags", e.target.value)}
                                        placeholder="VPN, Безопасность, Гайд"
                                        className="w-full bg-background border border-border rounded px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                    />
                                    <p className="text-muted-foreground text-[10px] mt-2">Через запятую</p>
                                </div>

                                <div>
                                    <label className="block text-foreground text-xs mb-3 font-medium">
                                        Дата публикации *
                                    </label>
                                    <input
                                        type="date"
                                        value={form.publishedAt}
                                        onChange={(e) => updateField("publishedAt", e.target.value)}
                                        className="w-full bg-background border border-border rounded px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                    />
                                    <p className="text-muted-foreground text-[10px] mt-2">
                                        Автор: <span className="text-primary">SpaceVPN Team</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Изображение */}
                    <div className="bg-secondary/30 border border-border rounded-lg p-6">
                        <h3 className="text-primary text-[11px] uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                            <span>🖼️</span> Фотография
                        </h3>

                        <div className="space-y-4">
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed border-border hover:border-primary bg-background rounded-lg p-8 text-center cursor-pointer transition-all group"
                            >
                                {imagePreview ? (
                                    <div className="space-y-3">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="max-h-56 mx-auto object-contain rounded"
                                        />
                                        <p className="text-muted-foreground text-[10px] group-hover:text-primary transition-colors">
                                            Нажмите для изменения
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-3 py-4">
                                        <Upload className="mx-auto text-muted-foreground group-hover:text-primary transition-colors" size={40} />
                                        <p className="text-muted-foreground text-[11px] group-hover:text-primary transition-colors">
                                            Нажмите или перетащите изображение
                                        </p>
                                        <p className="text-muted-foreground text-[9px]">
                                            PNG, JPG, WEBP до 5MB
                                        </p>
                                    </div>
                                )}
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                        </div>
                    </div>

                    {/* Основной текст */}
                    <div className="bg-secondary/30 border border-border rounded-lg p-6">
                        <h3 className="text-primary text-[11px] uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                            <span>✍️</span> Основной текст
                        </h3>

                        <div className="space-y-4">
                            <div className="flex flex-wrap gap-3 bg-background border border-border rounded-lg p-4">
                                <button
                                    type="button"
                                    onClick={() => insertStyle("## ", "\n", "Заголовок")}
                                    className="flex items-center gap-2 px-4 py-2.5 text-[10px] uppercase tracking-[0.2em] bg-primary/10 text-primary border border-primary/30 rounded hover:bg-primary/20 transition-colors"
                                    title="Главный заголовок (зеленый)"
                                >
                                    <Heading1 size={16} />
                                    Заголовок
                                </button>
                                <button
                                    type="button"
                                    onClick={() => insertStyle("### ", "\n", "Подзаголовок")}
                                    className="flex items-center gap-2 px-4 py-2.5 text-[10px] uppercase tracking-[0.2em] bg-muted-foreground/10 text-muted-foreground border border-border rounded hover:bg-muted-foreground/20 transition-colors"
                                    title="Подзаголовок (серый)"
                                >
                                    <Type size={16} />
                                    Подтекст
                                </button>
                                <button
                                    type="button"
                                    onClick={() => insertStyle("\n", "\n\n", "Обычный текст параграфа")}
                                    className="flex items-center gap-2 px-4 py-2.5 text-[10px] uppercase tracking-[0.2em] border border-border text-foreground rounded hover:bg-foreground/5 transition-colors"
                                    title="Обычный текст (белый)"
                                >
                                    <FileText size={16} />
                                    Текст
                                </button>
                            </div>

                            <textarea
                                ref={textareaRef}
                                value={form.content}
                                onChange={(e) => updateField("content", e.target.value)}
                                placeholder="Введите содержание статьи... Используйте кнопки выше для форматирования текста."
                                rows={14}
                                className="w-full bg-background border border-border rounded px-4 py-4 text-foreground text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none font-mono leading-relaxed transition-all"
                            />

                            <div className="bg-background border border-border rounded-lg p-4">
                                <p className="text-muted-foreground text-[10px] mb-3 font-medium">💡 Подсказка по форматированию:</p>
                                <ul className="text-muted-foreground text-[10px] space-y-2 list-disc list-inside">
                                    <li><span className="text-primary font-mono">## Заголовок</span> — главный заголовок зелёного цвета</li>
                                    <li><span className="text-muted-foreground font-mono">### Подзаголовок</span> — серый подзаголовок</li>
                                    <li><span className="text-foreground font-mono">Обычный текст</span> — белый текст параграфа</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Кнопки действий */}
                    <div className="flex gap-4 pt-4">
                        <button
                            onClick={onClose}
                            className="flex-1 border-2 border-border text-foreground rounded-lg py-3.5 text-xs tracking-wider font-medium hover:border-primary hover:text-primary hover:bg-primary/5 transition-all"
                        >
                            ОТМЕНА
                        </button>
                        <button
                            onClick={onSubmit}
                            className="flex-1 bg-primary text-primary-foreground rounded-lg py-3.5 text-xs tracking-wider font-medium hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all"
                        >
                            {isEditing ? "СОХРАНИТЬ ИЗМЕНЕНИЯ" : "СОЗДАТЬ СТАТЬЮ"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
