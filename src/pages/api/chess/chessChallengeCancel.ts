import { api } from 'src/lib/axios'

export async function chessChallengeCancel(): Promise<any> {
  try {
    const challengeId = window.localStorage.getItem('chess-challenge-id')
    if (challengeId) {
      const response = await api.delete(`/chess-challenge/${challengeId}`)

      return response
    }
  } catch (error) {
    console.error(error)
    return null
  }
}
