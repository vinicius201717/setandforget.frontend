import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export async function deleteOperation(id: string) {
  try {
    const storedToken = window.localStorage.getItem(
      authConfig.storageTokenKeyName,
    )
    if (storedToken) {
      const response = await api.delete(`/operation/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      if (response.status === 200) return true
      return false
    }
  } catch (error) {
    console.error('Error deleting operation:', error)
    return false
  }
}
