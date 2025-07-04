"use client"

import { useState } from "react"
import { type BlogPost, getAllPosts } from "@/lib/graphql-api"
import { BlogCard } from "@/components/blog-card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface BlogListProps {
  initialPosts: BlogPost[]
  hasNextPage: boolean
  endCursor: string | null
}

export function BlogList({
  initialPosts,
  hasNextPage: initialHasNextPage,
  endCursor: initialEndCursor,
}: BlogListProps) {
  const [posts, setPosts] = useState(initialPosts)
  const [hasNextPage, setHasNextPage] = useState(initialHasNextPage)
  const [endCursor, setEndCursor] = useState(initialEndCursor)
  const [loading, setLoading] = useState(false)

  const loadMore = async () => {
    if (!hasNextPage || loading) return

    setLoading(true)
    try {
      const {
        posts: newPosts,
        hasNextPage: newHasNextPage,
        endCursor: newEndCursor,
      } = await getAllPosts(12, endCursor || undefined)

      setPosts((prev) => [...prev, ...newPosts])
      setHasNextPage(newHasNextPage)
      setEndCursor(newEndCursor)
    } catch (error) {
      console.error("Error loading more posts:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {hasNextPage && (
        <div className="text-center mt-8">
          <Button onClick={loadMore} disabled={loading} variant="outline" size="lg">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Caricamento...
              </>
            ) : (
              "Carica altri articoli"
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
