import { Edit, Trash2 } from "lucide-react"
import type { BlogPost } from "@/types/admin"

interface PostListProps {
    posts: BlogPost[]
    onEdit: (post: BlogPost) => void
    onDelete: (id: string) => void
}

export function PostList({ posts, onEdit, onDelete }: PostListProps) {
    return (
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
                        <button onClick={() => onEdit(post)} className="text-muted-foreground hover:text-primary">
                            <Edit size={14} />
                        </button>
                        <button onClick={() => onDelete(post.id)} className="text-muted-foreground hover:text-red-400">
                            <Trash2 size={14} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}
