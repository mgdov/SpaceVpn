import { useRef } from "react"
import type { ContentFormat, PostFormState } from "@/types/admin"

interface PostModalProps {
    open: boolean
    isEditing: boolean
    form: PostFormState
    onChange: (form: PostFormState) => void
    onSubmit: () => void
    onClose: () => void
}

const formatTokens: Record<ContentFormat, { open: string; close: string }> = {
    green: { open: "[green]", close: "[/green]" },
    muted: { open: "[muted]", close: "[/muted]" },
    main: { open: "[main]", close: "[/main]" },
}

export function PostModal({ open, isEditing, form, onChange, onSubmit, onClose }: PostModalProps) {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)

    if (!open) return null

    const updateField = (key: keyof PostFormState, value: string) => {
        onChange({ ...form, [key]: value })
    }

    const applyFormat = (variant: ContentFormat) => {
        const textarea = textareaRef.current
        if (!textarea) return

        const { open: openTag, close } = formatTokens[variant]
        const start = textarea.selectionStart ?? textarea.value.length
        const end = textarea.selectionEnd ?? start
        const before = textarea.value.slice(0, start)
        const selected = textarea.value.slice(start, end)
        const after = textarea.value.slice(end)

        const nextValue = `${before}${openTag}${selected}${close}${after}`
        const caretPosition = start + openTag.length
        const selectionEnd = caretPosition + selected.length

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
        <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50 p-4">
            <div className="bg-card border border-border p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <h2 className="text-foreground text-sm mb-4">{isEditing ? "РЕДАКТИРОВАТЬ СТАТЬЮ" : "СОЗДАТЬ СТАТЬЮ"}</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-foreground text-[10px] mb-2">Зелёный заголовок</label>
                        <input
                            type="text"
                            value={form.heroHighlight}
                            onChange={(e) => updateField("heroHighlight", e.target.value)}
                            className="w-full bg-secondary border border-border px-4 py-2 text-foreground text-[10px] focus:outline-none focus:border-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-foreground text-[10px] mb-2">Серое описание</label>
                        <input
                            type="text"
                            value={form.heroDescription}
                            onChange={(e) => updateField("heroDescription", e.target.value)}
                            className="w-full bg-secondary border border-border px-4 py-2 text-foreground text-[10px] focus:outline-none focus:border-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-foreground text-[10px] mb-2">Заголовок</label>
                        <input
                            type="text"
                            value={form.title}
                            onChange={(e) => updateField("title", e.target.value)}
                            className="w-full bg-secondary border border-border px-4 py-2 text-foreground text-[10px] focus:outline-none focus:border-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-foreground text-[10px] mb-2">Краткое описание</label>
                        <input
                            type="text"
                            value={form.excerpt}
                            onChange={(e) => updateField("excerpt", e.target.value)}
                            className="w-full bg-secondary border border-border px-4 py-2 text-foreground text-[10px] focus:outline-none focus:border-primary"
                        />
                    </div>
                    <div>
                        <div className="flex flex-col gap-2 mb-2">
                            <label className="text-foreground text-[10px]">Содержание</label>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    type="button"
                                    onClick={() => applyFormat("green")}
                                    className="px-3 py-1 text-[9px] uppercase tracking-[0.3em] bg-primary/15 text-primary border border-primary/40"
                                >
                                    Зеленый
                                </button>
                                <button
                                    type="button"
                                    onClick={() => applyFormat("muted")}
                                    className="px-3 py-1 text-[9px] uppercase tracking-[0.3em] bg-secondary text-muted-foreground border border-border"
                                >
                                    Серый
                                </button>
                                <button
                                    type="button"
                                    onClick={() => applyFormat("main")}
                                    className="px-3 py-1 text-[9px] uppercase tracking-[0.3em] border border-border text-foreground"
                                >
                                    Основной
                                </button>
                            </div>
                            <p className="text-muted-foreground text-[8px]">
                                Выделите текст и нажмите кнопку, чтобы применить стиль. Вставка без выделения добавит пустой блок с нужными тегами.
                            </p>
                        </div>
                        <textarea
                            ref={textareaRef}
                            value={form.content}
                            onChange={(e) => updateField("content", e.target.value)}
                            rows={8}
                            className="w-full bg-secondary border border-border px-4 py-2 text-foreground text-[10px] focus:outline-none focus:border-primary resize-none"
                        />
                    </div>
                    <div>
                        <label className="block text-foreground text-[10px] mb-2">Дата публикации</label>
                        <input
                            type="date"
                            value={form.publishedAt}
                            onChange={(e) => updateField("publishedAt", e.target.value)}
                            className="w-full bg-secondary border border-border px-4 py-2 text-foreground text-[10px] focus:outline-none focus:border-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-foreground text-[10px] mb-2">Теги (через запятую)</label>
                        <input
                            type="text"
                            value={form.tags}
                            onChange={(e) => updateField("tags", e.target.value)}
                            className="w-full bg-secondary border border-border px-4 py-2 text-foreground text-[10px] focus:outline-none focus:border-primary"
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
                            {isEditing ? "Сохранить" : "Создать"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
