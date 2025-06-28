import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'
import { Deposit } from 'src/context/types'

export async function getDeposit(page: number): Promise<Deposit[] | null> {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )
  try {
    const response = await api.get<Deposit[]>(`/payments`, {
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
