import { api } from 'src/lib/axios'

type chessResultCreateType = {
  roomId: string
  winnerId: string
  loserId: string
  resultType: string
}

export async function chessResultCreate(
  data: chessResultCreateType,
): Promise<any> {
  try {
    const response = await api.post('/chess-result', data)

    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}
