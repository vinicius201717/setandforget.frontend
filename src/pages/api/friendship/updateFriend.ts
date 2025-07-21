import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export async function updateFriendshipStatus(
  friendshipId: string,
  status: 'ACCEPTED' | 'DECLINED' | 'PENDING',
  notificationId: string,
) {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )
  const response = await api.patch(
    `/friendships/${friendshipId}/${status}/${notificationId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    },
  )

  return response.data
}
