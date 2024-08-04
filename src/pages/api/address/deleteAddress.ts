import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'
import { PostAddressResponseType } from 'src/types/apps/addressType'

export async function deleteAddress(
  id: string,
): Promise<PostAddressResponseType | null | undefined> {
  try {
    const storedToken = window.localStorage.getItem(
      authConfig.storageTokenKeyName,
    )
    if (storedToken) {
      const response = await api.delete(`/address/${id}`, {
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
    console.error('Error when delete address:', error)
    return null
  }
}
