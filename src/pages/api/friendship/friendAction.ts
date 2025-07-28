import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export async function onFriendAction(
  action: 'add' | 'remove' | 'accept' | 'decline',
  peopleId: string,
  myId: string,
  friendshipId: string | null,
) {
  try {
    const token = window.localStorage.getItem(authConfig.storageTokenKeyName)

    if (!token) {
      console.error('Token not found')
      return
    }

    switch (action) {
      case 'add':
        await api.post(
          `/friendships`,
          {
            requesterId: myId,
            addresseeId: peopleId,
            status: 'PENDING',
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )
        break

      case 'remove':
        await api.delete(`/friendships/${friendshipId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        break

      case 'accept':
        await api.patch(`/friendships/${peopleId}/ACCEPTED`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        break

      case 'decline':
        await api.patch(`/friendships/${peopleId}/DECLINED`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        break
    }
  } catch (error) {
    console.error('Friendship action failed:', error)
  }
}
