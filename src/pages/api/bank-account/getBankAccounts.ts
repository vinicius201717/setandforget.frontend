/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'
import { BankAccountResponse } from 'src/types/apps/bankAccounts'

export async function bankAccountGet(): Promise<BankAccountResponse[] | null> {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )
  try {
    const response = await api.get(`/bank-account`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}
