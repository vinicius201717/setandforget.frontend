import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'
import { ResponseCreateType } from 'src/context/types'

export async function getShortcuts(): Promise<ResponseCreateType[] | null> {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )
  try {
    const response = await api.get<ResponseCreateType[] | null>(`/shortcuts`, {
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
