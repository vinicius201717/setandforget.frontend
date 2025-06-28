import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'
import { Withdraw } from 'src/context/types'

export async function getWithdraw(page: number): Promise<Withdraw[] | null> {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )
  try {
    const response = await api.get<Withdraw[]>(`/withdrawals`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
      params: {
        page,
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}
