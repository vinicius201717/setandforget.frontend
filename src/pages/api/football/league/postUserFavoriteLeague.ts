import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'
import { League, UserFavoriteLeague } from 'src/types/apps/footballType'

export async function postUserFavoriteLeague(
  data: League,
): Promise<UserFavoriteLeague | null> {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )
  const league = {
    leagueId: data.id,
    name: data.name,
    logo: data.logo,
    type: data.type,
  }
  try {
    const response = await api.post(`/football/user/favorite/league`, league, {
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
