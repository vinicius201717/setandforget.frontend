import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export default async function repostPost(id: string) {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )

  return await api.post(
    `/posts/${id}/repost`,
    {},
    {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    },
  )
}
