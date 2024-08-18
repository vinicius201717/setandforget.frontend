import { LeagueWithPagination } from 'src/types/apps/football'
import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export async function getLeagues(
  page = 1,
): Promise<LeagueWithPagination | null> {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )

  const leaguesPerPage = 30
  const start = (page - 1) * leaguesPerPage
  const end = start + leaguesPerPage

  try {
    const response = await api.get(`/football/leagues`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    })

    const leagues = response.data.response.slice(start, end)
    const total = response.data.response.length

    return { leagues, total }
  } catch (error) {
    console.error(error)
    return null
  }
}
