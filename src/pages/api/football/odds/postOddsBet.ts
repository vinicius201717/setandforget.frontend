import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'
import { OddsBetType } from 'src/types/apps/footballType/oddsType'

export async function postOddsBet(bet: OddsBetType): Promise<any> {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )

  try {
    const response = await api.post(
      `/football/odds/bet/create`,
      {
        betId: bet.id,
        name: bet.name,
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
