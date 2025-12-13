import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PixelStars } from "@/components/pixel-stars"
import { PricingSection } from "@/components/pricing-section"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background relative">
      <PixelStars />
      <Header />
      <main className="pt-24">
        <PricingSection />
      </main>
      <Footer />
    </div>
  )
}
