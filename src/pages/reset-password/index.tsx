// pages/reset-password/index.tsx
import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import GoodGameLogo from 'src/@core/components/logo'
import { resetPassword } from '../api/auth/resetPassword'

// === Styled Components ===
const BoxWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 400,
  margin: '0 auto',
  padding: theme.spacing(6),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
}))

const FormBox = styled('form')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
})

// === Zod Schema ===
const schema = z
  .object({
    newPassword: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type ResetPasswordForm = z.infer<typeof schema>

const ResetPasswordPage = () => {
  const router = useRouter()
  const { token } = router.query as { token: string }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: ResetPasswordForm) => {
    if (!token) return

    await resetPassword({
      data: { token, newPassword: data.newPassword },
      onRedirectToLogin: () => router.push('/login'),
    })
  }

  return (
    <BoxWrapper>
      <GoodGameLogo />
      <Typography variant='h5' sx={{ mb: 2 }}>
        Reset Password 🔒
      </Typography>
      <Typography variant='body2' sx={{ mb: 4, textAlign: 'center' }}>
        Enter your new password below
      </Typography>

      <FormBox onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label='New Password'
          type='password'
          fullWidth
          {...register('newPassword')}
          error={!!errors.newPassword}
          helperText={errors.newPassword?.message}
        />
        <TextField
          label='Confirm Password'
          type='password'
          fullWidth
          {...register('confirmPassword')}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />
        <Button
          type='submit'
          variant='contained'
          fullWidth
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Updating...' : 'Update Password'}
        </Button>
      </FormBox>
    </BoxWrapper>
  )
}

ResetPasswordPage.getLayout = (page: ReactNode) => page
ResetPasswordPage.guestGuard = true

export default ResetPasswordPage
