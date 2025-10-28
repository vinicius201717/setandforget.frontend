import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export default async function getClasses(categoryId: string) {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )

  return await api.get(`/classes/category/${categoryId}`, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  })
}
