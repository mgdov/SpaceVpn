"use client"

import { useState } from "react"
import { PixelStars } from "@/components/pixel-stars"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { PostList } from "@/components/admin/blog/post-list"
import { PostModal } from "@/components/admin/blog/post-modal"
import { KeyModal } from "@/components/admin/keys/key-modal"
import { KeyTable } from "@/components/admin/keys/key-table"
import { TariffTable } from "@/components/admin/tariffs/tariff-table"
import { TariffModal } from "@/components/admin/tariffs/tariff-modal"
import { Plus } from "lucide-react"
import type { BlogPost, KeyFormState, PostFormState, Tariff, TariffFormState, VPNKey } from "@/types/admin"

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
  const [keyForm, setKeyForm] = useState<KeyFormState>({
    user: "",
    plan: defaultTariffName,
    expiresAt: "",
  })

  // Post form state
  const createInitialPostForm = (): PostFormState => ({
    heroHighlight: "",
    heroDescription: "",
    title: "",
    excerpt: "",
    content: "",
    tags: "",
    publishedAt: new Date().toISOString().split("T")[0],
  })
  const [postForm, setPostForm] = useState<PostFormState>(createInitialPostForm())

  // Tariff form state
  const [tariffForm, setTariffForm] = useState<TariffFormState>({
    name: "",
    durationDays: "30",
    price: "0",
    description: "",
  })

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

  const closeKeyModal = () => {
    setShowKeyModal(false)
  }

  const closePostModal = () => {
    setShowPostModal(false)
  }

  const closeTariffModal = () => {
    setShowTariffModal(false)
    setEditingTariff(null)
    resetTariffForm()
  }

  return (
    <div className="min-h-screen bg-background relative">
      <PixelStars />

      <AdminHeader />

      <div className="flex pt-16">
        <AdminSidebar activeTab={activeTab} onChange={setActiveTab} balance={balance} />

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
              <KeyTable keys={keys} onEdit={openEditKey} onExtend={handleExtendKey} onDelete={handleDeleteKey} />
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

              <PostList posts={posts} onEdit={openEditPost} onDelete={handleDeletePost} />
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
              <TariffTable tariffs={tariffs} onEdit={openEditTariff} onDelete={handleDeleteTariff} />
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

      <KeyModal
        open={showKeyModal}
        isEditing={Boolean(editingKey)}
        form={keyForm}
        tariffs={tariffs}
        onChange={setKeyForm}
        onSubmit={editingKey ? handleUpdateKey : handleCreateKey}
        onClose={closeKeyModal}
      />

      <PostModal
        open={showPostModal}
        isEditing={Boolean(editingPost)}
        form={postForm}
        onChange={setPostForm}
        onSubmit={editingPost ? handleUpdatePost : handleCreatePost}
        onClose={closePostModal}
      />

      <TariffModal
        open={showTariffModal}
        isEditing={Boolean(editingTariff)}
        form={tariffForm}
        onChange={setTariffForm}
        onSubmit={editingTariff ? handleUpdateTariff : handleCreateTariff}
        onClose={closeTariffModal}
      />
    </div>
  )
}
