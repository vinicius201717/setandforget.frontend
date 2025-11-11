/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import FallbackSpinner from 'src/@core/components/spinner'
import PostCard from 'src/components/feed/PostCard/PostCard'
import ReplyCard from 'src/components/feed/PostCard/ReplyCard'
import ReplyComposer from 'src/components/feed/ReplyComposer'
import getPost from 'src/pages/api/feed/getPost'
import getReplies from 'src/pages/api/feed/getReplies'
import { Post } from 'src/types/apps/feedType'

export default function PostPage() {
  const router = useRouter()
  const { id } = router.query

  const [post, setPost] = useState<Post>()
  const [replies, setReplies] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    async function load() {
      const main = await getPost(id as string)
      const rep = await getReplies(id as string)

      setPost(main.data)
      setReplies(rep.data)
      setLoading(false)
    }

    load()
  }, [id])

  if (loading) return <div>Carregando...</div>

  return (
    <div style={{ padding: 20 }}>
      {post ? (
        <PostCard post={post} setPosts={() => {}} compact={true} />
      ) : (
        <FallbackSpinner />
      )}

      <h3 style={{ marginTop: 40 }}>{replies.length} respostas</h3>

      {replies.map((r) => (
        <ReplyCard key={r.id} reply={r} />
      ))}

      <ReplyComposer
        parentId={post?.id}
        onReplyCreated={(newReply: any) =>
          setReplies((prev) => [...prev, newReply])
        }
      />
    </div>
  )
}
