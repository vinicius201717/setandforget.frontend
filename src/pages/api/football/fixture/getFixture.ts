import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export async function getFixture(): Promise<any> {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )

  try {
    const response = await api.get(`/football/fixture/leagues/favorites`, {
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
