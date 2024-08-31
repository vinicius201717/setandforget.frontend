import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export async function getTeamInfo(
  id: number,
  leagueId: number,
  season: number,
): Promise<any> {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )
  console.log(id, leagueId, season)

  try {
    const response = await api.get(
      `/football/team/${id}/${leagueId}/${season}`,
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      },
    )
    console.log(response)

    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}
