// pages/reset-password.tsx

// ** React Imports
import { ReactNode } from 'react'
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

// ** Layout
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Logo
import GoodGameLogo from 'src/@core/components/logo'

// ** Form + Validation
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// ** API
import { resetPassword } from '../api/auth/resetPassword'
import themeConfig from 'src/configs/themeConfig'

// =======================
// Styled Components
// =======================
const CenterWrapper = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.paper,
}))

const BoxWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 400,
  padding: theme.spacing(8),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[3],
  backgroundColor: theme.palette.background.default,
}))

const LinkStyled = styled('a')(({ theme }) => ({
  display: 'flex',
  fontSize: '0.875rem',
  alignItems: 'center',
  textDecoration: 'none',
  justifyContent: 'center',
  color: theme.palette.primary.main,
  cursor: 'pointer',
}))

// =======================
// Validation schema
// =======================
const schema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  })

type ResetPasswordForm = z.infer<typeof schema>

// =======================
// Component
// =======================
const ResetPasswordPage = () => {
  const router = useRouter()
  const { token } = router.query

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: ResetPasswordForm) => {
    if (!token) {
      return
    }

    await resetPassword({
      data: {
        token: String(token),
        newPassword: data.password,
      },
      onRedirectToLogin: () => router.push('/login'),
    })
  }

  return (
    <CenterWrapper>
      <BoxWrapper>
        <Box
          sx={{
            mb: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <GoodGameLogo />
          <Typography
            variant='h6'
            sx={{
              ml: 2,
              lineHeight: 1,
              fontWeight: 600,
              textTransform: 'uppercase',
              fontSize: '1.25rem !important',
            }}
          >
            {themeConfig.templateName}
          </Typography>
        </Box>

        <Typography variant='h5' sx={{ mb: 1.5, fontWeight: 600 }}>
          Reset Your Password 🔑
        </Typography>
        <Typography variant='body2' sx={{ mb: 4 }}>
          Enter your new password and confirm it below.
        </Typography>

        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            type='password'
            label='New Password'
            sx={{ mb: 4 }}
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            fullWidth
            type='password'
            label='Confirm Password'
            sx={{ mb: 4 }}
            {...register('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
          <Button
            fullWidth
            size='large'
            type='submit'
            variant='contained'
            disabled={isSubmitting}
            sx={{ mb: 3 }}
          >
            {isSubmitting ? 'Submitting...' : 'Reset Password'}
          </Button>

          <Typography
            variant='body2'
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <LinkStyled onClick={() => router.push('/login')}>
              Back to login
            </LinkStyled>
          </Typography>
        </form>
      </BoxWrapper>
    </CenterWrapper>
  )
}

ResetPasswordPage.guestGuard = true
ResetPasswordPage.authGuard = false

ResetPasswordPage.getLayout = (page: ReactNode) => (
  <BlankLayout>{page}</BlankLayout>
)
export default ResetPasswordPage
