import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

interface ApiResponse {
  data: any
  status: number
}
export async function chessChallengeCancel(
  challengeId: string,
  roomId: string,
  amount?: string,
): Promise<ApiResponse | null> {
  try {
    const storedToken = window.localStorage.getItem(
      authConfig.storageTokenKeyName,
    )

    if (!storedToken) {
      throw new Error('Token not found')
    }

    if (challengeId) {
      const response = await api.delete<ApiResponse>(
        `/chess-challenge/${challengeId}/${roomId}/${amount}`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        },
      )

      return response.data
    }

    return null
  } catch (error) {
    console.error('Error cancelling chess challenge:', error)
    return null
  }
}
