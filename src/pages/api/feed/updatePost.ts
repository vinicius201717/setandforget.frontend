import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export default async function updatePost(id: string, dto: any) {
  const token = window.localStorage.getItem(authConfig.storageTokenKeyName)

  return await api.patch(`/posts/${id}`, dto, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
