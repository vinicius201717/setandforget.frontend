import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export async function getDashboardDepositWithdraw() {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )

  const { data } = await api.get(`/dashboard/deposit/withdraw`, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  })

  return data
}
