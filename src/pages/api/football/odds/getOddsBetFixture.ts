import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export async function getOddsBetFixture(
  fixtureId: number,
  betId: number,
): Promise<any> {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )

  try {
    const response = await api.get(`/football/odds/bet/${betId}/${fixtureId}`, {
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
