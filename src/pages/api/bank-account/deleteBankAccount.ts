/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'
import { BankAccountResponse } from 'src/types/apps/bankAccountsType'

export async function deleteBankAccountById(
  bankAccountId: string,
): Promise<BankAccountResponse | null> {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )
  try {
    const response = await api.delete(`/bank-account/${bankAccountId}`, {
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
