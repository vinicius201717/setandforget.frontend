import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

type chessChallengeCreateType = {
  duration: number
  amount: number
}
export async function chessChallengeCreate(
  data: chessChallengeCreateType,
): Promise<any> {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )
  try {
    const response = await api.post('/chess-challenge', data, {
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
