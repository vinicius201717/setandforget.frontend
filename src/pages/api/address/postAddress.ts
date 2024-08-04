import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'
import {
  PostAddressResponseType,
  PostAddressType,
} from 'src/types/apps/addressType'

export async function postAddress(
  data: PostAddressType,
): Promise<PostAddressResponseType | null | undefined> {
  try {
    const storedToken = window.localStorage.getItem(
      authConfig.storageTokenKeyName,
    )
    if (storedToken) {
      const response = await api.post('/address', data, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      if (response.status === 201) {
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
