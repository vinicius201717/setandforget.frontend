import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'
import { INotificationSettings } from 'src/types/apps/notification'

export async function getNotificationSettings(): Promise<INotificationSettings | null> {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )
  try {
    const response = await api.get<INotificationSettings>(
      `/notification-settings`,
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      },
    )
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}
