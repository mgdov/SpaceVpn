export interface BlogPost {
    id: string
    heroHighlight: string
    heroDescription: string
    title: string
    excerpt: string
    content: string
    tags: string[]
    author: string
    image?: string
    publishedAt: string
    createdAt: string
    updatedAt: string
}

export interface KeyFormState {
    userId: string
    name: string
    deviceInfo: string
    expiresAt: string
}

export interface PostFormState {
    heroHighlight: string
    heroDescription: string
    title: string
    excerpt: string
    content: string
    tags: string
    author: string
    image: string
    publishedAt: string
}

export interface TariffFormState {
    name: string
    durationDays: string
    price: string
    description: string
}

export type ContentFormat = "green" | "muted" | "main"
