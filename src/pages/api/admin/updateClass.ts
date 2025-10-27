// src/pages/api/admin/updateClass.ts
import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export default async function updateClass(classId: string, data: any) {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )

  return await api.patch(`/classes/${classId}`, data, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  })
}
