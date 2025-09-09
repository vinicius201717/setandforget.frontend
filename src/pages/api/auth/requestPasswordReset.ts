import { api } from 'src/lib/axios'

type RequestResetType = {
  email: string
}

type RequestResetProps = {
  data: RequestResetType
}

export async function requestPasswordReset({
  data,
}: RequestResetProps): Promise<boolean> {
  try {
    const res = await api.post('/auth/request-reset', {
      email: data.email,
    })

    return res.status === 200
  } catch (error) {
    console.error('Error requesting password reset:', error)
    return false
  }
}
