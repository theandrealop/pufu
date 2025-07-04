import Link from "next/link"
import type { BlogPost } from "@/lib/graphql-api"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"

interface RelatedPostsProps {
  posts: BlogPost[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("it-IT", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (posts.length === 0) return null

  return (
    <section className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Articoli correlati</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Card key={post.id} className="h-full hover:shadow-lg transition-shadow">
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
                  {post.categories.nodes.slice(0, 1).map((category) => (
                    <Badge key={category.slug} variant="secondary" className="text-xs">
                      {category.name}
                    </Badge>
                  ))}
                </div>

                <h3 className="text-lg font-semibold line-clamp-2 hover:text-primary transition-colors">
                  {post.title}
                </h3>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(post.date)}</span>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  )
}
