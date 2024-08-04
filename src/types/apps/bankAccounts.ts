export interface BankAccountData {
  accountHolderName: string
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
  accountHolderName: string
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
