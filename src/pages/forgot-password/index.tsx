// ** React Imports
import { ReactNode } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box, { BoxProps } from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Typography, { TypographyProps } from '@mui/material/Typography'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import GoodGameLogo from 'src/@core/components/logo'

// ** Form + Validation
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { requestPasswordReset } from '../api/auth/requestPasswordReset'
import toast from 'react-hot-toast'

// Styled Components
const ForgotPasswordIllustrationWrapper = styled(Box)<BoxProps>(
  ({ theme }) => ({
    padding: theme.spacing(20),
    paddingRight: '0 !important',
    [theme.breakpoints.down('lg')]: {
      padding: theme.spacing(10),
    },
  }),
)

const ForgotPasswordIllustration = styled('img')(({ theme }) => ({
  maxWidth: '53.125rem',
  [theme.breakpoints.down('lg')]: {
    maxWidth: '35rem',
  },
}))

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 450,
  },
}))

const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('xl')]: {
    width: '100%',
  },
  [theme.breakpoints.down('md')]: {
    maxWidth: 400,
  },
}))

const TypographyStyled = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down('md')]: { mt: theme.spacing(8) },
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  display: 'flex',
  fontSize: '0.875rem',
  alignItems: 'center',
  textDecoration: 'none',
  justifyContent: 'center',
  color: theme.palette.primary.main,
}))

// =======================
// Validation schema
// =======================
const schema = z.discriminatedUnion('method', [
  z.object({
    method: z.literal('email'),
    email: z.string().email('Enter a valid email address'),
    phone: z.string().optional(),
  }),
  z.object({
    method: z.literal('phone'),
    phone: z
      .string()
      .regex(
        /^\+\d{10,15}$/,
        'Enter a valid phone number (e.g. +559999999999)',
      ),
    email: z.string().optional(),
  }),
])

type ForgotPasswordForm = z.infer<typeof schema>

const ForgotPassword = () => {
  // ** Hooks
  const theme = useTheme()
  const { settings } = useSettings()
  const { skin } = settings
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** Form
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(schema),
    defaultValues: { method: 'email' },
  })

  const selectedMethod = watch('method')

  // ** Handlers
  const onSubmit = async (data: ForgotPasswordForm) => {
    requestPasswordReset({
      data,
    }).then((response) => {
      if (response) {
        toast.success('Reset link sent successfully!', {
          position: 'bottom-right',
        })
      } else {
        toast.error('Something went wrong, please try again later.', {
          position: 'bottom-right',
        })
      }
    })
  }

  const imageSource =
    skin === 'bordered'
      ? 'auth-v2-forgot-password-illustration-bordered'
      : 'auth-v2-forgot-password-illustration'

  return (
    <Box className='content-right'>
      {!hidden ? (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ForgotPasswordIllustrationWrapper>
            <ForgotPasswordIllustration
              alt='forgot-password-illustration'
              src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
            />
          </ForgotPasswordIllustrationWrapper>
          <FooterIllustrationsV2 />
        </Box>
      ) : null}
      <RightWrapper
        sx={
          skin === 'bordered' && !hidden
            ? { borderLeft: `1px solid ${theme.palette.divider}` }
            : {}
        }
      >
        <Box
          sx={{
            p: 12,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'background.paper',
          }}
        >
          <BoxWrapper>
            <Box
              sx={{
                top: 30,
                left: 40,
                display: 'flex',
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <GoodGameLogo />
              <Typography
                variant='h6'
                sx={{
                  ml: 3,
                  lineHeight: 1,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  fontSize: '1.5rem !important',
                }}
              >
                {themeConfig.templateName}
              </Typography>
            </Box>
            <Box sx={{ mb: 6 }}>
              <TypographyStyled variant='h5'>
                Forgot Password? 🔒
              </TypographyStyled>
              <Typography variant='body2'>
                Choose how you want to receive your reset instructions
              </Typography>
            </Box>
            <form
              noValidate
              autoComplete='off'
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormLabel component='legend' sx={{ mb: 2, fontWeight: 600 }}>
                Send reset link via:
              </FormLabel>

              <Controller
                name='method'
                control={control}
                defaultValue='email'
                render={({ field }) => (
                  <RadioGroup row {...field} sx={{ mb: 4 }}>
                    <FormControlLabel
                      value='email'
                      control={<Radio />}
                      label='Email'
                    />
                    <FormControlLabel
                      value='phone'
                      control={<Radio />}
                      label='Phone'
                    />
                  </RadioGroup>
                )}
              />

              {selectedMethod === 'email' && (
                <TextField
                  autoFocus
                  type='email'
                  label='Email'
                  fullWidth
                  sx={{ display: 'flex', mb: 4 }}
                  {...register('email')}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}

              {selectedMethod === 'phone' && (
                <TextField
                  autoFocus
                  type='tel'
                  label='Phone Number'
                  fullWidth
                  sx={{ display: 'flex', mb: 4 }}
                  {...register('phone')}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              )}

              <Button
                fullWidth
                size='large'
                type='submit'
                variant='contained'
                disabled={isSubmitting}
                sx={{ mb: 5.25 }}
              >
                {isSubmitting ? 'Sending...' : 'Send reset link'}
              </Button>
              <Typography
                variant='body2'
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <LinkStyled href='/login'>
                  <Icon icon='mdi:chevron-left' />
                  <span>Back to login</span>
                </LinkStyled>
              </Typography>
            </form>
          </BoxWrapper>
        </Box>
      </RightWrapper>
    </Box>
  )
}

ForgotPassword.getLayout = (page: ReactNode) => (
  <BlankLayout>{page}</BlankLayout>
)

ForgotPassword.guestGuard = true

export default ForgotPassword
