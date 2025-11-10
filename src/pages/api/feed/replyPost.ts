import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export default async function replyPost(id: string, text: string) {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )

  return await api.post(
    `/posts/${id}/reply`,
    { text },
    {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    },
  )
}
