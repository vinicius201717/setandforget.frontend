/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import {
  AuthValuesType,
  LoginParams,
  ErrCallbackType,
  UserDataType,
  NotificationsType,
} from './types'
import { initAuth } from 'src/pages/api/auth/me'
import { login } from 'src/pages/api/auth/login'
import toast from 'react-hot-toast'
import { sendCode } from 'src/pages/api/auth/loginCode'
import { chessChallengeCancel } from 'src/pages/api/chess/chessChallengeCancel'
import { checkIfHaveActiveGame } from 'src/utils/active-game'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  notifications: null,
  loading: true,
  toastId: null,
  setUser: () => null,
  setToastId: () => null,
  setNotifications: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  loginAfterCode: () => Promise.resolve(),
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
  openDialogSecurityCode: () => void
  onSetUserId: (id: string) => void
}

type LoginAfterParams = {
  code: string
  userId: string
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [notifications, setNotifications] = useState<
    NotificationsType[] | null
  >(null)

  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)
  const [toastId, setToastId] = useState<string | null>(null)

  // ** Hooks
  const router = useRouter()

  const redirectLogin = () => {
    router.replace('/login')
  }

  const redirectUrl = () => {
    window.location.reload()
  }

  useEffect(() => {
    initAuth({
      setUser,
      setNotifications,
      setLoading,
      onRedirectToLogin: redirectLogin,
    })
    checkIfHaveActiveGame(router)
  }, [])

  const handleLogin = async (
    params: LoginParams,
    openDialogSecurityCode: () => void,
    onSetUserId: (id: string) => void,
    errorCallback?: ErrCallbackType,
  ): Promise<any> => {
    try {
      const response = await login({
        onRedirectUrl: redirectUrl,
        params,
        setUser,
        errorCallback,
      })
      if (typeof response === 'object' && response.status === 'pending') {
        onSetUserId(response.userId)
        openDialogSecurityCode()
      }
    } catch (err) {
      console.error('Login failed:', err)
      if (errorCallback) errorCallback({ error: 'Internal error' })
      return err
    }
  }

  const handleLoginAfterCode = async (
    params: LoginAfterParams,
    rememberMe: boolean,
  ) => {
    try {
      await sendCode({
        onRedirectiUrl: redirectUrl,
        setLoading,
        params,
        rememberMe,
        setUser,
      })
    } catch (err) {
      console.error('Login failed:', err)
      toast.error('Failed to verify code.', {
        position: 'bottom-right',
      })
      setLoading(false)
    }
  }

  const handleLogout = () => {
    const challengeId = window.localStorage.getItem(
      'chess-challenge-id',
    ) as string
    const roomId = window.localStorage.getItem('chess-room-id') as string
    chessChallengeCancel(challengeId, roomId).then(() => {
      window.localStorage.removeItem('chess-challenge-id')
    })
    if (toastId) toast.dismiss(toastId)
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    window.localStorage.removeItem('chess-challenge-id')
    router.push('/login')
  }

  const values = {
    user,
    notifications,
    loading,
    toastId,
    setUser,
    setToastId,
    setNotifications,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    loginAfterCode: handleLoginAfterCode,
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
