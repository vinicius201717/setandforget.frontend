import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export async function getOddsByLeagueId(
  leagueId: number,
  season: number,
): Promise<any> {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )

  try {
    const response = await api.get(
      `/football/odds/league/${leagueId}/${season}`,
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
