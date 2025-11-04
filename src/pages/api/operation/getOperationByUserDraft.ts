import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'
import { OperationType } from 'src/types/apps/operationType'

export async function getOperationsByUserDraft(): Promise<
  OperationType[] | null
> {
  try {
    const token = window.localStorage.getItem(authConfig.storageTokenKeyName)
    if (!token) return null

    const res = await api.get('/operation/mine-draft', {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res.status === 200 ? res.data : null
  } catch (error) {
    console.error('Error fetching user operations:', error)
    return null
  }
}
