export interface VPNKey {
    id: string
    key: string
    user: string
    plan: string
    expiresAt: string
    status: "active" | "expired" | "pending"
    createdAt: string
}

export interface BlogPost {
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

export interface Tariff {
    id: string
    name: string
    durationDays: number
    price: number
    description: string
}

export interface KeyFormState {
    user: string
    plan: string
    expiresAt: string
}

export interface PostFormState {
    heroHighlight: string
    heroDescription: string
    title: string
    excerpt: string
    content: string
    tags: string
    publishedAt: string
}

export interface TariffFormState {
    name: string
    durationDays: string
    price: string
    description: string
}

export type ContentFormat = "green" | "muted" | "main"
