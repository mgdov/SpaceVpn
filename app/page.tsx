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
        <section className="relative z-10 px-4 pt-32 pb-20">
          <div className="max-w-5xl mx-auto text-center">
            {/* Title */}
            <div>
              <h1 className="text-accent text-[11px] tracking-[0.4em] mb-4">
                [ ДОБРО ПОЖАЛОВАТЬ В ]
              </h1>
              <h2 className="text-5xl md:text-7xl font-bold text-foreground tracking-tight mb-6">
                SPACE VPN
              </h2>
              <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-[100px]">
                Космическая скорость соединения • Полная анонимность • Защита данных 24/7
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {/* Попробовать бесплатно */}
              <Link href="/register" className="group relative bg-primary hover:bg-primary/90 border-2 border-primary text-primary-foreground p-6 transition-all hover:shadow-lg hover:shadow-primary/20 flex items-center justify-center">
                <div className="flex items-center gap-5">
                  <div className="text-center">
                    <div className="text-sm font-semibold mb-2 tracking-wide">ПОПРОБОВАТЬ БЕСПЛАТНО</div>
                    <div className="text-[10px] text-primary-foreground/80 leading-relaxed">
                      При регистрации аккаунта<br />бесплатный 2-дневный VPN-ключ!!!
                    </div>
                  </div>
                  <div>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              {/* Войти в аккаунт */}
              <Link href="/login" className="group bg-card hover:bg-accent/10 border-2 border-border hover:border-accent text-foreground p-6 transition-all hover:shadow-lg flex items-center justify-center">
                <div className="flex items-center gap-5">
                  <div>
                    <LogIn className="w-5 h-5" />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold tracking-wide">ВОЙТИ В АККАУНТ</div>
                  </div>
                </div>
              </Link>

              {/* Смотреть видеоинструкцию */}
              <Link href="#" className="group bg-card hover:bg-primary/10 border-2 border-border hover:border-primary text-foreground p-6 transition-all hover:shadow-lg flex items-center justify-center">
                <div className="flex items-center gap-5">
                  <div>
                    <PlayCircle className="w-5 h-5" />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold tracking-wide">СМОТРЕТЬ ВИДЕОИНСТРУКЦИЮ</div>
                  </div>
                </div>
              </Link>

              {/* Продлить VPN ключ */}
              <Link href="/account/keys" className="group bg-card hover:bg-accent/10 border-2 border-border hover:border-accent text-foreground p-6 transition-all hover:shadow-lg flex items-center justify-center">
                <div className="flex items-center gap-5">
                  <div>
                    <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold tracking-wide">ПРОДЛИТЬ VPN КЛЮЧ</div>
                  </div>
                </div>
              </Link>

              {/* Купить VPN без регистрации */}
              <Link href="#pricing" className="group bg-card hover:bg-green-500/10 border-2 border-green-500 hover:border-green-400 text-foreground p-6 transition-all hover:shadow-lg hover:shadow-green-500/20 lg:col-span-2 flex items-center justify-center">
                <div className="flex items-center gap-5">
                  <div>
                    <ShoppingCart className="w-5 h-5 text-green-500 group-hover:text-green-400" />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold tracking-wide text-green-500 group-hover:text-green-400">КУПИТЬ VPN БЕЗ РЕГИСТРАЦИИ</div>
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
