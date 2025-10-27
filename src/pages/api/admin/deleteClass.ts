import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export default async function deleteClass(classId: string) {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )

  return await api.delete(`/classes/${classId}`, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  })
}
