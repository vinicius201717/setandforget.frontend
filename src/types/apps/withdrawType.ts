import { PostAddressResponseType } from './addressType'
import { BankAccountResponse } from './bankAccountsType'

export interface WithdrawFormProps {
  openDelete: boolean
  handleCloseDelete: () => void
  handleDeleteDelete: () => void
  selectedBankDelete: string
  setBankAccounts: React.Dispatch<React.SetStateAction<BankAccountResponse[]>>
  address: PostAddressResponseType | null | undefined
  scrollToBillingAddress: () => void
}
