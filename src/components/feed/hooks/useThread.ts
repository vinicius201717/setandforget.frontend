import { useEffect, useState } from 'react'
import getPost from 'src/pages/api/feed/getPost'
import getReplies from 'src/pages/api/feed/getReplies'
import { Post } from 'src/types/apps/feedType'

export function useThread(id: string) {
  const [post, setPost] = useState<Post | null>(null)
  const [replies, setReplies] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  const fetchThread = async () => {
    try {
      setLoading(true)

      const [postRes, repliesRes] = await Promise.all([
        getPost(id),
        getReplies(id),
      ])

      setPost(postRes.data)
      setReplies(repliesRes.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchThread()
  }, [id])

  return {
    post,
    replies,
    loading,
    refresh: fetchThread,
  }
}
