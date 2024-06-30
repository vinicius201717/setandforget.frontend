import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export async function readAllNotifications(): Promise<{
  status: boolean
  message: string
}> {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )

  if (!storedToken) {
    console.error('No token found in local storage.')
    return { status: false, message: 'Error to read notifications.' }
  }

  try {
    const response = await api.post(
      `/notification/read-all`,
      {},
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      },
    )

    return response.data
  } catch (error) {
    console.error('Error updating notification settings:', error)
    return { status: false, message: 'Error to read notifications.' }
  }
}
