import { api } from 'src/lib/axios'
import { AxiosResponse } from 'axios'

interface DataType {
  chessRoomId: string
  fen: string
  moveHistory: string[]
  clock: string[]
}
export default async function chessLogUpdate(
  data: DataType,
): Promise<AxiosResponse> {
  try {
    const newData = {
      fen: data.fen as string,
      moveHistory: JSON.stringify(data.moveHistory),
      clock: JSON.stringify(data.clock),
    }

    const response = await api.patch(
      `/chess-room-log/${data.chessRoomId}`,
      newData,
    )

    return response
  } catch (error) {
    console.error('Failed to update user:', error)
    throw error
  }
}
