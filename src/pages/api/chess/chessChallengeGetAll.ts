import { api } from 'src/lib/axios'

export async function chessChallengeGetAll(): Promise<any> {
  try {
    const response = await api.get(`/chess-challenge`)
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}
