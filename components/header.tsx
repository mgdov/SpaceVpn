"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, User, LogOut } from "lucide-react"

import { PixelLogo } from "./pixel-logo"
import { useAuth } from "@/lib/auth-context"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const closeMenu = () => setIsMenuOpen(false)

  const handleLogout = () => {
    logout()
    closeMenu()
  }

  const navLinks = [
    { href: "/", label: "Главная" },
    { href: "/blog", label: "Блог" },
    { href: "/pricing", label: "Тарифы" },
    { href: "/faq", label: "FAQ" },
    { href: "/about", label: "О нас" },
  ]

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <PixelLogo className="w-8 h-8 text-primary" aria-hidden="true" />
              <span className="text-primary text-xs md:text-sm">SPACE VPN</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-foreground hover:text-primary transition-colors text-[10px]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <>
                  <Link 
                    href="/account" 
                    className="text-foreground hover:text-primary transition-colors text-[10px] flex items-center gap-2"
                  >
                    <User size={14} />
                    {user.username}
                  </Link>
                  <button
                    onClick={logout}
                    className="text-foreground hover:text-primary transition-colors text-[10px] flex items-center gap-2"
                  >
                    <LogOut size={14} />
                    Выход
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-foreground hover:text-primary transition-colors text-[10px]">
                    Вход
                  </Link>
                  <Link
                    href="/register"
                    className="bg-primary text-primary-foreground px-4 py-2 hover:bg-primary/80 transition-colors text-[10px]"
                  >
                    Регистрация
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-foreground" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Меню">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" onClick={closeMenu} aria-hidden="true" />
          <div
            role="dialog"
            aria-modal="true"
            className="absolute top-0 right-0 h-full w-[80%] max-w-xs bg-card border-l border-border shadow-[0_0_40px_rgba(0,0,0,0.35)] p-6 flex flex-col gap-6"
          >
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-[10px] tracking-[0.3em] uppercase">Меню</span>
              <button onClick={closeMenu} className="text-foreground" aria-label="Закрыть меню">
                <X size={20} />
              </button>
            </div>

            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-foreground text-[12px] tracking-wide hover:text-primary transition-colors"
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-3">
              {user ? (
                <>
                  <Link
                    href="/account"
                    className="text-foreground text-[11px] tracking-wide border border-border py-2 text-center hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
                    onClick={closeMenu}
                  >
                    <User size={14} />
                    {user.username}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-foreground text-[11px] tracking-wide border border-border py-2 text-center hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
                  >
                    <LogOut size={14} />
                    Выход
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-foreground text-[11px] tracking-wide border border-border py-2 text-center hover:border-primary hover:text-primary transition-colors"
                    onClick={closeMenu}
                  >
                    Вход
                  </Link>
                  <Link
                    href="/register"
                    className="bg-primary text-primary-foreground text-[11px] tracking-[0.2em] py-2 text-center hover:bg-primary/80 transition-colors"
                    onClick={closeMenu}
                  >
                    Регистрация
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
