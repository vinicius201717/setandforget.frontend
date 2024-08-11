import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'
import { BankAccountData } from 'src/types/apps/bankAccountsType'
import { AxiosError } from 'axios'

export async function createBankAccount(
  data: BankAccountData,
): Promise<string | null | undefined> {
  try {
    const storedToken = window.localStorage.getItem(
      authConfig.storageTokenKeyName,
    )

    if (storedToken) {
      const formData = new FormData()
      formData.append('firstName', data.firstName)
      formData.append('lastName', data.lastName)
      formData.append('accountHolderType', data.accountHolderType)
      formData.append('bankName', data.bankName)
      formData.append('routingNumber', data.routingNumber)
      formData.append('accountNumber', data.accountNumber)
      formData.append('currency', data.currency)
      formData.append('country', data.country)

      if (data.frontImage) {
        formData.append('frontImage', data.frontImage)
      }

      if (data.backImage) {
        formData.append('backImage', data.backImage)
      }

      const response = await api.post('/bank-account', formData, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'Content-Type': 'multipart/form-data',
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
    if (error instanceof AxiosError) {
      console.log('Error response:', error.response?.data)
    } else {
      console.log('Unexpected error:', error)
    }
    return null
  }
}
