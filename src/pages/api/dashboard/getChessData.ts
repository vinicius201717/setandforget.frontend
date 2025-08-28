import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export async function getDashboardChessData() {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )

  const { data } = await api.get(`/dashboard/chess`, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  })

  return data
}
