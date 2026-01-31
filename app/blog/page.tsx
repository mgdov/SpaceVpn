import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PixelStars } from "@/components/pixel-stars"
import { Construction } from "lucide-react"

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background relative">
      <PixelStars />
      <Header />
      <main className="pt-20 sm:pt-24 pb-12 sm:pb-20 px-3 sm:px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-accent text-[10px] tracking-widest">[ БЛОГ ]</span>
            <h1 className="text-lg sm:text-xl md:text-2xl text-foreground mt-3 sm:mt-4">
              НОВОСТИ И <span className="text-primary">СТАТЬИ</span>
            </h1>
          </div>

          {/* Under Development Message */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-card border-2 border-border p-6 sm:p-12 text-center">
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <Construction className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                </div>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 sm:mb-4">
                Страница в разработке
              </h2>
              <p className="text-muted-foreground text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-6">
                Мы работаем над созданием интересного контента для вас. Скоро здесь появятся полезные статьи о VPN, безопасности и приватности в интернете.
              </p>
              <div className="text-accent text-xs tracking-wider">
                [ COMING SOON ]
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
