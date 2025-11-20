import { api } from 'src/lib/axios'
import { TeacherOperationsResponse } from 'src/types/apps/operationType'
import authConfig from 'src/configs/auth'

export async function getOperationsByTeacher(): Promise<TeacherOperationsResponse | null> {
  try {
    const storedToken = window.localStorage.getItem(
      authConfig.storageTokenKeyName,
    )
    const response = await api.get('/operation/teacher', {
      headers: { Authorization: `Bearer ${storedToken}` },
    })

    console.log(response.data)

    if (response.status === 200) return response.data
    return null
  } catch (error) {
    console.error('Error fetching teacher operations:', error)
    return null
  }
}
