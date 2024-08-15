import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'
import { Transaction } from 'src/context/types'

export async function getTransaction(): Promise<Transaction[] | null> {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )
  try {
    const response = await api.get<Transaction[]>(`/transaction`, {
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
