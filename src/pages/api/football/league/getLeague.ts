/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export async function getLeague(leagueId: string): Promise<any> {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )
  try {
    const response = await api.get(`/football/league/${leagueId}`, {
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
