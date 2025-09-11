import toast from 'react-hot-toast'
import { api } from 'src/lib/axios'

type ResetPasswordType = { token: string; newPassword: string }
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
    if (res.status === 201) {
      toast.success('password updated successfully.', {
        position: 'bottom-right',
      })
      setTimeout(() => {
        onRedirectToLogin()
      }, 3000)
    }
  } catch (error) {
    toast.error('Error when changing password.', { position: 'bottom-right' })
    console.error('Error resetting password:', error)
  }
}
