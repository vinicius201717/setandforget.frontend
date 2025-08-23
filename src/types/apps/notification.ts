export interface INotificationSettings {
  id: string
  userId: string
  newForYouEmail: boolean
  newForYouWhatsApp: boolean
  newForYouPhone: boolean
  newDeviceLoggedInEmail: boolean
  newDeviceLoggedInWhatsApp: boolean
  newDeviceLoggedInPhone: boolean
  depositOrWithdrawalEmail: boolean
  depositOrWithdrawalWhatsApp: boolean
  depositOrWithdrawalPhone: boolean
  notifyOnlyWhenOnline: string
  createdAt: Date
  updatedAt: Date
}

export type UpdateINotificationSettings = Omit<
  INotificationSettings,
  'createdAt' | 'updatedAt' | 'id' | 'userId'
>
export type ResponseType = {
  data: INotificationSettings
  status: number
  message: string
}

type FriendRequestMeta = {
  type: 'FRIEND_REQUEST'
  requesterId: string
  friendshipId: string
  status: string
}

type ChessChallengeMeta = {
  type: 'CHESS_CHALLENGE'
  challengerId: string
  challengeId: string
  status: string
  amount: number
  duration: number
}

// Union type para suportar múltiplos tipos de notificações
export type NotificationMeta = FriendRequestMeta | ChessChallengeMeta
