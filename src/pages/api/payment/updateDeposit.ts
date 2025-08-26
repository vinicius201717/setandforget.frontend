import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export async function updateDeposit(
  paymentId: string,
  status: string,
): Promise<string | null | undefined> {
  try {
    const storedToken = window.localStorage.getItem(
      authConfig.storageTokenKeyName,
    )
    if (storedToken) {
      const response = await api.patch(
        '/payments/deposit',
        { paymentId, status },
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
