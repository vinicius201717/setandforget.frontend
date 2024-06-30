import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'
import {
  INotificationSettings,
  UpdateINotificationSettings,
  ResponseType,
} from 'src/types/apps/notification'

export async function updateNotificationSettings(
  data: UpdateINotificationSettings,
): Promise<ResponseType | null> {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )
  try {
    const response = await api.patch<{
      data: INotificationSettings
      message: string
      status: number
    }>(`/notification-settings`, data, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    })

    return {
      data: response.data.data,
      status: response.data.status,
      message: response.data.message,
    }
  } catch (error) {
    console.error(error)
    return null
  }
}
