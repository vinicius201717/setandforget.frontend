export interface BankAccountData {
  accountHolderName: string
  accountHolderType: 'individual' | 'company'
  bankName: string
  routingNumber: string
  accountNumber: string
  currency: string
  country: string
}
