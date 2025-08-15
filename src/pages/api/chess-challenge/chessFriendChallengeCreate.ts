/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

type chessChallengeCreateType = {
  duration: number
  amount: number
  userId: string
  peace: string
}
export async function chessFriendChallengeCreate(
  data: chessChallengeCreateType,
): Promise<any> {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )
  try {
    const response = await api.post('/chess-challenge/friend-challenge', data, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    })

    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}
