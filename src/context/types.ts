/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
}

type LoginAfterCodeParams = {
  code: string
  userId: string
}

export type PartialUserDataType = {
  email?: string | undefined
  name?: string | undefined
  phone?: string | undefined
  [key: string]: string | undefined
}

export type UserDataType = {
  id: string
  created_at: string
  email: string
  name: string
  avatar?: string
  banner?: string
  phone?: string
  birsthday?: string
  twoFactor: boolean
  role: string
  email_verified: boolean
  phone_verified: boolean
  Account: Account
  creditCardTransaction?: CreditCardTransactionType[]
  userSubscription?: UserSubscriptionType[]
  UserDevices?: UserDeviceInfo[]
}

type UserDeviceInfo = {
  id: string
  userId: string
  browser: string
  os: string
  platform: string
  source: string
  hash: string
  created_at: Date
}

export type UserSubscriptionType = {
  subscription: SubscriptonType[]
}

export type SubscriptonType = {
  id: string
  ownerUserId: string
  name: string
  createdAt: string
  updatedAt: string
}

export type UserBalanceType = {
  id: string
  userId: string
  balance: number
  updateAt: string
}

export type CreditCardTransactionType = {
  id: string
  brand: string
  name?: string
  lastDigits: string
}

export type NotificationsType = {
  id: string
  meta: string
  avatarAlt: string
  title: string
  avatarImg: string
  subtitle: string
  content: string
  userId: string
  name: string
  createdAt: Date
  updatedAt: Date
  read: boolean
  action: boolean
}

export enum ActionTypeEnum {
  FRIENDSHIP = 'FRIENDSHIP',
  BLOCK = 'BLOCK',
}

export type RegisterCreateType = {
  title: string
  icon: string
  subtitle: string
  url: string
}

export type ResponseCreateType = {
  id: string
  userId: string
  title: string
  icon: string
  subtitle: string
  url: string
}

interface Account {
  id: string
  userId: string
  amount: number
  transactions: Deposit[] | null
}

export interface Deposit {
  id: string | null
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'UNKNOWN'
  paymentType: string
  pixCode: string
  amount: number
  createdAt: Date
  updatedAt: Date
}

export interface Withdraw {
  id: string
  amount: number
  status: 'PENDING' | 'PAID' | 'FAILED'
  pixKey: string
  pixKeyType: string
  createdAt: Date
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  toastId: string | null
  notifications: NotificationsType[] | null // Usando NotificationsType agora
  setLoading: (value: boolean) => void
  setToastId: (value: string | null) => void
  setUser: (value: UserDataType | null) => void
  setNotifications: (value: NotificationsType[]) => void
  login: (
    params: LoginParams,
    openDialogSecurityCode: () => void,
    onSetUserId: (id: string) => void,
    errorCallback?: ErrCallbackType,
  ) => Promise<any>
  loginAfterCode: (
    params: LoginAfterCodeParams,
    rememberMe: boolean,
  ) => Promise<any>
}
