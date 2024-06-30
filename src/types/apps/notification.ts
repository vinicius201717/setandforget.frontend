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
