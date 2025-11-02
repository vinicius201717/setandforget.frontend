import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'
import { UpdateOperationType } from 'src/types/apps/operationType'

export async function updateOperation(
  id: string,
  updateOperationType: UpdateOperationType,
) {
  try {
    const storedToken = window.localStorage.getItem(
      authConfig.storageTokenKeyName,
    )
    if (storedToken) {
      const response = await api.patch(
        `/operation/${id}`,
        updateOperationType,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        },
      )
      if (response.status === 200) return response.data
      return null
    }
  } catch (error) {
    console.error('Error updating operation:', error)
    return null
  }
}
