import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export async function deleteSocialMedia(id: string) {
  try {
    const storedToken = window.localStorage.getItem(
      authConfig.storageTokenKeyName,
    )
    if (storedToken) {
      const response = await api.delete(`/social-media/${id}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      if (response.status === 200) {
        return response.data
      }
    } else {
      return false
    }
  } catch (error) {
    console.error('Error to delete social media:', error)
    return false
  }
}
