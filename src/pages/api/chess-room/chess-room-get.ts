import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export async function chessRoomGet(chessRoomId: string): Promise<any> {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )
  try {
    const response = await api.get(`/chess-room/${chessRoomId}`, {
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
