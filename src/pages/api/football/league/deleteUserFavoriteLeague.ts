import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'
import { UserFavoriteLeague } from 'src/types/apps/football'

export async function DeleteUserFavoriteLeague(
  leagueId: string,
): Promise<UserFavoriteLeague | null> {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )
  try {
    const response = await api.delete(
      `/football/user/favorite/league/${leagueId}`,
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
