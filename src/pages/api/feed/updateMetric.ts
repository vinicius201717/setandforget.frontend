import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export default async function updateMetric(
  id: string,
  metric: 'likes' | 'reposts' | 'replies' | 'views',
) {
  const token = window.localStorage.getItem(authConfig.storageTokenKeyName)

  return await api.patch(`/posts/${id}/${metric}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
