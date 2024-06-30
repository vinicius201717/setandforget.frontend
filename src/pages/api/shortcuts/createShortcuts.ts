import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'
import { RegisterCreateType, ResponseCreateType } from 'src/context/types'

const shortcutExist = (
  shortcuts: RegisterCreateType[],
  shortcut: RegisterCreateType,
): boolean => {
  return shortcuts.some((item) => shortcut.url === item.url)
}

export async function createShortcuts(
  data: RegisterCreateType,
  shortcuts: ResponseCreateType[],
): Promise<ResponseCreateType | null | undefined> {
  try {
    const storedToken = window.localStorage.getItem(
      authConfig.storageTokenKeyName,
    )
    if (!shortcutExist(shortcuts, data)) {
      if (storedToken) {
        const response = await api.post('/shortcuts', data, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        if (response.status === 201) {
          return response.data
        } else {
          return null
        }
      } else {
        return null
      }
    }
  } catch (error) {
    console.error('Error registering shortcut:', error)
    return null
  }
}
