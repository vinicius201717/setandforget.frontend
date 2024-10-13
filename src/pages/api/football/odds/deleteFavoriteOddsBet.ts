import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'
import { UserFavoriteOddsBetType } from 'src/types/apps/footballType/oddsType'

export async function deleteFavoriteOddsBet(
  id: string,
): Promise<UserFavoriteOddsBetType> {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )
  try {
    const response = await api.delete(`/football/odds/bet/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    })

    return response.data
  } catch (error) {
    console.error(error)
    throw new Error('Failed to delete favorite bet')
  }
}
