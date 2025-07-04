import type { BlogPost } from "@/lib/graphql-api"
import { Badge } from "@/components/ui/badge"
import { Calendar, User } from "lucide-react"

interface BlogPostContentProps {
  post: BlogPost
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("it-IT", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <article className="max-w-4xl mx-auto">
      {/* Featured Image */}
      {post.featuredImage?.node?.sourceUrl && (
        <div className="relative aspect-video mb-8 overflow-hidden rounded-lg">
          <img
            src={post.featuredImage.node.sourceUrl || "/placeholder.svg"}
            alt={post.featuredImage.node.altText || post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Article Header */}
      <header className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.categories.nodes.map((category) => (
            <Badge key={category.slug} variant="secondary">
              {category.name}
            </Badge>
          ))}
        </div>

        <h1 className="text-4xl font-bold mb-4 leading-tight">{post.title}</h1>

        <div className="flex items-center gap-6 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(post.date)}</span>
          </div>

          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{post.author.node.name}</span>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <div
        className="prose prose-lg max-w-none prose-headings:font-semibold prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-pre:bg-muted prose-pre:border"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Tags */}
      {post.tags.nodes.length > 0 && (
        <div className="mt-8 pt-8 border-t">
          <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">Tag</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.nodes.map((tag) => (
              <Badge key={tag.slug} variant="outline" className="text-xs">
                {tag.name}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
