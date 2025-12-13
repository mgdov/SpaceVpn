import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PixelStars } from "@/components/pixel-stars"

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

          {/* Empty page as requested */}
          <div className="bg-card border border-border p-12">
            <p className="text-muted-foreground text-[10px]">Страница в разработке...</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
