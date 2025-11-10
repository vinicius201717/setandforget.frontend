/* eslint-disable @typescript-eslint/no-explicit-any */
import likePost from 'src/pages/api/feed/likePost'
import repostPost from 'src/pages/api/feed/repostPost'
import replyPost from 'src/pages/api/feed/replyPost'
import { Post } from 'src/types/apps/feedType'

export function usePostActions(
  posts: Post[],
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>,
) {
  // ✅ Atualiza um post no estado
  const updatePost = (id: string, data: Partial<Post>) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)))
  }

  // ✅ LIKE
  const like = async (id: string) => {
    const post = posts.find((p) => p.id === id)
    if (!post) return

    // Atualização local otimista
    updatePost(id, {
      metrics: {
        ...post.metrics,
        likes: post.metrics.likes + 1,
      },
    })

    try {
      await likePost(id)
    } catch {
      // rollback em caso de erro
      updatePost(id, {
        metrics: {
          ...post.metrics,
          likes: post.metrics.likes,
        },
      })
    }
  }

  // ✅ REPOST
  const repost = async (id: string) => {
    const post = posts.find((p) => p.id === id)
    if (!post) return

    updatePost(id, {
      metrics: {
        ...post.metrics,
        reposts: post.metrics.reposts + 1,
      },
    })

    try {
      await repostPost(id)
    } catch {
      updatePost(id, {
        metrics: {
          ...post.metrics,
          reposts: post.metrics.reposts,
        },
      })
    }
  }

  // ✅ REPLY (comentários)
  //
  // text = texto do comentário
  const reply = async (parentId: string, text: string) => {
    const post = posts.find((p) => p.id === parentId)
    if (!post) return

    // Atualização otimista do contador
    updatePost(parentId, {
      metrics: {
        ...post.metrics,
        replies: post.metrics.replies + 1,
      },
    })

    try {
      const res = await replyPost(parentId, text)
      const createdReply = res.data

      // ✅ Atualiza o feed colocando o novo comentário logo após o pai
      //
      // Se quiser agrupar todos os replies em um novo estado separado,
      // me avise que adapto.
      setPosts((prev) => {
        const newList = [...prev]

        const index = newList.findIndex((p) => p.id === parentId)
        if (index !== -1) {
          newList.splice(index + 1, 0, createdReply)
        }

        return newList
      })

      return createdReply
    } catch (err) {
      // rollback do contador
      updatePost(parentId, {
        metrics: {
          ...post.metrics,
          replies: post.metrics.replies,
        },
      })
      throw err
    }
  }

  return { like, repost, reply }
}
