import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'
import { Rating } from 'src/types/apps/chessTypes'

export async function createRating(userName: string): Promise<Rating> {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )

  if (!storedToken) {
    throw new Error('User is not authenticated')
  }

  try {
    const response = await api.post('/rating', userName, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    })

    if (response.status === 201) {
      return response.data
    } else {
      throw new Error(`Unexpected response status: ${response.status}`)
    }
  } catch (error: any) {
    console.error('Error registering rating:', error)

    if (error.response?.data?.message) {
      throw new Error(error.response.data.message.join(', '))
    }
    throw new Error(error.message || 'Unknown error while registering rating')
  }
}
