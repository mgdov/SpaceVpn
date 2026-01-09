import { Edit, Trash2, Calendar, User, Tag } from "lucide-react"
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
                <div key={post.id} className="bg-card border border-border overflow-hidden hover:border-primary/50 transition-colors">
                    <div className="flex">
                        {/* Изображение */}
                        {post.image && (
                            <div className="w-48 h-32 bg-secondary shrink-0">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        {/* Контент */}
                        <div className="flex-1 p-4 flex items-start justify-between">
                            <div className="flex-1">
                                {/* Hero section */}
                                {(post.heroHighlight || post.heroDescription) && (
                                    <div className="mb-2">
                                        {post.heroHighlight && (
                                            <span className="text-primary text-[11px] font-bold uppercase">{post.heroHighlight}</span>
                                        )}
                                        {post.heroDescription && (
                                            <span className="text-muted-foreground text-[10px] ml-2">{post.heroDescription}</span>
                                        )}
                                    </div>
                                )}

                                <h3 className="text-foreground text-sm font-medium mb-2">{post.title}</h3>
                                <p className="text-muted-foreground text-[10px] mb-3 line-clamp-2">{post.excerpt}</p>

                                <div className="flex flex-wrap gap-3 text-[9px] text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <Calendar size={12} />
                                        {post.publishedAt}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <User size={12} />
                                        {post.author}
                                    </div>
                                    {post.tags.length > 0 && (
                                        <div className="flex items-center gap-1">
                                            <Tag size={12} />
                                            {post.tags.join(", ")}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Действия */}
                            <div className="flex items-center gap-2 ml-4">
                                <button
                                    onClick={() => onEdit(post)}
                                    className="text-muted-foreground hover:text-primary transition-colors p-2"
                                    title="Редактировать"
                                >
                                    <Edit size={16} />
                                </button>
                                <button
                                    onClick={() => onDelete(post.id)}
                                    className="text-muted-foreground hover:text-red-400 transition-colors p-2"
                                    title="Удалить"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
