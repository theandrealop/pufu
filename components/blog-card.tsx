import Link from "next/link"
import type { BlogPost } from "@/lib/graphql-api"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Calendar, User } from "lucide-react"

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("it-IT", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <Link href={`/blog/${post.slug}`}>
        {post.featuredImage?.node?.sourceUrl && (
          <div className="relative aspect-video overflow-hidden rounded-t-lg">
            <img
              src={post.featuredImage.node.sourceUrl || "/placeholder.svg"}
              alt={post.featuredImage.node.altText || post.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        <CardHeader className="pb-2">
          <div className="flex flex-wrap gap-2 mb-2">
            {post.categories.nodes.slice(0, 2).map((category) => (
              <Badge key={category.slug} variant="secondary" className="text-xs">
                {category.name}
              </Badge>
            ))}
          </div>

          <h3 className="text-xl font-semibold line-clamp-2 hover:text-primary transition-colors">{post.title}</h3>
        </CardHeader>

        <CardContent className="pt-0">
          <div
            className="text-muted-foreground text-sm line-clamp-3 mb-4"
            dangerouslySetInnerHTML={{
              __html: post.excerpt.replace(/<[^>]*>/g, "").slice(0, 150) + "...",
            }}
          />

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(post.date)}</span>
            </div>

            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <span>{post.author.node.name}</span>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
