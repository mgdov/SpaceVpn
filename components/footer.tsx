import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary flex items-center justify-center">
                <span className="text-background text-xs">S</span>
              </div>
              <span className="text-primary text-xs">SPACE VPN</span>
            </div>
            <p className="text-muted-foreground text-[8px] leading-relaxed max-w-md">
              Защитите свою приватность в интернете с помощью нашего VPN сервиса. Быстрое и надежное соединение по всему
              миру.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-foreground text-[10px] mb-4">Навигация</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-muted-foreground hover:text-primary text-[8px]">
                Главная
              </Link>
              <Link href="/pricing" className="text-muted-foreground hover:text-primary text-[8px]">
                Тарифы
              </Link>
              <Link href="/blog" className="text-muted-foreground hover:text-primary text-[8px]">
                Блог
              </Link>
              <Link href="/faq" className="text-muted-foreground hover:text-primary text-[8px]">
                FAQ
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-foreground text-[10px] mb-4">Контакты</h4>
            <div className="flex flex-col gap-2 text-[8px] text-muted-foreground">
              <span>support@spacevpn.com</span>
              <span>Telegram: @spacevpn</span>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-[8px]">© 2025 Space VPN. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}
