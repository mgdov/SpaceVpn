"use client"

import { useEffect, useMemo, useState } from "react"
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
import type { BlogPost, KeyFormState, PostFormState, TariffFormState } from "@/types/admin"
import {
  adminListVPNClients,
  adminCreateVPNClient,
  adminUpdateVPNClient,
  adminDeleteVPNClient,
  adminExtendVPNClient,
  adminToggleVPNClient,
  adminListTariffs,
  adminCreateTariff,
  adminUpdateTariff,
  adminDeleteTariff,
  adminToggleTariff,
  adminListUsers,
  adminListSubscriptions,
  type AdminVPNClient,
  type Tariff as ApiTariff,
  type User,
  type AdminSubscription,
} from "@/lib/api"

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

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"keys" | "blog" | "tariffs" | "balance">("keys")
  const [vpnClients, setVpnClients] = useState<AdminVPNClient[]>([])
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts)
  const [tariffs, setTariffs] = useState<ApiTariff[]>([])
  const [subscriptions, setSubscriptions] = useState<AdminSubscription[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [keysLoading, setKeysLoading] = useState(true)
  const [tariffsLoading, setTariffsLoading] = useState(true)
  const [subscriptionsLoading, setSubscriptionsLoading] = useState(true)
  const [usersLoading, setUsersLoading] = useState(true)
  const [keysError, setKeysError] = useState("")
  const [tariffsError, setTariffsError] = useState("")
  const [balanceError, setBalanceError] = useState("")
  const [showKeyModal, setShowKeyModal] = useState(false)
  const [showPostModal, setShowPostModal] = useState(false)
  const [showTariffModal, setShowTariffModal] = useState(false)
  const [editingKey, setEditingKey] = useState<AdminVPNClient | null>(null)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [editingTariff, setEditingTariff] = useState<ApiTariff | null>(null)

  // Key form state
  const [keyForm, setKeyForm] = useState<KeyFormState>({
    userId: "",
    name: "",
    deviceInfo: "",
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
  const resetKeyForm = () =>
    setKeyForm({
      userId: users[0]?.id ?? "",
      name: "",
      deviceInfo: "",
      expiresAt: "",
    })

  const formatDate = (dateString?: string) => {
    if (!dateString) return "—"
    return new Date(dateString).toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const refreshKeys = async () => {
    setKeysLoading(true)
    const response = await adminListVPNClients()
    if (response.data) {
      setVpnClients(response.data)
      setKeysError("")
    } else {
      setKeysError(response.error || "Не удалось загрузить VPN ключи")
    }
    setKeysLoading(false)
  }

  const refreshTariffs = async () => {
    setTariffsLoading(true)
    const response = await adminListTariffs()
    if (response.data) {
      setTariffs(response.data)
      setTariffsError("")
    } else {
      setTariffsError(response.error || "Не удалось загрузить тарифы")
    }
    setTariffsLoading(false)
  }

  const refreshSubscriptions = async () => {
    setSubscriptionsLoading(true)
    const response = await adminListSubscriptions()
    if (response.data) {
      setSubscriptions(response.data)
      setBalanceError("")
    } else {
      setBalanceError(response.error || "Не удалось загрузить подписки")
    }
    setSubscriptionsLoading(false)
  }

  const refreshUsers = async () => {
    setUsersLoading(true)
    const response = await adminListUsers()
    if (response.data) {
      setUsers(response.data)
    }
    setUsersLoading(false)
  }

  useEffect(() => {
    refreshKeys()
    refreshTariffs()
    refreshSubscriptions()
    refreshUsers()
  }, [])

  useEffect(() => {
    setKeyForm((prev) => (prev.userId ? prev : { ...prev, userId: users[0]?.id ?? "" }))
  }, [users])

  const handleSaveKey = async () => {
    if (!keyForm.userId) {
      setKeysError("Выберите пользователя")
      return
    }

    const payload = {
      user_id: keyForm.userId,
      name: keyForm.name || undefined,
      device_info: keyForm.deviceInfo || undefined,
      expires_at: keyForm.expiresAt || undefined,
    }

    const response = editingKey
      ? await adminUpdateVPNClient(editingKey.id, payload)
      : await adminCreateVPNClient(payload)

    if (response.error) {
      setKeysError(response.error)
      return
    }

    setShowKeyModal(false)
    setEditingKey(null)
    resetKeyForm()
    refreshKeys()
  }

  const handleExtendKey = async (id: string) => {
    const response = await adminExtendVPNClient(id)
    if (response.error) {
      setKeysError(response.error)
    }
    refreshKeys()
  }

  const handleDeleteKey = async (id: string) => {
    const response = await adminDeleteVPNClient(id)
    if (response.error) {
      setKeysError(response.error)
    }
    refreshKeys()
  }

  const handleToggleKey = async (id: string) => {
    const response = await adminToggleVPNClient(id)
    if (response.error) {
      setKeysError(response.error)
    }
    refreshKeys()
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

  const normalizeTariffValues = (overrides?: Partial<ApiTariff>) => {
    const rawDuration = overrides?.duration_days?.toString() ?? tariffForm.durationDays
    const rawPrice = overrides?.price?.toString() ?? tariffForm.price
    return {
      name: (overrides?.name ?? tariffForm.name).trim(),
      durationDays: Math.max(1, Number(rawDuration) || 1),
      price: Math.max(0, Number(rawPrice) || 0),
      description: (overrides?.description ?? tariffForm.description).trim(),
    }
  }

  const handleCreateTariff = async () => {
    const normalized = normalizeTariffValues()
    const response = await adminCreateTariff({
      name: normalized.name || `Тариф ${tariffs.length + 1}`,
      duration_days: normalized.durationDays,
      price: normalized.price,
      description: normalized.description,
    })

    if (response.error) {
      setTariffsError(response.error)
      return
    }

    setShowTariffModal(false)
    setEditingTariff(null)
    resetTariffForm()
    refreshTariffs()
    refreshSubscriptions()
  }

  const handleUpdateTariff = async () => {
    if (!editingTariff) return
    const normalized = normalizeTariffValues({
      name: tariffForm.name || editingTariff.name,
      description: tariffForm.description || editingTariff.description,
    })

    const response = await adminUpdateTariff(editingTariff.id, {
      name: normalized.name,
      duration_days: normalized.durationDays,
      price: normalized.price,
      description: normalized.description,
    })

    if (response.error) {
      setTariffsError(response.error)
      return
    }

    setEditingTariff(null)
    setShowTariffModal(false)
    resetTariffForm()
    refreshTariffs()
    refreshSubscriptions()
  }

  const handleDeleteTariff = async (id: string) => {
    const response = await adminDeleteTariff(id)
    if (response.error) {
      setTariffsError(response.error)
    }
    refreshTariffs()
    refreshSubscriptions()
  }

  const handleToggleTariff = async (id: string) => {
    const response = await adminToggleTariff(id)
    if (response.error) {
      setTariffsError(response.error)
    }
    refreshTariffs()
  }

  const openEditKey = (key: AdminVPNClient) => {
    setEditingKey(key)
    setKeyForm({
      userId: key.user_id,
      name: key.name || "",
      deviceInfo: key.device_info || "",
      expiresAt: key.expiry_date ? key.expiry_date.split("T")[0] : "",
    })
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

  const openEditTariff = (tariff: ApiTariff) => {
    setEditingTariff(tariff)
    setTariffForm({
      name: tariff.name,
      durationDays: tariff.duration_days.toString(),
      price: tariff.price.toString(),
      description: tariff.description,
    })
    setShowTariffModal(true)
  }

  const closeKeyModal = () => {
    setShowKeyModal(false)
    setEditingKey(null)
    setKeysError("")
    resetKeyForm()
  }

  const closePostModal = () => {
    setShowPostModal(false)
  }

  const closeTariffModal = () => {
    setShowTariffModal(false)
    setEditingTariff(null)
    resetTariffForm()
  }

  const balance = useMemo(() => {
    return subscriptions.reduce((acc, subscription) => {
      const matchedTariff = tariffs.find((tariff) => tariff.id === subscription.tariff_id)
      return acc + (matchedTariff?.price ?? 0)
    }, 0)
  }, [subscriptions, tariffs])

  const activeKeys = vpnClients.filter((client) => client.is_active).length
  const totalKeys = vpnClients.length
  const activeSubscriptions = subscriptions.filter((subscription) => subscription.is_active).length
  const latestSubscriptions = [...subscriptions].sort((a, b) => {
    const aDate = new Date(a.created_at || a.start_date).getTime()
    const bDate = new Date(b.created_at || b.start_date).getTime()
    return bDate - aDate
  }).slice(0, 10)

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
              {keysError && <p className="text-red-400 text-[10px] mb-3">{keysError}</p>}
              {keysLoading ? (
                <div className="bg-card border border-border p-6 text-[10px] text-muted-foreground">Загрузка ключей...</div>
              ) : (
                <KeyTable
                  keys={vpnClients}
                  onEdit={openEditKey}
                  onExtend={handleExtendKey}
                  onDelete={handleDeleteKey}
                  onToggle={handleToggleKey}
                />
              )}
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
              {tariffsError && <p className="text-red-400 text-[10px] mb-3">{tariffsError}</p>}
              {tariffsLoading ? (
                <div className="bg-card border border-border p-6 text-[10px] text-muted-foreground">Загрузка тарифов...</div>
              ) : (
                <TariffTable tariffs={tariffs} onEdit={openEditTariff} onDelete={handleDeleteTariff} onToggle={handleToggleTariff} />
              )}
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
                  <div className="text-accent text-2xl">{activeKeys}</div>
                </div>
                <div className="bg-card border border-border p-6">
                  <div className="text-muted-foreground text-[8px] mb-2">АКТИВНЫХ ПОДПИСОК</div>
                  <div className="text-foreground text-2xl">{activeSubscriptions}</div>
                </div>
              </div>

              <div className="bg-card border border-border p-6">
                <h2 className="text-foreground text-[11px] mb-4">ИСТОРИЯ ПОСТУПЛЕНИЙ</h2>
                {balanceError && <p className="text-red-400 text-[10px] mb-3">{balanceError}</p>}
                {subscriptionsLoading ? (
                  <div className="text-muted-foreground text-[10px]">Загрузка подписок...</div>
                ) : (
                  <div className="space-y-3">
                    {latestSubscriptions.map((subscription) => {
                      const tariff = tariffs.find((item) => item.id === subscription.tariff_id)
                      return (
                        <div key={subscription.id} className="flex items-center justify-between py-2 border-b border-border">
                          <div>
                            <div className="text-foreground text-[9px]">{subscription.user?.email || subscription.user_id}</div>
                            <div className="text-muted-foreground text-[8px]">
                              {(tariff?.name || subscription.tariff_id || "Тариф")} • {formatDate(subscription.created_at || subscription.start_date)}
                            </div>
                          </div>
                          <div className="text-primary text-[10px]">+{tariff?.price ?? 0} ₽</div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      <KeyModal
        open={showKeyModal}
        isEditing={Boolean(editingKey)}
        form={keyForm}
        users={users}
        onChange={setKeyForm}
        onSubmit={handleSaveKey}
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
