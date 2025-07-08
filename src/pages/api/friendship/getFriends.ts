import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export async function getFriends(userId: string) {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )

  const data = await api.get(`/friendships/${userId}`, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  })

  return data
}
