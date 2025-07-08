import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export async function deleteFriendship(friendshipId: string) {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )

  await api.delete(`/friendships/${friendshipId}`, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  })
}
