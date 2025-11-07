import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export default async function getPost(id: string) {
  const token = window.localStorage.getItem(authConfig.storageTokenKeyName)

  return await api.get(`/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
