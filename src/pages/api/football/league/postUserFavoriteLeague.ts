import { UserFavoriteLeague } from 'src/types/apps/football'
import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'
import { League } from 'src/types/apps/footballType'

export async function postUserFavoriteLeague(
  data: League,
): Promise<UserFavoriteLeague | null> {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )

  try {
    const response = await api.post(
      `/football/user/favorite/league`,
      { 
        leagueId: 
       },
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
