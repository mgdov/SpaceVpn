import Link from "next/link"
import { LogOut, Home } from "lucide-react"

export function AdminHeader() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-primary flex items-center justify-center">
                        <span className="text-background text-xs">S</span>
                    </div>
                    <span className="text-primary text-xs">ADMIN PANEL</span>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/" className="text-muted-foreground hover:text-primary text-[10px] flex items-center gap-1">
                        <Home size={14} />
                        На сайт
                    </Link>
                    <button className="text-muted-foreground hover:text-primary text-[10px] flex items-center gap-1">
                        <LogOut size={14} />
                        Выход
                    </button>
                </div>
            </div>
        </header>
    )
}
