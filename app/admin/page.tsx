"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { PixelStars } from "@/components/pixel-stars"
import { Key, FileText, DollarSign, Layers, Plus, Edit, Trash2, RefreshCw, LogOut, Home } from "lucide-react"

interface VPNKey {
  id: string
  key: string
  user: string
  plan: string
  expiresAt: string
  status: "active" | "expired" | "pending"
  createdAt: string
}

interface BlogPost {
  id: string
  heroHighlight: string
  heroDescription: string
  title: string
  excerpt: string
  content: string
  tags: string[]
  publishedAt: string
  createdAt: string
  updatedAt: string
}

interface Tariff {
  id: string
  name: string
  durationDays: number
  price: number
  description: string
}

type ContentFormat = "green" | "muted" | "main"

const initialKeys: VPNKey[] = [
  {
    id: "1",
    key: "SPACE-XXXX-YYYY-ZZZZ",
    user: "user1@email.com",
    plan: "Pro",
    expiresAt: "2025-12-31",
    status: "active",
    createdAt: "2025-01-01",
  },
  {
    id: "2",
    key: "SPACE-AAAA-BBBB-CCCC",
    user: "user2@email.com",
    plan: "Starter",
    expiresAt: "2025-11-15",
    status: "expired",
    createdAt: "2025-01-15",
  },
  {
    id: "3",
    key: "SPACE-DDDD-EEEE-FFFF",
    user: "user3@email.com",
    plan: "Ultimate",
    expiresAt: "2026-06-01",
    status: "active",
    createdAt: "2025-02-01",
  },
]

const initialPosts: BlogPost[] = [
  {
    id: "1",
    heroHighlight: "VPN",
    heroDescription: "Безопасность • Гайд",
    title: "Как выбрать лучший VPN",
    excerpt: "Разбираемся в критериях...",
    content: "Полный текст статьи...",
    tags: ["VPN", "Безопасность", "Гайд"],
    publishedAt: "2025-12-10",
    createdAt: "2025-12-10",
    updatedAt: "2025-12-10",
  },
  {
    id: "2",
    heroHighlight: "Обновления",
    heroDescription: "Серверы • Новости",
    title: "Обновление серверов",
    excerpt: "Новые локации...",
    content: "Полный текст...",
    tags: ["Обновления", "Серверы", "Новости"],
    publishedAt: "2025-12-05",
    createdAt: "2025-12-05",
    updatedAt: "2025-12-05",
  },
]

const initialTariffs: Tariff[] = [
  {
    id: "1",
    name: "1 месяц",
    durationDays: 30,
    price: 99,
    description: "Минимальный срок для теста сервиса",
  },
  {
    id: "2",
    name: "3 месяца",
    durationDays: 90,
    price: 249,
    description: "Оптимальный баланс цены и гибкости",
  },
  {
    id: "3",
    name: "12 месяцев",
    durationDays: 365,
    price: 799,
    description: "Год без забот с максимальной экономией",
  },
]

