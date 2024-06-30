/* eslint-disable no-unused-vars */
import { UserDataType } from 'src/context/types'
import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

type LoginCodeType = {
  code: string
  userId: string
}

type LoginParamsProps = {
  onRedirectiUrl: () => void
  setLoading: (value: boolean) => void
  params: LoginCodeType
  setUser: (user: UserDataType | null) => void
  rememberMe?: boolean
}
export async function sendCode({
  onRedirectiUrl,
  setLoading,
  params,
  rememberMe,
  setUser,
}: LoginParamsProps) {
  try {
    const response = await api.post('/auth/code', params)
    if (response.data) {
      rememberMe &&
        window.localStorage.setItem(
          authConfig.storageTokenKeyName,
          response.data.accessToken,
        )
      setUser({ ...response.data.userData })
      rememberMe &&
        window.localStorage.setItem(
          'userData',
          JSON.stringify(response.data.userData),
        )
      setTimeout(() => {
        onRedirectiUrl()
        setLoading(false)
      }, 2000)

      return 'success'
    }
  } catch (error) {
    console.error('Internal error', error)
  }
}
