import { api } from 'src/lib/axios'
import { notify } from 'src/components/toast_notification/toastUserCreate'

type RegisterCreateType = {
  name: string
  email: string
  phone?: string
  password: string
  agree: boolean
}

type RegisterProps = {
  data: RegisterCreateType
  onRedirectToLogin: () => void
}

export async function register({
  data,
  onRedirectToLogin,
}: RegisterProps): Promise<void> {
  try {
    const res = await api.post('/users/create', {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
    })

    if (res.status === 201) {
      notify(true)
      setTimeout(() => {
        onRedirectToLogin()
      }, 3000)
    }
  } catch (error) {
    notify(false)
    console.error('Error registering user:', error)
  }
}
