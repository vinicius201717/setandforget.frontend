/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export async function getLeagueTeams(leagueId: string): Promise<any> {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )
  try {
    console.log('teste')

    const response = await api.get(`/football`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    })
    console.log(response)

    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}
