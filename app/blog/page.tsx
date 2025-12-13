import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PixelStars } from "@/components/pixel-stars"
import { blogPosts } from "@/lib/blog-data"
import Link from "next/link"

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background relative">
      <PixelStars />
      <Header />
      <main className="pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-accent text-[10px] tracking-widest">[ БЛОГ ]</span>
            <h1 className="text-xl md:text-2xl text-foreground mt-4">
              НОВОСТИ И <span className="text-primary">СТАТЬИ</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-card border border-border overflow-hidden hover:border-primary transition-colors group"
              >
                <div className="aspect-video bg-secondary overflow-hidden">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between text-[8px] mb-2">
                    <span className="text-primary uppercase tracking-[0.25em]">{post.heroHighlight}</span>
                    <span className="text-muted-foreground tracking-normal">
                      {post.publishedAt} • Space VPN Team
                    </span>
                  </div>
                  <p className="text-muted-foreground text-[8px] mb-2">{post.heroDescription}</p>
                  <h2 className="text-foreground text-[10px] mt-2 mb-2 line-clamp-2">{post.title}</h2>
                  <p className="text-muted-foreground text-[8px] line-clamp-2 mb-4">{post.excerpt}</p>
                  <Link href={`/blog/${post.id}`} className="text-primary text-[8px] hover:underline">
                    Читать далее →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
