import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PixelStars } from "@/components/pixel-stars"
import Link from "next/link"
import { CreditCard, RefreshCw } from "lucide-react"

export default function BuyNoRegisterPage() {
    return (
        <div className="min-h-screen bg-background relative">
            <PixelStars />
            <Header />
            <main className="relative z-10 px-3 sm:px-6 md:px-8 pt-16 sm:pt-28 md:pt-32 pb-10 sm:pb-16 md:pb-20">
                <div className="max-w-4xl mx-auto">
                    {/* Back Button */}
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-xs sm:text-sm mb-6 sm:mb-10 md:mb-12 transition-colors"
                    >
                        ← Назад на главную
                    </Link>

                    {/* Title */}
                    <div className="text-center mb-8 sm:mb-14 md:mb-16">
                        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-foreground tracking-tight mb-3 sm:mb-5 md:mb-6 px-2">
                            Купить без регистрации
                        </h1>
                        <p className="text-muted-foreground text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed px-2">
                            Выберите действие
                        </p>
                    </div>

                    {/* Action Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 md:gap-6 max-w-3xl mx-auto">
                        {/* Купить новый ключ */}
                        <Link
                            href="/buy-no-register/new-key"
                            className="group relative bg-card hover:bg-accent/5 border-2 border-border hover:border-primary p-5 sm:p-7 md:p-8 transition-all hover:shadow-lg"
                        >
                            <div className="flex flex-col items-center text-center gap-3 sm:gap-5 md:gap-6">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                    <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-base sm:text-xl font-semibold mb-1.5 sm:mb-3 text-foreground">
                                        Купить новый ключ
                                    </h3>
                                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                        Приобрести новый VPN ключ без регистрации. После оплаты вы получите ключ для использования.
                                    </p>
                                </div>
                                <div className="text-primary text-xs sm:text-sm font-medium group-hover:translate-x-1 transition-transform">
                                    Выбрать тариф →
                                </div>
                            </div>
                        </Link>

                        {/* Продлить ключ */}
                        <Link
                            href="/buy-no-register/extend-key"
                            className="group relative bg-card hover:bg-accent/5 border-2 border-border hover:border-accent p-5 sm:p-7 md:p-8 transition-all hover:shadow-lg"
                        >
                            <div className="flex flex-col items-center text-center gap-3 sm:gap-5 md:gap-6">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                                    <RefreshCw className="w-6 h-6 sm:w-8 sm:h-8 text-accent" />
                                </div>
                                <div>
                                    <h3 className="text-base sm:text-xl font-semibold mb-1.5 sm:mb-3 text-foreground">
                                        Продлить ключ
                                    </h3>
                                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                        Продлить срок действия существующего ключа. Введите subscription URL или идентификатор ключа.
                                    </p>
                                </div>
                                <div className="text-accent text-xs sm:text-sm font-medium group-hover:translate-x-1 transition-transform">
                                    Найти ключ →
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
