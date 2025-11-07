import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export default async function likePost(id: string) {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )

  return await api.post(
    `/feed/${id}/like`,
    {},
    {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    },
  )
}
