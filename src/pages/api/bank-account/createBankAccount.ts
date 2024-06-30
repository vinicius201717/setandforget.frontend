import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

interface BankAccountData {
  account_holder_name: string
  account_holder_type: 'individual' | 'company'
  account_number: string
  bank_name: string
  currency: string
  routing_number: string
  country?: string
}

export async function createBankAccount(
  data: BankAccountData,
): Promise<string | null | undefined> {
  try {
    const storedToken = window.localStorage.getItem(
      authConfig.storageTokenKeyName,
    )
    if (storedToken) {
      const response = await api.post('/bank-account', data, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      if (response.status === 201) {
        return response.data.url
      } else {
        return null
      }
    }
  } catch (error) {
    console.error('Error when making payment:', error)
    return null
  }
}
