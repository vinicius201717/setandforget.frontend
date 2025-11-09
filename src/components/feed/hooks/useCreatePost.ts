/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import createPost from 'src/pages/api/feed/createPost'

export function useCreatePost() {
  const [loading, setLoading] = useState(false)

  const submit = async (
    text: string,
    media: File[],
    parentId?: string | null,
    tags?: string[] | null,
    pair?: string | null,
  ) => {
    try {
      setLoading(true)

      const payload: any = { text }

      if (media.length > 0) payload.media = media
      if (parentId) payload.parentId = parentId
      if (tags) payload.tags = tags
      if (pair) payload.pair = pair

      const res = await createPost(payload)
      return res.data
    } catch (err) {
      console.error('Erro ao criar post:', err)
      return null
    } finally {
      setLoading(false)
    }
  }

  return {
    submit,
    loading,
  }
}
