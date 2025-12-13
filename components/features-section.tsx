import { Shield, Zap, Globe, Lock } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "ЗАЩИТА ДАННЫХ",
    description: "256-битное шифрование для максимальной безопасности ваших данных",
  },
  {
    icon: Zap,
    title: "ВЫСОКАЯ СКОРОСТЬ",
    description: "Оптимизированные серверы обеспечивают стабильное быстрое соединение",
  },
  {
    icon: Globe,
    title: "ГЛОБАЛЬНАЯ СЕТЬ",
    description: "Серверы в 50+ странах мира для обхода любых блокировок",
  },
  {
    icon: Lock,
    title: "NO LOGS",
    description: "Мы не храним логи вашей активности. Полная анонимность",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 px-4 relative z-10 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-accent text-[10px] tracking-widest">[ ВОЗМОЖНОСТИ ]</span>
          <h2 className="text-xl md:text-2xl text-foreground mt-4 mb-4">
            ПОЧЕМУ <span className="text-primary">SPACE VPN</span>?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-card border border-border p-6 hover:border-primary transition-colors group"
            >
              <feature.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-foreground text-[10px] mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-[8px] leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
