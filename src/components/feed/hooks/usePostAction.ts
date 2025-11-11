/* eslint-disable @typescript-eslint/no-explicit-any */
import likePost from 'src/pages/api/feed/likePost'
import repostPost from 'src/pages/api/feed/repostPost'
import replyPost from 'src/pages/api/feed/replyPost'
import { Post } from 'src/types/apps/feedType'

export function usePostActions(
  posts: Post[],
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>,
) {
  const updateMetrics = (id: string, newMetrics: any) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, metrics: { ...p.metrics, ...newMetrics } } : p,
      ),
    )
  }

  const like = async (id: string) => {
    const post = posts.find((p) => p.id === id)
    if (!post) return

    const alreadyLiked = post.userReactions?.liked === true

    // ✅ Atualiza estado local
    updateMetrics(id, {
      likes: post.metrics.likes + (alreadyLiked ? -1 : 1),
    })

    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              userReactions: {
                ...(p.userReactions ?? {}),
                liked: !alreadyLiked,
              },
            }
          : p,
      ),
    )

    // ✅ chama API
    await likePost(id)
  }

  const repost = async (id: string) => {
    const post = posts.find((p) => p.id === id)
    if (!post) return

    const alreadyReposted = post.userReactions?.reposted === true

    updateMetrics(id, {
      reposts: post.metrics.reposts + (alreadyReposted ? -1 : 1),
    })

    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              userReactions: {
                ...(p.userReactions ?? {}),
                reposted: !alreadyReposted,
              },
            }
          : p,
      ),
    )

    await repostPost(id)
  }

  const reply = async (parentId: string, text: string) => {
    const newReply = await replyPost(parentId, text)
    return newReply
  }

  return { like, repost, reply }
}
