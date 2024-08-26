/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export async function getTopScorers(
  leagueId: number,
  season: number,
): Promise<any> {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )
  try {
    const response = await api.get(
      `/football/players/top_scorers/${leagueId}/${season}/`,
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      },
    )

    console.log(response.data)

    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}
