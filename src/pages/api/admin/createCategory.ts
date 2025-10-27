import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export default async function createCategory(name: string) {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )

  return await api.post(
    `/classes/category`,
    { name },
    {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    },
  )
}
