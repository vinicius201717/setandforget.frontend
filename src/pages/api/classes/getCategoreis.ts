import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export default async function getCategories() {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )

  return await api.get(`/classes/categories`, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  })
}
