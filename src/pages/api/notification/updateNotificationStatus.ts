import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export async function updateNotificationStatus(
  notificationId: string,
  status: 'ACCEPTED' | 'DECLINED' | 'PENDING',
) {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )

  const response = await api.patch(
    `/notification/${notificationId}/${status}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    },
  )

  return response.data
}
