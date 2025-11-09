/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export default async function createPost(dto: any) {
  const token = window.localStorage.getItem(authConfig.storageTokenKeyName)

  return await api.post('/posts', dto, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
