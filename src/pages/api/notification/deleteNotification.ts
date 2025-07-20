import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export async function deleteNotification(
  notificationId: string,
): Promise<boolean> {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )

  try {
    await api.delete(`/notification/${notificationId}`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    })
    return true
  } catch (error) {
    console.error('Erro ao deletar notificação:', error)
    return false
  }
}
