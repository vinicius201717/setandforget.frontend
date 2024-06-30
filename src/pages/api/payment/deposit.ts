import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export async function deposit(
  amount: string,
): Promise<string | null | undefined> {
  try {
    const storedToken = window.localStorage.getItem(
      authConfig.storageTokenKeyName,
    )
    const numberAmount = parseInt(amount) * 100
    if (storedToken) {
      const response = await api.post(
        '/payments/deposit',
        { amount: numberAmount },
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