const defaultTariffName = initialTariffs[0]?.name ?? ""

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"keys" | "blog" | "tariffs" | "balance">("keys")
  const [keys, setKeys] = useState<VPNKey[]>(initialKeys)
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts)
  const [tariffs, setTariffs] = useState<Tariff[]>(initialTariffs)
  const [balance, setBalance] = useState(15420)
  const [showKeyModal, setShowKeyModal] = useState(false)
  const [showPostModal, setShowPostModal] = useState(false)
  const [showTariffModal, setShowTariffModal] = useState(false)
  const [editingKey, setEditingKey] = useState<VPNKey | null>(null)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [editingTariff, setEditingTariff] = useState<Tariff | null>(null)

  // Key form state
  const [keyForm, setKeyForm] = useState({
    user: "",
    plan: defaultTariffName,
    expiresAt: "",
  })

  // Post form state
  const createInitialPostForm = () => ({
    heroHighlight: "",
    heroDescription: "",
    title: "",
    excerpt: "",
    content: "",
    tags: "",
    publishedAt: new Date().toISOString().split("T")[0],
  })
  const [postForm, setPostForm] = useState(createInitialPostForm)

  // Tariff form state
  const [tariffForm, setTariffForm] = useState({
    name: "",
    durationDays: "30",
    price: "0",
    description: "",
  })

  const contentTextareaRef = useRef<HTMLTextAreaElement | null>(null)

  const formatTokens: Record<ContentFormat, { open: string; close: string }> = {
    green: { open: "[green]", close: "[/green]" },
    muted: { open: "[muted]", close: "[/muted]" },
    main: { open: "[main]", close: "[/main]" },
  }

  const applyContentFormat = (variant: ContentFormat) => {
    const textarea = contentTextareaRef.current
    if (!textarea) return

    const { open, close } = formatTokens[variant]
    const start = textarea.selectionStart ?? textarea.value.length
    const end = textarea.selectionEnd ?? start
    const before = textarea.value.slice(0, start)
    const selected = textarea.value.slice(start, end)
    const after = textarea.value.slice(end)
    const nextValue = `${before}${open}${selected}${close}${after}`
    const caretPosition = start + open.length
    const selectionEnd = caretPosition + selected.length

    textarea.value = nextValue
    setPostForm((prev) => ({ ...prev, content: nextValue }))

    requestAnimationFrame(() => {
      if (!contentTextareaRef.current) return
      contentTextareaRef.current.selectionStart = caretPosition
      contentTextareaRef.current.selectionEnd = selectionEnd
      contentTextareaRef.current.focus()
    })
  }

  const getTariffPrice = (planName: string) => tariffs.find((t) => t.name === planName)?.price ?? 0

  const generateKey = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    const segment = () => Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
    return `SPACE-${segment()}-${segment()}-${segment()}`
  }

  const resetKeyForm = () =>
    setKeyForm({
      user: "",
      plan: tariffs[0]?.name ?? defaultTariffName,
      expiresAt: "",
    })

  const handleCreateKey = () => {
    if (!keyForm.plan) return
    const newKey: VPNKey = {
      id: Date.now().toString(),
      key: generateKey(),
      user: keyForm.user,
      plan: keyForm.plan,
      expiresAt: keyForm.expiresAt,
      status: "active",
      createdAt: new Date().toISOString().split("T")[0],
    }
    setKeys([...keys, newKey])
    setShowKeyModal(false)
    resetKeyForm()

    // Add to balance based on plan
    setBalance(balance + getTariffPrice(keyForm.plan))
  }

  const handleUpdateKey = () => {
    if (!editingKey) return
    setKeys(keys.map((k) => (k.id === editingKey.id ? { ...editingKey, ...keyForm, key: editingKey.key } : k)))
    setEditingKey(null)
    setShowKeyModal(false)
    resetKeyForm()
  }

  const handleExtendKey = (id: string) => {
    setKeys(
      keys.map((k) => {
        if (k.id === id) {
          const currentDate = new Date(k.expiresAt)
          currentDate.setMonth(currentDate.getMonth() + 1)
          return { ...k, expiresAt: currentDate.toISOString().split("T")[0], status: "active" }
        }
        return k
      }),
    )
  }

  const handleDeleteKey = (id: string) => {
    setKeys(keys.filter((k) => k.id !== id))
  }

  const handleCreatePost = () => {
    const tags = parseTags(postForm.tags)
    const today = new Date().toISOString().split("T")[0]
    const newPost: BlogPost = {
      id: Date.now().toString(),
      heroHighlight: postForm.heroHighlight,
      heroDescription: postForm.heroDescription,
      title: postForm.title,
      excerpt: postForm.excerpt,
      content: postForm.content,
      tags,
      publishedAt: postForm.publishedAt || today,
      createdAt: today,
      updatedAt: today,
    }
    setPosts([...posts, newPost])
    setShowPostModal(false)
    resetPostForm()
  }

  const handleUpdatePost = () => {
    if (!editingPost) return
    const tags = parseTags(postForm.tags)
    const today = new Date().toISOString().split("T")[0]
    setPosts(
      posts.map((p) =>
        p.id === editingPost.id
          ? {
            ...editingPost,
            heroHighlight: postForm.heroHighlight,
            heroDescription: postForm.heroDescription,
            title: postForm.title,
            excerpt: postForm.excerpt,
            content: postForm.content,
            tags,
            publishedAt: postForm.publishedAt || editingPost.publishedAt,
            updatedAt: today,
          }
          : p,
      ),
    )
    setEditingPost(null)
    setShowPostModal(false)
    resetPostForm()
  }

  const handleDeletePost = (id: string) => {
    setPosts(posts.filter((p) => p.id !== id))
  }

  const resetPostForm = () => setPostForm(createInitialPostForm())
  const parseTags = (raw: string) =>
    raw
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)

  const resetTariffForm = () => setTariffForm({ name: "", durationDays: "30", price: "0", description: "" })

  const normalizeTariffValues = (overrides?: Partial<Tariff>) => {
    const rawDuration = overrides?.durationDays?.toString() ?? tariffForm.durationDays
    const rawPrice = overrides?.price?.toString() ?? tariffForm.price
    return {
      name: (overrides?.name ?? tariffForm.name).trim(),
      durationDays: Math.max(1, Number(rawDuration) || 1),
      price: Math.max(0, Number(rawPrice) || 0),
      description: (overrides?.description ?? tariffForm.description).trim(),
    }
  }

  const handleCreateTariff = () => {
    const normalized = normalizeTariffValues()
    const newTariff: Tariff = {
      id: Date.now().toString(),
      name: normalized.name || `Тариф ${tariffs.length + 1}`,
      durationDays: normalized.durationDays,
      price: normalized.price,
      description: normalized.description,
    }
    setTariffs([...tariffs, newTariff])
    setShowTariffModal(false)
    setEditingTariff(null)
    resetTariffForm()

    // Update default plan option when first tariff is added
    if (!keyForm.plan) {
      setKeyForm({ ...keyForm, plan: newTariff.name })
    }
  }

  const handleUpdateTariff = () => {
    if (!editingTariff) return
    const normalized = normalizeTariffValues({
      name: tariffForm.name || editingTariff.name,
      description: tariffForm.description || editingTariff.description,
    })
    setTariffs(
      tariffs.map((tariff) =>
        tariff.id === editingTariff.id
          ? {
            ...editingTariff,
            name: normalized.name || editingTariff.name,
            durationDays: normalized.durationDays,
            price: normalized.price,
            description: normalized.description || editingTariff.description,
          }
          : tariff,
      ),
    )
    setEditingTariff(null)
    setShowTariffModal(false)
    resetTariffForm()
  }

  const handleDeleteTariff = (id: string) => {
    const remaining = tariffs.filter((tariff) => tariff.id !== id)
    setTariffs(remaining)

    if (!remaining.length) {
      setKeyForm({ ...keyForm, plan: "" })
      return
    }

    if (!remaining.find((tariff) => tariff.name === keyForm.plan)) {
      setKeyForm({ ...keyForm, plan: remaining[0].name })
    }
  }

  const openEditKey = (key: VPNKey) => {
    setEditingKey(key)
    setKeyForm({ user: key.user, plan: key.plan, expiresAt: key.expiresAt })
    setShowKeyModal(true)
  }

  const openEditPost = (post: BlogPost) => {
    setEditingPost(post)
    setPostForm({
      heroHighlight: post.heroHighlight,
      heroDescription: post.heroDescription,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      tags: post.tags.join(", "),
      publishedAt: post.publishedAt,
    })
    setShowPostModal(true)
  }

  const openEditTariff = (tariff: Tariff) => {
    setEditingTariff(tariff)
    setTariffForm({
      name: tariff.name,
      durationDays: tariff.durationDays.toString(),
      price: tariff.price.toString(),
      description: tariff.description,
    })
    setShowTariffModal(true)
  }

  return (
    <div className="min-h-screen bg-background relative">
      <PixelStars />

      {/* Admin Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-primary flex items-center justify-center">
              <span className="text-background text-xs">S</span>
            </div>
            <span className="text-primary text-xs">ADMIN PANEL</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-muted-foreground hover:text-primary text-[10px] flex items-center gap-1">
              <Home size={14} />
              На сайт
            </Link>
            <button className="text-muted-foreground hover:text-primary text-[10px] flex items-center gap-1">
              <LogOut size={14} />
              Выход
            </button>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className="fixed left-0 top-16 bottom-0 w-64 bg-card border-r border-border p-4 z-40">
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab("keys")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-[10px] transition-colors ${activeTab === "keys" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"
                }`}
            >
              <Key size={16} />
              VPN Ключи
            </button>
            <button
              onClick={() => setActiveTab("blog")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-[10px] transition-colors ${activeTab === "blog" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"
                }`}
            >
              <FileText size={16} />
              Блог
            </button>
            <button
              onClick={() => setActiveTab("tariffs")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-[10px] transition-colors ${activeTab === "tariffs" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"
                }`}
            >
              <Layers size={16} />
              Тарифы
            </button>
            <button
              onClick={() => setActiveTab("balance")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-[10px] transition-colors ${activeTab === "balance" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"
                }`}
            >
              <DollarSign size={16} />
              Баланс
            </button>
          </nav>

          {/* Quick Stats */}
          <div className="mt-8 p-4 bg-secondary border border-border">
            <div className="text-[8px] text-muted-foreground mb-2">БАЛАНС</div>
            <div className="text-primary text-lg">{balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽</div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-6 relative z-10">
          {/* Keys Tab */}
          {activeTab === "keys" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-foreground text-sm">VPN КЛЮЧИ</h1>
                <button
                  onClick={() => {
                    setEditingKey(null)
                    resetKeyForm()
                    setShowKeyModal(true)
                  }}
                  className="bg-primary text-primary-foreground px-4 py-2 text-[10px] flex items-center gap-2 hover:bg-primary/80"
                >
                  <Plus size={14} />
                  Создать ключ
                </button>
              </div>

              <div className="bg-card border border-border overflow-hidden">
                <table className="w-full">
                  <thead className="bg-secondary">
                    <tr>
                      <th className="px-4 py-3 text-left text-[8px] text-muted-foreground">КЛЮЧ</th>
                      <th className="px-4 py-3 text-left text-[8px] text-muted-foreground">ПОЛЬЗОВАТЕЛЬ</th>
                      <th className="px-4 py-3 text-left text-[8px] text-muted-foreground">ТАРИФ</th>
                      <th className="px-4 py-3 text-left text-[8px] text-muted-foreground">ИСТЕКАЕТ</th>
                      <th className="px-4 py-3 text-left text-[8px] text-muted-foreground">СТАТУС</th>
                      <th className="px-4 py-3 text-left text-[8px] text-muted-foreground">ДЕЙСТВИЯ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {keys.map((key) => (
                      <tr key={key.id} className="border-t border-border">
                        <td className="px-4 py-3 text-[9px] text-foreground font-mono">{key.key}</td>
                        <td className="px-4 py-3 text-[9px] text-muted-foreground">{key.user}</td>
                        <td className="px-4 py-3 text-[9px] text-foreground">{key.plan}</td>
                        <td className="px-4 py-3 text-[9px] text-muted-foreground">{key.expiresAt}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`text-[8px] px-2 py-1 ${key.status === "active"
                              ? "bg-primary/20 text-primary"
                              : key.status === "expired"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-yellow-500/20 text-yellow-400"
                              }`}
                          >
                            {key.status === "active" ? "Активен" : key.status === "expired" ? "Истек" : "Ожидание"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openEditKey(key)}
                              className="text-muted-foreground hover:text-primary"
                              title="Редактировать"
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              onClick={() => handleExtendKey(key.id)}
                              className="text-muted-foreground hover:text-accent"
                              title="Продлить на месяц"
                            >
                              <RefreshCw size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteKey(key.id)}
                              className="text-muted-foreground hover:text-red-400"
                              title="Удалить"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Blog Tab */}
          {activeTab === "blog" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-foreground text-sm">БЛОГ</h1>
                <button
                  onClick={() => {
                    setEditingPost(null)
                    resetPostForm()
                    setShowPostModal(true)
                  }}
                  className="bg-primary text-primary-foreground px-4 py-2 text-[10px] flex items-center gap-2 hover:bg-primary/80"
                >
                  <Plus size={14} />
                  Создать статью
                </button>
              </div>

              <div className="space-y-4">
                {posts.map((post) => (
                  <div key={post.id} className="bg-card border border-border p-4 flex items-start justify-between">
                    <div>
                      <p className="text-primary text-[8px] uppercase tracking-[0.3em] mb-1">{post.heroHighlight}</p>
                      <p className="text-muted-foreground text-[8px] mb-2">{post.heroDescription}</p>
                      <h3 className="text-foreground text-[11px] mb-1">{post.title}</h3>
                      <p className="text-muted-foreground text-[9px] mb-2">{post.excerpt}</p>
                      <div className="text-[8px] text-muted-foreground mb-1">
                        Дата публикации: {post.publishedAt} • Space VPN Team
                      </div>
                      <div className="text-[8px] text-muted-foreground">Теги: {post.tags.join(", ") || "—"}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEditPost(post)} className="text-muted-foreground hover:text-primary">
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="text-muted-foreground hover:text-red-400"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tariffs Tab */}
          {activeTab === "tariffs" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-foreground text-sm">ТАРИФЫ</h1>
                <button
                  onClick={() => {
                    setEditingTariff(null)
                    resetTariffForm()
                    setShowTariffModal(true)
                  }}
                  className="bg-primary text-primary-foreground px-4 py-2 text-[10px] flex items-center gap-2 hover:bg-primary/80"
                >
                  <Plus size={14} />
                  Добавить тариф
                </button>
              </div>

              <div className="bg-card border border-border overflow-hidden">
                <table className="w-full">
                  <thead className="bg-secondary">
                    <tr>
                      <th className="px-4 py-3 text-left text-[8px] text-muted-foreground">НАЗВАНИЕ</th>
                      <th className="px-4 py-3 text-left text-[8px] text-muted-foreground">СРОК (ДНЕЙ)</th>
                      <th className="px-4 py-3 text-left text-[8px] text-muted-foreground">СТОИМОСТЬ</th>
                      <th className="px-4 py-3 text-left text-[8px] text-muted-foreground">ДЕЙСТВИЯ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tariffs.length ? (
                      tariffs.map((tariff) => (
                        <tr key={tariff.id} className="border-t border-border">
                          <td className="px-4 py-3 text-[9px] text-foreground">
                            <div>{tariff.name}</div>
                            <p className="text-muted-foreground text-[8px] mt-1">{tariff.description || "—"}</p>
                          </td>
                          <td className="px-4 py-3 text-[9px] text-muted-foreground">{tariff.durationDays}</td>
                          <td className="px-4 py-3 text-[9px] text-primary">{tariff.price} ₽</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => openEditTariff(tariff)}
                                className="text-muted-foreground hover:text-primary"
                              >
                                <Edit size={14} />
                              </button>
                              <button
                                onClick={() => handleDeleteTariff(tariff.id)}
                                className="text-muted-foreground hover:text-red-400"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-4 py-6 text-center text-[9px] text-muted-foreground">
                          Тарифы отсутствуют. Добавьте первый тариф, чтобы выдавать ключи.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Balance Tab */}
          {activeTab === "balance" && (
            <div>
              <h1 className="text-foreground text-sm mb-6">БАЛАНС</h1>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-card border border-border p-6">
                  <div className="text-muted-foreground text-[8px] mb-2">ОБЩИЙ БАЛАНС</div>
                  <div className="text-primary text-2xl">{balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽</div>
                </div>
                <div className="bg-card border border-border p-6">
                  <div className="text-muted-foreground text-[8px] mb-2">АКТИВНЫХ КЛЮЧЕЙ</div>
                  <div className="text-accent text-2xl">{keys.filter((k) => k.status === "active").length}</div>
                </div>
                <div className="bg-card border border-border p-6">
                  <div className="text-muted-foreground text-[8px] mb-2">ВСЕГО КЛЮЧЕЙ</div>
                  <div className="text-foreground text-2xl">{keys.length}</div>
                </div>
              </div>

              <div className="bg-card border border-border p-6">
                <h2 className="text-foreground text-[11px] mb-4">ИСТОРИЯ ПОСТУПЛЕНИЙ</h2>
                <div className="space-y-3">
                  {keys.map((key) => (
                    <div key={key.id} className="flex items-center justify-between py-2 border-b border-border">
                      <div>
                        <div className="text-foreground text-[9px]">{key.user}</div>
                        <div className="text-muted-foreground text-[8px]">
                          {key.plan} - {key.createdAt}
                        </div>
                      </div>
                      <div className="text-primary text-[10px]">+{getTariffPrice(key.plan)} ₽</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border p-6 w-full max-w-md">
            <h2 className="text-foreground text-sm mb-4">{editingKey ? "РЕДАКТИРОВАТЬ КЛЮЧ" : "СОЗДАТЬ КЛЮЧ"}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-foreground text-[10px] mb-2">Email пользователя</label>
                <input
                  type="email"
                  value={keyForm.user}
                  onChange={(e) => setKeyForm({ ...keyForm, user: e.target.value })}
                  className="w-full bg-secondary border border-border px-4 py-2 text-foreground text-[10px] focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-foreground text-[10px] mb-2">Тариф</label>
                <select
                  value={keyForm.plan}
                  onChange={(e) => setKeyForm({ ...keyForm, plan: e.target.value })}
                  disabled={!tariffs.length}
                  className="w-full bg-secondary border border-border px-4 py-2 text-foreground text-[10px] focus:outline-none focus:border-primary disabled:opacity-50"
                >
                  {tariffs.length ? (
                    tariffs.map((tariff) => (
                      <option key={tariff.id} value={tariff.name}>
                        {tariff.name} - {tariff.price} ₽
                      </option>
                    ))
                  ) : (
                    <option value="">Нет тарифов</option>
                  )}
                </select>
              </div>
              <div>
                <label className="block text-foreground text-[10px] mb-2">Дата истечения</label>
                <input
                  type="date"
                  value={keyForm.expiresAt}
                  onChange={(e) => setKeyForm({ ...keyForm, expiresAt: e.target.value })}
                  className="w-full bg-secondary border border-border px-4 py-2 text-foreground text-[10px] focus:outline-none focus:border-primary"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setShowKeyModal(false)}
                  className="flex-1 border border-border text-foreground py-2 text-[10px] hover:border-primary"
                >
                  Отмена
                </button>
                <button
                  onClick={editingKey ? handleUpdateKey : handleCreateKey}
                  className="flex-1 bg-primary text-primary-foreground py-2 text-[10px] hover:bg-primary/80"
                >
                  {editingKey ? "Сохранить" : "Создать"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Post Modal */}
      {showPostModal && (
        <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-foreground text-sm mb-4">{editingPost ? "РЕДАКТИРОВАТЬ СТАТЬЮ" : "СОЗДАТЬ СТАТЬЮ"}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-foreground text-[10px] mb-2">Зелёный заголовок</label>
                <input
                  type="text"
                  value={postForm.heroHighlight}
                  onChange={(e) => setPostForm({ ...postForm, heroHighlight: e.target.value })}
                  className="w-full bg-secondary border border-border px-4 py-2 text-foreground text-[10px] focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-foreground text-[10px] mb-2">Серое описание</label>
                <input
                  type="text"
                  value={postForm.heroDescription}
                  onChange={(e) => setPostForm({ ...postForm, heroDescription: e.target.value })}
                  className="w-full bg-secondary border border-border px-4 py-2 text-foreground text-[10px] focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-foreground text-[10px] mb-2">Заголовок</label>
                <input
                  type="text"
                  value={postForm.title}
                  onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                  className="w-full bg-secondary border border-border px-4 py-2 text-foreground text-[10px] focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-foreground text-[10px] mb-2">Краткое описание</label>
                <input
                  type="text"
                  value={postForm.excerpt}
                  onChange={(e) => setPostForm({ ...postForm, excerpt: e.target.value })}
                  className="w-full bg-secondary border border-border px-4 py-2 text-foreground text-[10px] focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <div className="flex flex-col gap-2 mb-2">
                  <label className="text-foreground text-[10px]">Содержание</label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => applyContentFormat("green")}
                      className="px-3 py-1 text-[9px] uppercase tracking-[0.3em] bg-primary/15 text-primary border border-primary/40"
                    >
                      Зеленый
                    </button>
                    <button
                      type="button"
                      onClick={() => applyContentFormat("muted")}
                      className="px-3 py-1 text-[9px] uppercase tracking-[0.3em] bg-secondary text-muted-foreground border border-border"
                    >
                      Серый
                    </button>
                    <button
                      type="button"
                      onClick={() => applyContentFormat("main")}
                      className="px-3 py-1 text-[9px] uppercase tracking-[0.3em] border border-border text-foreground"
                    >
                      Основной
                    </button>
                  </div>
                  <p className="text-muted-foreground text-[8px]">
                    Выделите текст и нажмите кнопку, чтобы применить стиль, или просто вставьте пустой блок — теги [green], [muted],
                    [main] добавятся автоматически.
                  </p>
                </div>
                <textarea
                  ref={contentTextareaRef}
                  value={postForm.content}
                  onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                  rows={8}
                  className="w-full bg-secondary border border-border px-4 py-2 text-foreground text-[10px] focus:outline-none focus:border-primary resize-none"
                />
              </div>
              <div>
                <label className="block text-foreground text-[10px] mb-2">Дата публикации</label>
                <input
                  type="date"
                  value={postForm.publishedAt}
                  onChange={(e) => setPostForm({ ...postForm, publishedAt: e.target.value })}
                  className="w-full bg-secondary border border-border px-4 py-2 text-foreground text-[10px] focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-foreground text-[10px] mb-2">Теги (через запятую)</label>
                <input
                  type="text"
                  value={postForm.tags}
                  onChange={(e) => setPostForm({ ...postForm, tags: e.target.value })}
                  className="w-full bg-secondary border border-border px-4 py-2 text-foreground text-[10px] focus:outline-none focus:border-primary"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setShowPostModal(false)}
                  className="flex-1 border border-border text-foreground py-2 text-[10px] hover:border-primary"
                >
                  Отмена
                </button>
                <button
                  onClick={editingPost ? handleUpdatePost : handleCreatePost}
                  className="flex-1 bg-primary text-primary-foreground py-2 text-[10px] hover:bg-primary/80"
                >
                  {editingPost ? "Сохранить" : "Создать"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tariff Modal */}
      {showTariffModal && (
        <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border p-6 w-full max-w-md">
            <h2 className="text-foreground text-sm mb-4">{editingTariff ? "РЕДАКТИРОВАТЬ ТАРИФ" : "ДОБАВИТЬ ТАРИФ"}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-foreground text-[10px] mb-2">Название</label>
                <input
                  type="text"
                  value={tariffForm.name}
                  onChange={(e) => setTariffForm({ ...tariffForm, name: e.target.value })}
                  className="w-full bg-secondary border border-border px-4 py-2 text-foreground text-[10px] focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-foreground text-[10px] mb-2">Срок (дней)</label>
                <input
                  type="number"
                  min={1}
                  value={tariffForm.durationDays}
                  onChange={(e) => setTariffForm({ ...tariffForm, durationDays: e.target.value })}
                  className="w-full bg-secondary border border-border px-4 py-2 text-foreground text-[10px] focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-foreground text-[10px] mb-2">Стоимость (₽)</label>
                <input
                  type="number"
                  min={0}
                  value={tariffForm.price}
                  onChange={(e) => setTariffForm({ ...tariffForm, price: e.target.value })}
                  className="w-full bg-secondary border border-border px-4 py-2 text-foreground text-[10px] focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-foreground text-[10px] mb-2">Описание</label>
                <textarea
                  value={tariffForm.description}
                  onChange={(e) => setTariffForm({ ...tariffForm, description: e.target.value })}
                  rows={3}
                  className="w-full bg-secondary border border-border px-4 py-2 text-foreground text-[10px] focus:outline-none focus:border-primary resize-none"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => {
                    setShowTariffModal(false)
                    setEditingTariff(null)
                    resetTariffForm()
                  }}
                  className="flex-1 border border-border text-foreground py-2 text-[10px] hover:border-primary"
                >
                  Отмена
                </button>
                <button
                  onClick={editingTariff ? handleUpdateTariff : handleCreateTariff}
                  className="flex-1 bg-primary text-primary-foreground py-2 text-[10px] hover:bg-primary/80"
                >
                  {editingTariff ? "Сохранить" : "Добавить"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
