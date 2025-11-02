import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'
import { CreateOperationType } from 'src/types/apps/operationType'

export async function createOperation(
  createOperationType: CreateOperationType,
) {
  console.log(createOperationType)

  try {
    const storedToken = window.localStorage.getItem(
      authConfig.storageTokenKeyName,
    )
    if (storedToken) {
      const response = await api.post('/operation', createOperationType, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      if (response.status === 201 || response.status === 200)
        return response.data
      return null
    }
  } catch (error) {
    console.error('Error creating operation:', error)
    return null
  }
}
