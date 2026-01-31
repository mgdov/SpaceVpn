import { Suspense } from "react"

export const dynamic = "force-dynamic"

export default function VerifyEmailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Suspense fallback={<VerifyEmailFallback />}>{children}</Suspense>
}

function VerifyEmailFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-muted-foreground text-sm">Загрузка...</div>
    </div>
  )
}
