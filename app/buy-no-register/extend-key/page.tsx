"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PixelStars } from "@/components/pixel-stars"
import Link from "next/link"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function ExtendKeyPage() {
    const [keyInput, setKeyInput] = useState("")

    const handleFindKey = () => {
        if (!keyInput.trim()) {
            alert("Введите subscription URL или идентификатор ключа")
            return
        }
        // TODO: Implement key search logic
        alert(`Поиск ключа: ${keyInput}`)
    }

    return (
        <div className="min-h-screen bg-background relative">
            <PixelStars />
            <Header />
            <main className="relative z-10 px-4 pt-32 pb-20">
                <div className="max-w-2xl mx-auto">
                    {/* Back Button */}
                    <Link
                        href="/buy-no-register"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-12 transition-colors"
                    >
                        ← Назад
                    </Link>

                    {/* Title */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
                            Продлить ключ
                        </h1>
                        <p className="text-muted-foreground text-sm md:text-base">
                            Продлить срок действия существующего ключа. Введите subscription URL или идентификатор ключа.
                        </p>
                    </div>

                    {/* Search Form */}
                    <div className="bg-card border-2 border-border p-8 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-3">
                                Subscription URL или идентификатор ключа
                            </label>
                            <Input
                                type="text"
                                value={keyInput}
                                onChange={(e) => setKeyInput(e.target.value)}
                                placeholder="Введите URL или ID ключа"
                                className="w-full"
                            />
                        </div>

                        <Button
                            onClick={handleFindKey}
                            className="w-full"
                            size="lg"
                        >
                            Найти ключ
                        </Button>
                    </div>

                    {/* Help Text */}
                    <div className="mt-8 text-center text-sm text-muted-foreground">
                        <p>
                            Не можете найти ключ?{" "}
                            <Link href="/support" className="text-primary hover:underline">
                                Свяжитесь с поддержкой
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
