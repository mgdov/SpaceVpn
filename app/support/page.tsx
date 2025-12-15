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

            <main className="pt-32 pb-20 px-4">
                <div className="max-w-5xl mx-auto space-y-12">
                    <header className="bg-card border border-border p-6 flex flex-col gap-4">
                        <div>
                            <p className="text-accent text-[9px] tracking-[0.35em]">[ ПОДДЕРЖКА ]</p>
                            <h1 className="text-foreground text-2xl mt-2">Всегда рядом, если что-то пошло не так</h1>
                        </div>
                        <p className="text-muted-foreground text-[11px] max-w-3xl">
                            Мы отвечаем в течение 15 минут в Telegram и email. Расскажите, где возникла сложность — ключи, подключение, оплата — и мы подскажем точное решение.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Link href="/account" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-[10px]">
                                В личный кабинет
                                <ArrowRight size={14} />
                            </Link>
                            <a
                                href="https://t.me/pixelspace_support"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 border border-border px-4 py-2 text-[10px] hover:border-primary"
                            >
                                Написать в Telegram
                                <MessageCircle size={14} />
                            </a>
                        </div>
                    </header>

                    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {contacts.map(({ label, value, icon: Icon, href }) => (
                            <a key={label} href={href} className="border border-border bg-card p-5 flex flex-col gap-2 hover:border-primary">
                                <div className="flex items-center gap-2 text-muted-foreground text-[9px]">
                                    <Icon size={14} />
                                    {label}
                                </div>
                                <p className="text-foreground text-base">{value}</p>
                                <span className="text-[8px] text-muted-foreground uppercase tracking-[0.35em]">ответ 24/7</span>
                            </a>
                        ))}
                    </section>

                    <section className="bg-card border border-border p-6">
                        <p className="text-accent text-[9px] tracking-[0.35em]">[ FAQ ]</p>
                        <h2 className="text-foreground text-xl mt-2 mb-6">Популярные вопросы</h2>
                        <div className="space-y-4">
                            {faqs.map(({ question, answer }) => (
                                <div key={question} className="border border-border p-4 bg-background">
                                    <h3 className="text-foreground text-base mb-2">{question}</h3>
                                    <p className="text-muted-foreground text-[11px] leading-relaxed">{answer}</p>
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
