"use client"

import { useState } from "react"
import { Copy, CheckCircle2, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PixelStars } from "@/components/pixel-stars"
import { mockUser, mockVlessKey, vlessShareLink } from "@/lib/account-data"

export default function AccountKeysPage() {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(vlessShareLink)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (error) {
            console.error("copy failed", error)
        }
    }

    return (
        <div className="min-h-screen bg-background relative">
            <PixelStars />
            <Header />

            <main className="pt-32 pb-20 px-4">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="bg-card border border-border p-6">
                        <p className="text-accent text-[9px] tracking-[0.35em]">[ КЛЮЧ ]</p>
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mt-4">
                            <div>
                                <h1 className="text-foreground text-2xl">{mockUser.name}</h1>
                                <p className="text-muted-foreground text-[11px]">{mockUser.email}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-muted-foreground text-[9px] uppercase tracking-[0.35em]">Тип</p>
                                <p className="text-foreground text-lg">{mockVlessKey.type}</p>
                                <p className="text-muted-foreground text-[10px]">Обновлено: {mockVlessKey.lastUpdated}</p>
                            </div>
                        </div>
                    </div>

                    <section className="bg-card border border-border p-6 space-y-4">
                        <div className="flex flex-col gap-2">
                            <p className="text-muted-foreground text-[10px]">VLESS / TLS Reality ссылка</p>
                            <div className="flex flex-col md:flex-row md:items-center gap-3">
                                <code className="flex-1 text-foreground text-[11px] break-all bg-background border border-border p-3">
                                    {vlessShareLink}
                                </code>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleCopy}
                                        className="border border-border px-4 py-2 text-[10px] hover:border-primary"
                                    >
                                        {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                                    </button>
                                    <a
                                        href={vlessShareLink}
                                        className="border border-border px-4 py-2 text-[10px] hover:border-primary flex items-center gap-2"
                                    >
                                        Открыть
                                        <ExternalLink size={14} />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <Link href="/account/tariffs" className="inline-flex items-center gap-2 text-[10px] text-muted-foreground hover:text-primary">
                            Нужен другой тариф? Перейти к оплате →
                        </Link>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    )
}
