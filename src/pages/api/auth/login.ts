/* eslint-disable no-unused-vars */
import { ErrCallbackType, LoginParams, UserDataType } from 'src/context/types'
import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

type LoginProps = {
  params: LoginParams
  errorCallback?: ErrCallbackType
  setUser: (user: UserDataType | null) => void
  onRedirectUrl: () => void
}

type LoginReturnValuesType = {
  status: 'pending' | 'success' | 'error'
  userId: string
}

export async function login({
  params,
  setUser,
  onRedirectUrl,
  errorCallback,
}: LoginProps): Promise<LoginReturnValuesType | void | string> {
  try {
    const response = await api.post('/auth/login', params)

    if (response.data.status === 102) {
      return { status: 'pending', userId: response.data.userId }
    } else if (response.status === 204) {
      errorCallback && errorCallback({ error: 'Email or Password is invalid' })
      return 'error'
    } else {
      params.rememberMe &&
        window.localStorage.setItem(
          authConfig.storageTokenKeyName,
          response.data.accessToken,
        )
      setUser({ ...response.data.userData })
      params.rememberMe &&
        window.localStorage.setItem(
          'userData',
          JSON.stringify(response.data.userData),
        )

      onRedirectUrl()
      return 'success'
    }
  } catch (err) {
    errorCallback && errorCallback({ error: 'Internal error' })
    return 'error'
  }
}
