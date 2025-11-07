import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export default async function getReplies(postId: string) {
  const token = window.localStorage.getItem(authConfig.storageTokenKeyName)

  return await api.get(`/posts/${postId}/replies`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}
