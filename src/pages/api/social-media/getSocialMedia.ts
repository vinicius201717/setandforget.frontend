import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export async function getSocialMedia() {
  try {
    const storedToken = window.localStorage.getItem(
      authConfig.storageTokenKeyName,
    )
    if (storedToken) {
      const response = await api.get('/social-media', {
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
    console.error('Error registering social media:', error)
    return false
  }
}
