import { api } from 'src/lib/axios'

type RequestResetType = {
  method: 'email' | 'phone'
  email?: string
  phone?: string
}

type RequestResetProps = {
  data: RequestResetType
}

export async function requestPasswordReset({
  data,
}: RequestResetProps): Promise<boolean> {
  try {
    const payload =
      data.method === 'email' ? { email: data.email } : { phone: data.phone }
    const res = await api.post('/auth/request-reset', payload, {
      headers: { 'Content-Type': 'application/json' },
    })

    return res.status === 201
  } catch (error) {
    console.error('Error requesting password reset:', error)
    return false
  }
}
