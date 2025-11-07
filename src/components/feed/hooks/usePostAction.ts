/* eslint-disable no-unused-vars */
import likePost from 'src/pages/api/feed/likePost'
import repostPost from 'src/pages/api/feed/repostPost'
import replyPost from 'src/pages/api/feed/replyPost'
import { Post } from 'src/types/apps/feedType'

export function usePostActions(
  posts: Post[],
  setPosts: (posts: Post[]) => void,
) {
  const updatePost = (id: string, data: Partial<Post>) =>
    setPosts(posts.map((p) => (p.id === id ? { ...p, ...data } : p)))

  const like = async (id: string) => {
    const post = posts.find((p) => p.id === id)
    if (!post) return

    // updatePost(id, {
    //   userReactions: {
    //     ...post.userReactions,
    //     liked: true,
    //   },
    //   metrics: {
    //     ...post.metrics,
    //     likes: post.metrics.likes + 1,
    //   },
    // })

    await likePost(id)
  }

  const repost = async (id: string) => {
    await repostPost(id)
  }

  const reply = async (id: string, text: string) => {
    await replyPost(id, text)
  }

  return { like, repost, reply }
}
