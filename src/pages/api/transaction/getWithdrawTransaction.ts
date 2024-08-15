import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'
import { TransfersTransaction } from 'src/context/types'

export async function getTransfersTransaction(): Promise<
  TransfersTransaction[] | null
> {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )
  try {
    const response = await api.get<TransfersTransaction[]>(
      `/transfers-transaction`,
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
