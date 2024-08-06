import { Focused } from 'react-credit-cards'
import { ThemeColor } from 'src/@core/layouts/types'

export interface BankAccountData {
  firstName: string
  lastName: string
  accountHolderType: 'individual' | 'company'
  bankName: string
  routingNumber: string
  accountNumber: string
  currency: string
  country: string
}

export interface BankAccountResponse {
  id: string
  userId: string
  firstName: string
  lastName: string
  accountHolderType: string
  accountType: string
  bankName: string
  country: string
  createdAt: string
  currency: string
  customerId: string
  fingerprint: string
  last4: string
  object: string
  routingNumber: string
  status: string
  stripeAccountId: string
  updatedAt: string
}

export interface SelectedCardType {
  cvc: string
  name: string
  expiry: string
  cardId: number
  cardNumber: string
  focus: Focused | undefined
}
export interface DataType {
  name: string
  imgSrc: string
  imgAlt: string
  cardCvc: string
  expiryDate: string
  cardNumber: string
  cardStatus?: string
  badgeColor?: ThemeColor
}
