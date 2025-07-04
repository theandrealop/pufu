import { Suspense } from "react"
import { notFound } from "next/navigation"
import { getPostBySlug, getRelatedPosts } from "@/lib/graphql-api"
import { BlogPostContent } from "@/components/blog-post-content"
import { RelatedPosts } from "@/components/related-posts"
import { Skeleton } from "@/components/ui/skeleton"
import { SiteNavigation } from "@/components/site-navigation"

interface BlogPostPageProps {
  params: { slug: string }
}

function BlogPostSkeleton() {
  return (
    <div className="min-h-screen bg-cream">
      <SiteNavigation active="blog" />
      <div className="container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto">
          <Skeleton className="h-64 w-full mb-8" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </article>
      </div>
    </div>
  )
}

async function BlogPostPageContent({ slug }: { slug: string }) {
  console.log("Loading blog post with slug:", slug)

  const post = await getPostBySlug(slug)

  if (!post) {
    console.log("Post not found for slug:", slug)
    notFound()
  }

  console.log("Post loaded successfully:", post.title)

  const categoryIds = post.categories.nodes.map((c) => c.slug)
  const relatedPosts = categoryIds.length > 0 ? await getRelatedPosts(categoryIds, post.id, 3) : []

  return (
    <div className="min-h-screen bg-cream">
      <SiteNavigation active="blog" />
      <div className="container mx-auto px-4 py-8">
        <BlogPostContent post={post} />
        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <RelatedPosts posts={relatedPosts} />
          </div>
        )}
      </div>
    </div>
  )
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return (
    <Suspense fallback={<BlogPostSkeleton />}>
      <BlogPostPageContent slug={params.slug} />
    </Suspense>
  )
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  try {
    const post = await getPostBySlug(params.slug)
    if (!post) return { title: "Articolo non trovato - Punti Furbi" }

    const description = post.excerpt.replace(/<[^>]*>/g, "").slice(0, 160)

    return {
      title: `${post.title} - Punti Furbi`,
      description,
      openGraph: {
        title: post.title,
        description,
        images: post.featuredImage?.node?.sourceUrl ? [post.featuredImage.node.sourceUrl] : [],
      },
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {
      title: "Articolo - Punti Furbi",
    }
  }
}
