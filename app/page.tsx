import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PixelStars } from "@/components/pixel-stars"
import { PricingSection } from "@/components/pricing-section"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, LogIn, PlayCircle, RefreshCw, ShoppingCart } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background relative">
      <PixelStars />
      <Header />
      <main>
        {/* Hero Section with Title and Action Buttons */}
        <section className="relative z-10 px-4 sm:px-6 md:px-8 pt-20 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20">
          <div className="max-w-5xl mt-30 mx-auto text-center">
            {/* Title */}
            <div>
              <h1 className="text-accent text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.3em] sm:tracking-[0.35em] md:tracking-[0.4em] mb-3 sm:mb-4">
                [ ДОБРО ПОЖАЛОВАТЬ В ]
              </h1>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight mb-4 sm:mb-5 md:mb-6">
                SPACE VPN
              </h2>
              <p className="text-muted-foreground text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-12 sm:mb-16 md:mb-20 lg:mb-[100px] px-4">
                Космическая скорость соединения • Полная анонимность • Защита данных 24/7
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto">
              {/* Попробовать бесплатно */}
              <Link href="/register" className="group relative bg-primary hover:bg-primary/90 border-2 border-primary text-primary-foreground p-4 sm:p-5 md:p-6 transition-all hover:shadow-lg hover:shadow-primary/20 flex items-center justify-center min-h-[100px] sm:min-h-[110px]">
                <div className="flex items-center gap-3 sm:gap-4 md:gap-5 w-full justify-center">
                  <div className="text-center flex-1">
                    <div className="text-xs sm:text-sm font-semibold mb-1 sm:mb-2 tracking-wide">ПОПРОБОВАТЬ БЕСПЛАТНО</div>
                    <div className="text-[9px] sm:text-[10px] text-primary-foreground/80 leading-relaxed">
                      При регистрации аккаунта<br />бесплатный 2-дневный VPN-ключ!!!
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              {/* Войти в аккаунт */}
              <Link href="/login" className="group bg-card hover:bg-accent/10 border-2 border-border hover:border-accent text-foreground p-4 sm:p-5 md:p-6 transition-all hover:shadow-lg flex items-center justify-center min-h-[100px] sm:min-h-[110px]">
                <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
                  <div className="flex-shrink-0">
                    <LogIn className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="text-center">
                    <div className="text-xs sm:text-sm font-semibold tracking-wide">ВОЙТИ В АККАУНТ</div>
                  </div>
                </div>
              </Link>

              {/* Смотреть видеоинструкцию */}
              <Link href="#" className="group bg-card hover:bg-primary/10 border-2 border-border hover:border-primary text-foreground p-4 sm:p-5 md:p-6 transition-all hover:shadow-lg flex items-center justify-center min-h-[100px] sm:min-h-[110px]">
                <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
                  <div className="flex-shrink-0">
                    <PlayCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="text-center">
                    <div className="text-xs sm:text-sm font-semibold tracking-wide">СМОТРЕТЬ ВИДЕОИНСТРУКЦИЮ</div>
                  </div>
                </div>
              </Link>

              {/* Продлить VPN ключ */}
              <Link href="/buy-no-register/extend-key" className="group bg-card hover:bg-accent/10 border-2 border-border hover:border-accent text-foreground p-4 sm:p-5 md:p-6 transition-all hover:shadow-lg flex items-center justify-center min-h-[100px] sm:min-h-[110px]">
                <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
                  <div className="flex-shrink-0">
                    <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-180 transition-transform duration-500" />
                  </div>
                  <div className="text-center">
                    <div className="text-xs sm:text-sm font-semibold tracking-wide">ПРОДЛИТЬ VPN КЛЮЧ</div>
                  </div>
                </div>
              </Link>

              {/* Купить VPN без регистрации */}
              <Link href="/buy-no-register" className="group bg-card hover:bg-green-500/10 border-2 border-green-500 hover:border-green-400 text-foreground p-4 sm:p-5 md:p-6 transition-all hover:shadow-lg hover:shadow-green-500/20 sm:col-span-2 lg:col-span-2 flex items-center justify-center min-h-[100px] sm:min-h-[110px]">
                <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
                  <div className="flex-shrink-0">
                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 group-hover:text-green-400" />
                  </div>
                  <div className="text-center">
                    <div className="text-xs sm:text-sm font-semibold tracking-wide text-green-500 group-hover:text-green-400">КУПИТЬ VPN БЕЗ РЕГИСТРАЦИИ</div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <div id="pricing">
          <PricingSection />
        </div>
      </main>
      <Footer />
    </div>
  )
}
