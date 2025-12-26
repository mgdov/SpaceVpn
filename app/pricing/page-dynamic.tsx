import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PixelStars } from "@/components/pixel-stars"
import { PricingSectionDynamic } from "@/components/pricing-section-dynamic"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background relative">
      <PixelStars />
      <Header />
      <main className="pt-24">
        <PricingSectionDynamic />
      </main>
      <Footer />
    </div>
  )
}

