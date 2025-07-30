import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'
import { ApiResultsResponse } from 'src/types/apps/chessTypes'

export async function getChessResults(
  page: number,
  pageSize: number,
): Promise<ApiResultsResponse | null> {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )
  try {
    const response = await api.get(`/chess-result/${page}/${pageSize}`, {
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
