/* eslint-disable no-unused-vars */
import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'
import { NotificationsType, UserDataType } from 'src/context/types'
import { checkIfHaveActiveGame } from 'src/utils/active-game'

type InitAuthProps = {
  setUser: (user: UserDataType | null) => void
  setNotifications: (value: NotificationsType[]) => void
  setLoading: (value: boolean) => void
  onRedirectToLogin: () => void
}

export function initAuth({
  setUser,
  setNotifications,
  setLoading,
  onRedirectToLogin,
}: InitAuthProps) {
  try {
    const storedToken = window.localStorage.getItem(
      authConfig.storageTokenKeyName,
    )
    if (storedToken) {
      setLoading(true)
      api
        .get(authConfig.meEndpoint, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then((response) => {
          setUser(response.data)
          setNotifications(response.data.Notification)
          setLoading(false)
        })
        .catch((error) => {
          console.error('Authentication error:', error)
          window.localStorage.removeItem(authConfig.storageTokenKeyName)
          localStorage.removeItem('userData')
          localStorage.removeItem('refreshToken')
          localStorage.removeItem('accessToken')
          setUser(null)
          setLoading(false)
          onRedirectToLogin()
          if (authConfig.onTokenExpiration === 'logout') {
            onRedirectToLogin()
          }
        })
    } else {
      window.localStorage.removeItem(authConfig.storageTokenKeyName)
      localStorage.removeItem('userData')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('accessToken')
      setUser(null)
      setLoading(false)
      onRedirectToLogin()
    }
  } catch (error) {
    onRedirectToLogin()
  }
}
