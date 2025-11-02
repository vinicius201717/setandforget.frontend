import { api } from 'src/lib/axios'
import { OperationType } from 'src/types/apps/operationType'

export async function getOperationsByTeacher(): Promise<
  OperationType[] | null
> {
  try {
    const response = await api.get('/operation/teacher')
    if (response.status === 200) return response.data
    return null
  } catch (error) {
    console.error('Error fetching teacher operations:', error)
    return null
  }
}
