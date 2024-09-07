import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'
import { PlayerStatisticsResponse } from 'src/types/apps/footballType/playersType'

export async function getPlayerStatistics(
  playerId: number,
  season: number,
): Promise<PlayerStatisticsResponse[] | null> {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )

  try {
    const response = await api.get(
      `/football/player/statistics/${playerId}/${season}`,
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
