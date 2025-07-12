import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export async function readNotification(id: string): Promise<{
  status: boolean
  message: string
}> {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )

  if (!storedToken) {
    console.error('No token found in local storage.')
    return { status: false, message: 'Error to read notification.' }
  }

  try {
    const response = await api.post(
      `/notification/read/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      },
    )

    return response.data
  } catch (error) {
    console.error('Error updating notification:', error)
    return { status: false, message: 'Error to read notification.' }
  }
}
