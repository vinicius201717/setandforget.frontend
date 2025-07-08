import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export async function createFriendRequest(
  requesterId: string,
  addresseeId: string,
) {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )
  console.log('ok')

  const data = await api.post(
    '/friendships',
    {
      requesterId,
      addresseeId,
      status: 'PENDING',
    },
    {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    },
  )

  return data
}
