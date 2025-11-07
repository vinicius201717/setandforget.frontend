/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import getFeed from 'src/pages/api/feed/getFeed'
import { Post } from 'src/types/apps/feedType'

export function useFeed() {
  const [posts, setPosts] = useState<Post[]>([])
  const [cursor, setCursor] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const extractItems = (data: any): Post[] => {
    if (!data) return []

    return data
  }

  const extractCursor = (data: any): string | null => {
    if (!data) return null

    return data.nextCursor || data.cursor || null
  }

  const fetchPosts = async () => {
    if (loading) return

    try {
      setLoading(true)

      const res = await getFeed(cursor ?? undefined)
      const data = res.data

      const items = extractItems(data)
      const next = extractCursor(data)

      setPosts((prev) => [...prev, ...items])

      setCursor(next)
      setHasMore(Boolean(next))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return {
    posts,
    setPosts,
    loading,
    hasMore,
    fetchMore: fetchPosts,
  }
}
