import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export async function getChessResults(page: number, pageSize: number) {
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
