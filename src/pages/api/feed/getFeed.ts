import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export default async function getFeed(cursor?: string) {
  const token = window.localStorage.getItem(authConfig.storageTokenKeyName)

  return await api.get('/posts', {
    params: cursor ? { cursor } : {},
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
