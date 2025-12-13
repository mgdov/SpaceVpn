import { DollarSign, FileText, Key, Layers } from "lucide-react"

type Tab = "keys" | "blog" | "tariffs" | "balance"

interface AdminSidebarProps {
    activeTab: Tab
    onChange: (tab: Tab) => void
    balance: number
}

const tabs: { key: Tab; label: string; icon: typeof Key }[] = [
    { key: "keys", label: "VPN Ключи", icon: Key },
    { key: "blog", label: "Блог", icon: FileText },
    { key: "tariffs", label: "Тарифы", icon: Layers },
    { key: "balance", label: "Баланс", icon: DollarSign },
]

export function AdminSidebar({ activeTab, onChange, balance }: AdminSidebarProps) {
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

            <div className="mt-8 p-4 bg-secondary border border-border">
                <div className="text-[8px] text-muted-foreground mb-2">БАЛАНС</div>
                <div className="text-primary text-lg">{balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽</div>
            </div>
        </aside>
    )
}
