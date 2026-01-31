import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PixelStars } from "@/components/pixel-stars"
import { MessageCircle, Mail, Phone } from "lucide-react"
import Link from "next/link"

const contacts = [
    {
        label: "Чат поддержки",
        value: "@pixelspace_support",
        icon: MessageCircle,
        href: "https://t.me/pixelspace_support",
    },
    {
        label: "Email",
        value: "support@pixelspace.vpn",
        icon: Mail,
        href: "mailto:support@pixelspace.vpn",
    },
    {
        label: "Горячая линия",
        value: "+7 (999) 123‑45‑67",
        icon: Phone,
        href: "tel:+79991234567",
    },
]

export default function SupportPage() {
    return (
        <div className="min-h-screen bg-background relative">
            <PixelStars />
            <Header />

            <main className="pt-20 sm:pt-24 pb-12 sm:pb-20 px-3 sm:px-4">
                <div className="max-w-6xl mx-auto space-y-6 sm:space-y-10">
                    {/* Навигация назад вне рамки */}
                    <Link
                        href="/account"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm"
                    >
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Назад в личный кабинет
                    </Link>

                    <header className="bg-card border border-border p-5 sm:p-8">
                        <p className="text-accent text-[9px] tracking-[0.25em] sm:tracking-[0.35em] mb-2">ПОДДЕРЖКА </p>
                        <h1 className="text-foreground text-2xl sm:text-4xl font-bold mb-3 sm:mb-4">Мы всегда на связи</h1>
                        <p className="text-muted-foreground text-xs sm:text-base max-w-3xl leading-relaxed">
                            Отвечаем в течение 15 минут в Telegram и email. Расскажите, где возникла сложность — ключи, подключение, оплата — и мы подскажем точное решение.
                        </p>
                    </header>

                    <section>
                        <p className="text-accent text-[9px] tracking-[0.25em] sm:tracking-[0.35em] mb-4 sm:mb-6">[ СВЯЖИТЕСЬ С НАМИ ]</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                            {contacts.map(({ label, value, icon: Icon, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="group bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary hover:border-primary hover:from-primary/20 hover:to-primary/10 p-5 sm:p-8 transition-all hover:shadow-lg hover:shadow-primary/20"
                                >
                                    <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                                        <div className="bg-primary/20 p-2 sm:p-3 rounded flex-shrink-0">
                                            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-muted-foreground text-[9px] sm:text-xs uppercase tracking-wider mb-0.5 sm:mb-1">{label}</p>
                                            <p className="text-foreground text-base sm:text-lg font-semibold break-all">{value}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between text-xs sm:text-sm">
                                        <span className="text-green-500 font-semibold">Ответ 24/7</span>
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    )
}
