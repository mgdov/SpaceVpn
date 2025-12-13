"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PixelStars } from "@/components/pixel-stars"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "Что такое VPN и зачем он нужен?",
    answer:
      "VPN (Virtual Private Network) - это технология, которая создает зашифрованное соединение между вашим устройством и интернетом. Это защищает ваши данные и обеспечивает анонимность в сети.",
  },
  {
    question: "Как начать пользоваться Space VPN?",
    answer:
      "Зарегистрируйтесь на сайте, выберите подходящий тариф, скачайте приложение для вашего устройства и введите полученный ключ активации.",
  },
  {
    question: "На скольких устройствах можно использовать VPN?",
    answer:
      "Количество устройств зависит от выбранного тарифа: Starter - 1 устройство, Pro - 5 устройств, Ultimate - 10 устройств.",
  },
  {
    question: "Есть ли пробный период?",
    answer: "Да, мы предоставляем 7 дней бесплатного пробного периода для всех новых пользователей.",
  },
  {
    question: "Как получить поддержку?",
    answer:
      "Вы можете связаться с нами через email support@spacevpn.com или через Telegram @spacevpn. Время ответа зависит от вашего тарифа.",
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="min-h-screen bg-background relative">
      <PixelStars />
      <Header />
      <main className="pt-24 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-accent text-[10px] tracking-widest">[ FAQ ]</span>
            <h1 className="text-xl md:text-2xl text-foreground mt-4">
              ЧАСТО ЗАДАВАЕМЫЕ <span className="text-primary">ВОПРОСЫ</span>
            </h1>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-card border border-border overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-secondary/50 transition-colors"
                >
                  <span className="text-foreground text-[10px]">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-primary transition-transform ${openIndex === index ? "rotate-180" : ""}`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-muted-foreground text-[9px] leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
