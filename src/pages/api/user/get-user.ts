import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export default async function getUser() {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )
  const data = await api.get('/profile/me', {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  })
  return data
}
