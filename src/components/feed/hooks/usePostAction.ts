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

    const reactions = Array.isArray(post.postReactions)
      ? post.postReactions
      : []

    const current = reactions.find((r) => r.userId === post.author.id)

    const alreadyLiked = current?.liked === true

    updateMetrics(id, {
      likes: post.metrics.likes + (alreadyLiked ? -1 : 1),
    })

    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              postReactions: [
                {
                  id: current?.id ?? 'temp-id',
                  postId: p.id,
                  userId: current?.userId ?? post.author.id,
                  liked: !alreadyLiked,
                  reposted: current?.reposted ?? false,
                  createdAt: current?.createdAt ?? new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                },
              ],
            }
          : p,
      ),
    )

    await likePost(id)
  }

  const repost = async (id: string) => {
    const post = posts.find((p) => p.id === id)
    if (!post) return

    const reactions = Array.isArray(post.postReactions)
      ? post.postReactions
      : []

    const current = reactions.find((r) => r.userId === post.author.id)

    const alreadyReposted = current?.reposted === true

    updateMetrics(id, {
      reposts: post.metrics.reposts + (alreadyReposted ? -1 : 1),
    })

    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              postReactions: [
                {
                  id: current?.id ?? 'temp-id',
                  postId: p.id,
                  userId: current?.userId ?? post.author.id,
                  liked: current?.liked ?? false,
                  reposted: !alreadyReposted,
                  createdAt: current?.createdAt ?? new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                },
              ],
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
