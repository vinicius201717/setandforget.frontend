import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export default async function deletePost(id: string) {
  const token = window.localStorage.getItem(authConfig.storageTokenKeyName)

  return await api.delete(`/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
