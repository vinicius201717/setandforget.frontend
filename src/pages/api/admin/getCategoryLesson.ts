import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export default async function getCategory() {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )

  return await api.get(`/classes/category`, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  })
}
