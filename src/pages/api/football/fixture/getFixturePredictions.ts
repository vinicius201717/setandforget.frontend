import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export async function getFixturePredictions(fixtureId: number): Promise<any> {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )

  try {
    const response = await api.get(
      `/football/fixture/predictions/${fixtureId}`,
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      },
    )

    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}
