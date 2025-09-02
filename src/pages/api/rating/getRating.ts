import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'
import { Rating } from 'src/types/apps/chessTypes'

export async function getRating(): Promise<Rating | null | undefined> {
  try {
    const storedToken = window.localStorage.getItem(
      authConfig.storageTokenKeyName,
    )

    if (storedToken) {
      const response = await api.get('/rating', {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      if (response.status === 201) {
        return response.data
      } else {
        return null
      }
    } else {
      return null
    }
  } catch (error) {
    console.error('Error geting rating:', error)
    return null
  }
}
