import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'
import { createNewPostType } from 'src/types/apps/admin'

export default async function createNewPost(data: createNewPostType) {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )

  return await api.post(`/classes/new-post`, data, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  })
}
