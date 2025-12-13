import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Pixel Earth Image */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[40%] bg-cover bg-top opacity-60"
        style={{

          backgroundPosition: "center bottom",
        }}
      />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-6">
          <span className="text-accent text-[10px] tracking-widest">[ ДОБРО ПОЖАЛОВАТЬ В ]</span>
        </div>

        <h1 className="text-2xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-relaxed">
          <span className="text-primary">SPACE</span> VPN
        </h1>

        <p className="text-muted-foreground text-[10px] md:text-xs mb-8 max-w-2xl mx-auto leading-relaxed">
          Исследуйте интернет без границ. Наш VPN обеспечивает максимальную защиту и анонимность в цифровом
          пространстве.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/register"
            className="bg-primary text-primary-foreground px-8 py-4 text-[10px] hover:bg-primary/80 transition-colors"
          >
            НАЧАТЬ СЕЙЧАС
          </Link>
          <Link
            href="/pricing"
            className="border border-border text-foreground px-8 py-4 text-[10px] hover:border-primary hover:text-primary transition-colors"
          >
            СМОТРЕТЬ ТАРИФЫ
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16">
          <div>
            <div className="text-primary text-xl md:text-2xl mb-2">50+</div>
            <div className="text-muted-foreground text-[8px]">Серверов</div>
          </div>
          <div>
            <div className="text-primary text-xl md:text-2xl mb-2">99.9%</div>
            <div className="text-muted-foreground text-[8px]">Аптайм</div>
          </div>
          <div>
            <div className="text-primary text-xl md:text-2xl mb-2">10K+</div>
            <div className="text-muted-foreground text-[8px]">Пользователей</div>
          </div>
        </div>
      </div>
    </section>
  )
}
