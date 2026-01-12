import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PixelStars } from "@/components/pixel-stars"
import { Construction } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background relative">
      <PixelStars />
      <Header />
      <main className="pt-24 pb-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-accent text-[10px] tracking-widest">[ О НАС ]</span>
          <h1 className="text-xl md:text-2xl text-foreground mt-4 mb-8">
            SPACE <span className="text-primary">VPN</span>
          </h1>

          {/* Under Development Message */}
          <div className="bg-card border-2 border-border p-12">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <Construction className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Страница в разработке
            </h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
              Мы работаем над созданием подробной информации о нашем сервисе. Скоро здесь появится наша история, миссия и команда.
            </p>
            <div className="text-accent text-xs tracking-wider">
              [ COMING SOON ]
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
