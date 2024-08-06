import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'
import { BankAccountData } from 'src/types/apps/bankAccountsType'

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
        return response.data
      } else {
        console.error('Unexpected status code:', response.status)
        return null
      }
    } else {
      console.error('No token found in localStorage')
      return null
    }
  } catch (error) {
    console.log(error)

    if (error) {
      console.error('Error response:', error)
    } else if (error) {
      console.error('No response received:', error)
    } else {
      console.error('Error during request setup:', error)
    }
    return null
  }
}
