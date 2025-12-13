import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <div
          className="bg-card border border-border p-12 relative overflow-hidden"
          style={{
            backgroundImage: `url('/images/img-2617.jpeg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-background/80" />

          <div className="relative z-10">
            <span className="text-accent text-[10px] tracking-widest">[ ГОТОВЫ НАЧАТЬ? ]</span>
            <h2 className="text-lg sm:text-xl md:text-2xl text-foreground mt-4 mb-4 leading-tight break-words">
              ПРИСОЕДИНЯЙТЕСЬ К <span className="text-primary">SPACE VPN</span>
            </h2>
            <p className="text-muted-foreground text-[10px] mb-8 max-w-xl mx-auto">
              Получите 7 дней бесплатного пробного периода и оцените все преимущества нашего сервиса
            </p>

            <Link
              href="/register"
              className="inline-block bg-primary text-primary-foreground px-8 py-4 text-[10px] hover:bg-primary/80 transition-colors"
            >
              ПОПРОБОВАТЬ БЕСПЛАТНО
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
