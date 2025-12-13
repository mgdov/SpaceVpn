import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PixelStars } from "@/components/pixel-stars"
import { getBlogPost, getRelatedPosts } from "@/lib/blog-data"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, User } from "lucide-react"

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = getBlogPost(Number.parseInt(id))

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(post.id)

  return (
    <div className="min-h-screen bg-background relative">
      <PixelStars />
      <Header />
      <main className="pt-24 pb-20 px-4">
        <article className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground text-[10px] hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад к блогу
          </Link>

          {/* Header */}
          <header className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span key={tag} className="bg-primary/20 text-primary text-[8px] px-2 py-1 border border-primary/30">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-lg md:text-xl text-foreground mb-4 leading-relaxed">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-[9px]">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <User className="w-3 h-3" />
                {post.author}
              </span>
            </div>
          </header>

          {/* Featured Image */}
          <div className="aspect-video bg-card border border-border overflow-hidden mb-8">
            <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
          </div>

          {/* Content */}
          <div className="bg-card border border-border p-6 md:p-8 mb-12">
            <div className="prose prose-invert prose-sm max-w-none">
              {post.content.split("\n").map((paragraph, index) => {
                const trimmed = paragraph.trim()
                if (!trimmed) return null

                if (trimmed.startsWith("## ")) {
                  return (
                    <h2 key={index} className="text-base text-primary mt-8 mb-4 first:mt-0">
                      {trimmed.replace("## ", "")}
                    </h2>
                  )
                }
                if (trimmed.startsWith("### ")) {
                  return (
                    <h3 key={index} className="text-sm text-foreground mt-6 mb-3">
                      {trimmed.replace("### ", "")}
                    </h3>
                  )
                }
                if (trimmed.startsWith("- ")) {
                  return (
                    <li key={index} className="text-muted-foreground text-[10px] ml-4 mb-1">
                      {trimmed
                        .replace("- ", "")
                        .split("**")
                        .map((part, i) =>
                          i % 2 === 1 ? (
                            <strong key={i} className="text-foreground">
                              {part}
                            </strong>
                          ) : (
                            part
                          ),
                        )}
                    </li>
                  )
                }
                return (
                  <p key={index} className="text-muted-foreground text-[10px] leading-relaxed mb-4">
                    {trimmed.split("**").map((part, i) =>
                      i % 2 === 1 ? (
                        <strong key={i} className="text-foreground">
                          {part}
                        </strong>
                      ) : (
                        part
                      ),
                    )}
                  </p>
                )
              })}
            </div>
          </div>

          {/* Share */}
          <div className="bg-card border border-border p-6 mb-12">
            <h3 className="text-sm text-foreground mb-4">Поделиться статьёй</h3>
            <div className="flex gap-3">
              <button className="bg-secondary hover:bg-secondary/80 text-foreground text-[9px] px-4 py-2 border border-border transition-colors">
                Telegram
              </button>
              <button className="bg-secondary hover:bg-secondary/80 text-foreground text-[9px] px-4 py-2 border border-border transition-colors">
                VK
              </button>
              <button className="bg-secondary hover:bg-secondary/80 text-foreground text-[9px] px-4 py-2 border border-border transition-colors">
                Twitter
              </button>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section>
              <h3 className="text-sm text-foreground mb-6">Читайте также</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <article
                    key={relatedPost.id}
                    className="bg-card border border-border overflow-hidden hover:border-primary transition-colors group"
                  >
                    <div className="aspect-video bg-secondary overflow-hidden">
                      <img
                        src={relatedPost.image || "/placeholder.svg"}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-4">
                      <span className="text-muted-foreground text-[8px]">{relatedPost.date}</span>
                      <h4 className="text-foreground text-[10px] mt-2 mb-2 line-clamp-2">{relatedPost.title}</h4>
                      <p className="text-muted-foreground text-[8px] line-clamp-2 mb-4">{relatedPost.excerpt}</p>
                      <Link href={`/blog/${relatedPost.id}`} className="text-primary text-[8px] hover:underline">
                        Читать далее →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* CTA */}
          <div className="mt-12 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30 p-8 text-center">
            <h3 className="text-sm text-foreground mb-2">Защитите себя в интернете</h3>
            <p className="text-muted-foreground text-[9px] mb-6">
              Попробуйте Space VPN бесплатно и убедитесь в качестве нашего сервиса
            </p>
            <Link
              href="/pricing"
              className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground text-[10px] px-6 py-3 transition-colors"
            >
              Выбрать тариф
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
