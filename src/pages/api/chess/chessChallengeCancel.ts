import { api } from 'src/lib/axios'

export async function chessChallengeCancel(
  challengeId: string,
  roomId: string,
): Promise<any> {
  try {
    if (challengeId) {
      const response = await api.delete(
        `/chess-challenge/${challengeId}/${roomId}`,
      )

      return response
    }
  } catch (error) {
    console.error(error)
    return null
  }
}
