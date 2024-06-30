// src/lib/removeshortcuts.ts
import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export async function removeShortcut(shortcutId: string): Promise<boolean> {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )

  if (!storedToken) {
    console.error('No token found in local storage.')
    return false
  }

  try {
    const response = await api.delete(`/shortcuts/${shortcutId}`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    })

    return response.status === 200 || response.status === 204
  } catch (error) {
    console.error('Failed to delete the shortcut:', error)
    return false
  }
}
