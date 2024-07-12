import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

type chessResultCreateType = {
  roomId: string
  winnerId: string
  loserId: string
  resultType: string
}

export async function chessResultCreate(
  data: chessResultCreateType,
): Promise<any> {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )
  try {
    const response = await api.post('/chess-result', data, {
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
