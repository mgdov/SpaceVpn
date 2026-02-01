"use client"

import { useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'

function RedirectContent() {
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect_to')

  const [message, setMessage] = useState('Пожалуйста, подождите...')
  const [showRetry, setShowRetry] = useState(false)
  const [showSpinner, setShowSpinner] = useState(true)
  const [decodedUrl, setDecodedUrl] = useState<string | null>(null)
  const [copyDone, setCopyDone] = useState(false)

  useEffect(() => {
    if (!redirectTo) {
      setMessage('Ошибка: отсутствует параметр redirect_to')
      setShowSpinner(false)
      return
    }

    const decoded = redirectTo.includes('%')
      ? decodeURIComponent(redirectTo)
      : redirectTo

    setDecodedUrl(decoded)
    tryOpenApp(decoded)

    const timer = setTimeout(() => {
      setMessage('Приложение не открылось?')
      setShowRetry(true)
      setShowSpinner(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [redirectTo])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setMessage('Если приложение открылось, вернитесь на сайт')
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  useEffect(() => {
    let blurTime: number | null = null
    const handleBlur = () => {
      blurTime = Date.now()
    }
    const handleFocus = () => {
      if (blurTime && Date.now() - blurTime > 1000) {
        setMessage('✅ Похоже, приложение открылось. Можно вернуться на сайт.')
      }
    }
    window.addEventListener('blur', handleBlur)
    window.addEventListener('focus', handleFocus)
    return () => {
      window.removeEventListener('blur', handleBlur)
      window.removeEventListener('focus', handleFocus)
    }
  }, [])

  const tryOpenApp = (url: string) => {
    if (!url) return
    setMessage('Открываем приложение...')
    window.location.href = url
    setTimeout(() => {
      const iframe = document.createElement('iframe')
      iframe.style.display = 'none'
      iframe.src = url
      document.body.appendChild(iframe)
      setTimeout(() => {
        try { document.body.removeChild(iframe) } catch { }
      }, 1000)
    }, 100)
  }

  const handleRetry = () => {
    if (decodedUrl) tryOpenApp(decodedUrl)
  }

  const handleCopyLink = async () => {
    if (!decodedUrl) return
    let toCopy = decodedUrl
    if (decodedUrl.startsWith('happ://add/')) {
      try {
        toCopy = decodeURIComponent(decodedUrl.slice('happ://add/'.length))
      } catch {
        toCopy = decodedUrl
      }
    }
    try {
      await navigator.clipboard.writeText(toCopy)
      setCopyDone(true)
      setMessage('Ссылка скопирована. Вставьте её в приложении (Импорт из буфера или + → по ссылке).')
    } catch {
      setMessage('Не удалось скопировать. Попробуйте кнопку «Добавить VPN в приложение» ещё раз.')
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 text-white p-5">
      <div className="text-center max-w-lg p-8 bg-white/10 rounded-3xl backdrop-blur-xl shadow-2xl border border-white/20">
        {showSpinner && (
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-5" />
        )}

        <h2 className="text-3xl font-bold mb-5">Открываем VPN приложение…</h2>
        <p className="text-lg leading-relaxed mb-6">{message}</p>

        <div className="flex flex-col gap-3">
          {showRetry && (
            <>
              <button
                onClick={handleRetry}
                className="px-7 py-3.5 bg-gradient-to-r from-green-500 to-green-600 rounded-xl text-white font-bold text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl shadow-lg shadow-green-500/40"
              >
                🚀 Добавить VPN в приложение
              </button>
              {decodedUrl && (
                <button
                  onClick={handleCopyLink}
                  className="px-7 py-3.5 bg-white/20 border-2 border-white/50 rounded-xl text-white font-semibold text-base transition-all duration-300 hover:bg-white/30"
                >
                  {copyDone ? '✓ Ссылка скопирована' : 'Скопировать ссылку (вставить в приложении)'}
                </button>
              )}
            </>
          )}

          <a
            href="/account/keys"
            className="px-6 py-3 bg-white/15 border-2 border-white/50 rounded-xl text-white font-semibold transition-all duration-300 hover:bg-white/25 hover:border-white"
          >
            ← Вернуться на сайт
          </a>
        </div>
      </div>
    </div>
  )
}

export default function RedirectPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 text-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-5" />
          <p className="text-lg">Загрузка...</p>
        </div>
      </div>
    }>
      <RedirectContent />
    </Suspense>
  )
}
