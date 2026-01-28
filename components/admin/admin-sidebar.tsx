import { DollarSign, FileText, Key, Layers, Users } from "lucide-react"

type Tab = "keys" | "blog" | "tariffs" | "users" | "finance"

interface AdminSidebarProps {
    activeTab: Tab
    onChange: (tab: Tab) => void
}

const tabs: { key: Tab; label: string; icon: typeof Key }[] = [
    { key: "keys", label: "VPN Ключи", icon: Key },
    { key: "blog", label: "Блог", icon: FileText },
    { key: "tariffs", label: "Тарифы", icon: Layers },
    { key: "users", label: "Пользователи", icon: Users },
    { key: "finance", label: "Финансы", icon: DollarSign },
]

export function AdminSidebar({ activeTab, onChange }: AdminSidebarProps) {
    return (
        <aside className="fixed left-0 top-16 bottom-0 w-64 bg-card border-r border-border p-4 z-40">
            <nav className="space-y-2">
                {tabs.map(({ key, label, icon: Icon }) => (
                    <button
                        key={key}
                        onClick={() => onChange(key)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-[10px] transition-colors ${activeTab === key ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"}`}
                    >
                        <Icon size={16} />
                        {label}
                    </button>
                ))}
            </nav>
        </aside>
    )
}
