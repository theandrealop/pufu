import { Suspense } from "react"
import { getAllPosts } from "@/lib/graphql-api"
import { BlogList } from "@/components/blog-list"
import { SiteNavigation } from "@/components/site-navigation"
import { NewsletterPopup } from "@/components/newsletter-popup"
import { Skeleton } from "@/components/ui/skeleton"

function BlogSkeleton() {
  return (
    <div className="min-h-screen bg-cream">
      <SiteNavigation active="blog" />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Skeleton className="h-12 w-48 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-4">
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

async function BlogPageContent() {
  try {
    const { posts, hasNextPage, endCursor } = await getAllPosts(12)

    return (
      <div className="min-h-screen bg-cream">
        <SiteNavigation active="blog" />
        <NewsletterPopup />

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Blog</h1>
            <BlogList initialPosts={posts} hasNextPage={hasNextPage} endCursor={endCursor} />
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error loading blog posts:", error)
    return (
      <div className="min-h-screen bg-cream">
        <SiteNavigation active="blog" />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-semibold mb-4">Blog non disponibile</h1>
            <p className="text-muted-foreground">Il blog non è al momento disponibile.</p>
          </div>
        </div>
      </div>
    )
  }
}

export default function BlogPage() {
  return (
    <Suspense fallback={<BlogSkeleton />}>
      <BlogPageContent />
    </Suspense>
  )
}

export const metadata = {
  title: "Blog - Punti Furbi",
  description: "Scopri i nostri articoli su viaggi, punti fedeltà e offerte esclusive.",
}
