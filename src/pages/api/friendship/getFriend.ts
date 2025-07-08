import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export async function getFriendshipBetweenUsers(
  userId1: string,
  userId2: string,
) {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )

  const { data } = await api.get(`/friendships/between/${userId1}/${userId2}`, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  })

  return data
}
