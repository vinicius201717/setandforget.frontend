import authConfig from 'src/configs/auth'
import { PartialUserDataType } from 'src/context/types'
import { api } from 'src/lib/axios'

type MessageType = {
  message: string
  status: number
}

export default async function updateSecurity(
  data: PartialUserDataType,
): Promise<MessageType | undefined> {
  try {
    const storedToken = window.localStorage.getItem(
      authConfig.storageTokenKeyName,
    )

    if (!storedToken) {
      throw new Error('No token found')
    }

    const response = await api.patch('/profile/update/security', data, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    })
    return { status: 200, message: response.data }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Failed to update user:', error.message)
      return { status: 401, message: error.message }
    } else {
      console.error('An unexpected error occurred')
    }
  }
}

export async function updateTwoFactor() {
  try {
    const storedToken = window.localStorage.getItem(
      authConfig.storageTokenKeyName,
    )

    if (!storedToken) {
      throw new Error('No token found')
    }

    const response = await api.patch(
      '/profile/update/security/two-factor',
      {},
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      },
    )
    if (response.status === 204) {
      return {
        status: 204,
        message: 'Updated successfully but no content returned',
      }
    }

    return { status: 200, message: response.data }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Failed to update user:', error.message)
      return { status: 401, message: error.message }
    } else {
      console.error('An unexpected error occurred')
    }
  }
}
