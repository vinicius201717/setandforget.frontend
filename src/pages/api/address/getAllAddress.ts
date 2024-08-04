import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'
import { PostAddressResponseType } from 'src/types/apps/addressType'

export async function getAllAddress(): Promise<
  PostAddressResponseType | null | undefined
> {
  try {
    const storedToken = window.localStorage.getItem(
      authConfig.storageTokenKeyName,
    )
    if (storedToken) {
      const response = await api.get('/address', {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      if (response.status === 200) {
        return response.data
      } else {
        return null
      }
    }
  } catch (error) {
    console.error('Error when making payment:', error)
    return null
  }
}
