import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export async function getOddsByFixture(fixtureId: string): Promise<any> {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )

  try {
    const response = await api.get(`/football/odds/fixture/${fixtureId}`, {
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
