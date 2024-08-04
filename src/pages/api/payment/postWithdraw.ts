import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

interface PostWithdrawProps {
  amount: number
  currency: string
  selectedBank: string
}

export async function postWithdraw(
  data: PostWithdrawProps,
): Promise<string | null | undefined> {
  try {
    const storedToken = window.localStorage.getItem(
      authConfig.storageTokenKeyName,
    )
    const numberAmount = data.amount * 100
    if (storedToken) {
      const response = await api.post(
        '/payments/withdraw',
        {
          amount: numberAmount,
          currency: data.currency,
          stripeAccountId: data.selectedBank,
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        },
      )
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
