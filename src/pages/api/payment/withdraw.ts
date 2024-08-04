import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

interface WithdrawInterface {
  amount: number
  currency: string
  stripeAccountId: string
}
export async function withdraw({
  amount,
  currency,
  stripeAccountId,
}: WithdrawInterface): Promise<string | null | undefined> {
  try {
    const storedToken = window.localStorage.getItem(
      authConfig.storageTokenKeyName,
    )
    const centsAmount = amount * 100

    if (storedToken) {
      const response = await api.post(
        '/transfers',
        { amount: centsAmount, currency, stripeAccountId },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        },
      )
      if (response.status === 201) {
        return response.data
      } else {
        return null
      }
    }
  } catch (error) {
    console.error('Error when making payment:', error)
    return null
  }
}
