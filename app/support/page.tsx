import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PixelStars } from "@/components/pixel-stars"
import { MessageCircle, Mail, Phone, ArrowRight } from "lucide-react"
import Link from "next/link"

const faqs = [
    {
        question: "Как подключиться к TLS Reality?",
        answer:
            "Используйте ключ из личного кабинета. В клиенте укажите Endpoint, UUID и Public Key. Убедитесь, что включен протокол VLESS и Flow xtls-rprx-vision.",
    },
    {
        question: "Как быстро активируется купленный тариф?",
        answer: "Новый период подключается автоматически сразу после успешной оплаты — обновлять ключ вручную не нужно.",
    },
    {
        question: "Что делать, если соединение нестабильное?",
        answer:
            "Попробуйте сменить SNI или endpoint. Также убедитесь, что время на устройстве синхронизировано. Если проблема сохраняется — напишите нам.",
    },
]

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

            <main className="pt-24 pb-20 px-4">
                <div className="max-w-6xl mx-auto space-y-10">
                    <header className="bg-card border border-border p-8">
                        <Link
                            href="/account"
                            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm mb-4"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Назад в личный кабинет
                        </Link>
                        <p className="text-accent text-[9px] tracking-[0.35em] mb-2">[ ПОДДЕРЖКА ]</p>
                        <h1 className="text-foreground text-4xl font-bold mb-4">Мы всегда на связи</h1>
                        <p className="text-muted-foreground text-base max-w-3xl leading-relaxed">
                            Отвечаем в течение 15 минут в Telegram и email. Расскажите, где возникла сложность — ключи, подключение, оплата — и мы подскажем точное решение.
                        </p>
                    </header>

                    <section>
                        <p className="text-accent text-[9px] tracking-[0.35em] mb-6">[ СВЯЖИТЕСЬ С НАМИ ]</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {contacts.map(({ label, value, icon: Icon, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="group bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary hover:border-primary hover:from-primary/20 hover:to-primary/10 p-8 transition-all hover:shadow-lg hover:shadow-primary/20"
                                >
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="bg-primary/20 p-3 rounded">
                                            <Icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">{label}</p>
                                            <p className="text-foreground text-lg font-semibold">{value}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-green-500 font-semibold">Ответ 24/7</span>
                                        <svg className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </section>

                    <section className="bg-card border border-border p-8">
                        <p className="text-accent text-[9px] tracking-[0.35em] mb-2">[ FAQ ]</p>
                        <h2 className="text-foreground text-2xl font-bold mb-8">Популярные вопросы</h2>
                        <div className="space-y-6">
                            {faqs.map(({ question, answer }) => (
                                <div key={question} className="border-l-4 border-primary bg-background p-6">
                                    <h3 className="text-foreground text-lg font-semibold mb-3">{question}</h3>
                                    <p className="text-muted-foreground text-base leading-relaxed">{answer}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    )
}
