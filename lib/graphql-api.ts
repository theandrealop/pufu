const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || "https://puntifurbi.com/graphql"

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  date: string
  author: {
    node: {
      name: string
    }
  }
  categories: {
    nodes: Array<{
      name: string
      slug: string
    }>
  }
  tags: {
    nodes: Array<{
      name: string
      slug: string
    }>
  }
  featuredImage?: {
    node: {
      sourceUrl: string
      altText: string
    }
  }
}

export interface BlogPostsResponse {
  posts: {
    nodes: BlogPost[]
  }
}

export interface SinglePostResponse {
  post: BlogPost
}

// --- types --------------------------------------------------------------
export interface PaginatedPostsResult {
  posts: BlogPost[]
  hasNextPage: boolean
  endCursor: string | null
}

// --- new util -----------------------------------------------------------
/**
 * Fetches a paginated list of published posts, mirroring the old API
 * (`getAllPosts`) that other components import.
 */
export async function getAllPosts(first = 10, after?: string): Promise<PaginatedPostsResult> {
  const query = `
    query GetAllPosts($first: Int!, $after: String) {
      posts(first: $first, after: $after, where: { status: PUBLISH }) {
        nodes {
          id
          title
          slug
          excerpt
          date
          author { node { name } }
          categories { nodes { name slug } }
          featuredImage { node { sourceUrl altText } }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `

  const data: {
    posts: {
      nodes: BlogPost[]
      pageInfo: { hasNextPage: boolean; endCursor: string | null }
    }
  } = await fetchGraphQL(query, { first, after })

  return {
    posts: data.posts.nodes,
    hasNextPage: data.posts.pageInfo.hasNextPage,
    endCursor: data.posts.pageInfo.endCursor,
  }
}

async function fetchGraphQL(query: string, variables: any = {}) {
  try {
    const response = await fetch(WORDPRESS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      next: { revalidate: 300 }, // Cache for 5 minutes
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const json = await response.json()

    if (json.errors) {
      console.error("GraphQL errors:", json.errors)
      throw new Error("GraphQL query failed")
    }

    return json.data
  } catch (error) {
    console.error("GraphQL fetch error:", error)
    throw error
  }
}

export async function getBlogPosts(first = 10): Promise<BlogPost[]> {
  const query = `
    query GetPosts($first: Int!) {
      posts(first: $first, where: { status: PUBLISH }) {
        nodes {
          id
          title
          slug
          excerpt
          date
          author {
            node {
              name
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
  `

  const data: BlogPostsResponse = await fetchGraphQL(query, { first })
  return data.posts.nodes
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const query = `
    query GetPostBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        id
        title
        slug
        excerpt
        content
        date
        author {
          node {
            name
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        tags {
          nodes {
            name
            slug
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  `

  try {
    const data: SinglePostResponse = await fetchGraphQL(query, { slug })
    return data.post
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error)
    return null
  }
}

export async function getRelatedPosts(categoryIds: string[], excludeId: string, limit = 3): Promise<BlogPost[]> {
  const query = `
    query GetRelatedPosts($categoryIds: [ID], $excludeId: ID!, $limit: Int!) {
      posts(
        first: $limit
        where: {
          status: PUBLISH
          categoryIn: $categoryIds
          notIn: [$excludeId]
        }
      ) {
        nodes {
          id
          title
          slug
          excerpt
          date
          author {
            node {
              name
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
  `

  try {
    const data: BlogPostsResponse = await fetchGraphQL(query, {
      categoryIds,
      excludeId,
      limit,
    })
    return data.posts.nodes
  } catch (error) {
    console.error("Error fetching related posts:", error)
    return []
  }
}
