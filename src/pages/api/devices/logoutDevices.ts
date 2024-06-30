import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export async function logoutDevice(id: string) {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )
  api
    .delete(`/user-devices/logout/${id}`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    })
    .then((response) => {
      return response
    })
    .catch((error) => {
      console.error(error)
      return false
    })
}
