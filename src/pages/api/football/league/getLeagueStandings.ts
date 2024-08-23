import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export async function getLeagueStandings(leagueId: number, season: number) {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )
  try {
    const response = await api.get(
      `/football/league/standings/${leagueId}/${season}`,
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
