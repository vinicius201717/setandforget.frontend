import { PartialUserDataType } from 'src/context/types'
import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'
import { AxiosResponse } from 'axios'

export default async function updateUser(
  data: PartialUserDataType,
): Promise<AxiosResponse> {
  try {
    const storedToken = window.localStorage.getItem(
      authConfig.storageTokenKeyName,
    )
    if (!storedToken) {
      throw new Error('No token found')
    }

    const response = await api.patch('/profile/update', data, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    })

    return response
  } catch (error) {
    console.error('Failed to update user:', error)
    throw error
  }
}
