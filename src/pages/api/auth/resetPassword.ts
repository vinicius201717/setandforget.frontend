import { api } from 'src/lib/axios'
import { notify } from 'src/components/toast_notification/toastUserCreate'

type ResetPasswordType = {
  token: string
  newPassword: string
}

type ResetPasswordProps = {
  data: ResetPasswordType
  onRedirectToLogin: () => void
}

export async function resetPassword({
  data,
  onRedirectToLogin,
}: ResetPasswordProps): Promise<void> {
  try {
    const res = await api.post('/auth/reset-password', {
      token: data.token,
      newPassword: data.newPassword,
    })

    if (res.status === 200) {
      notify(true) // sucesso
      setTimeout(() => {
        onRedirectToLogin()
      }, 3000)
    }
  } catch (error) {
    notify(false) // falha
    console.error('Error resetting password:', error)
  }
}
