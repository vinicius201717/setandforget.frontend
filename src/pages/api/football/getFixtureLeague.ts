import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export async function getFixtureLeague(leagueId: string): Promise<any> {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )

  try {
    const response = await api.get(`/football/league/${leagueId}/fixture`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    })

    return response
  } catch (error) {
    console.error(error)
    return null
  }
}
