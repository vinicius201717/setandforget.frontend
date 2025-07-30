import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'
import { NotificationsType } from 'src/context/types'

export type ResponseNotificationType = {
  status: boolean
  message: string
  notification: NotificationsType
}

export async function getNotification(
  id: string,
): Promise<ResponseNotificationType | undefined> {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )

  if (!storedToken) {
    console.error('No token found in local storage.')
    return
  }

  try {
    const response = await api.get(`/notification/${id}`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    })

    return response.data
  } catch (error) {
    console.error('Error fetching notification:', error)
  }
}
