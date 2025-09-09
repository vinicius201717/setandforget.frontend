/* eslint-disable react/no-unescaped-entities */
// ** React Imports
import { useState, ReactNode, MouseEvent } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { useTheme } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// import useBgColor from 'src/@core/hooks/useBgColor'
import { useSettings } from 'src/@core/hooks/useSettings'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'

// #region styled
// ** Styled Components
import {
  BoxWrapper,
  FormControlLabel,
  LinkStyled,
  LoginIllustration,
  LoginIllustrationWrapper,
  RightWrapper,
  TypographyStyled,
} from './style'
import { Dialog, DialogContent } from '@mui/material'
import GoodGameLogo from 'src/@core/components/logo'
// #endregion
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

const formSchemaCode = z.object({
  code: z
    .string()
    .min(6, { message: 'The code must be 6 characters long' })
    .max(6, { message: 'The code must be 6 characters long' }),
})

interface FormData {
  email: string
  password: string
}
interface FormDataCode {
  code: string
}
const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState<boolean>(true)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [openInputCode, setOpenInputCode] = useState<boolean>(false)
  const [userId, setUserId] = useState<string>('')

  // ** Hooks
  const auth = useAuth()
  const theme = useTheme()

  // const bgColors = useBgColor()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** Vars
  const { skin } = settings

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: {
      email: 'vcsousa414@gmail.com',
      password: 'a22k4f99e@@caeAA',
    },
    resolver: zodResolver(formSchema),
  })

  const {
    control: controlCode,
    handleSubmit: handleSubmitCode,
    formState: { errors: errorsCode },
  } = useForm<FormDataCode>({
    mode: 'onBlur',
    defaultValues: {
      code: '',
    },
    resolver: zodResolver(formSchemaCode),
  })

  const openDialogSecurityCode = () => {
    setOpenInputCode((current) => !current)
  }

  const errorCallback = () => {
    setError('email', {
      type: 'manual',
      message: 'Email is invalid',
    })
    setError('password', {
      type: 'manual',
      message: 'Password is invalid',
    })
  }

  const onSetUserId = (id: string) => {
    setUserId(id)
  }
  const handleLogin = async (data: FormData) => {
    const { email, password } = data
    const params = { email, password, rememberMe }
    try {
      auth.login(params, openDialogSecurityCode, onSetUserId, errorCallback)
    } catch (error) {
      console.error('Failed to login:', error)
    }
  }

  const onSubmitCode = async (data: FormDataCode) => {
    const params = { ...data, userId }
    auth.loginAfterCode(params, rememberMe).then(() => {
      openDialogSecurityCode()
    })
  }

  const imageSource =
    skin === 'bordered'
      ? 'auth-v2-login-illustration-bordered'
      : 'auth-v2-login-illustration'

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
          <LoginIllustrationWrapper>
            <LoginIllustration
              alt='login-illustration'
              src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
            />
          </LoginIllustrationWrapper>
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
                Welcome to {themeConfig.templateName}! 👋🏻
              </TypographyStyled>
              <Typography variant='body2'>
                Please sign-in to your account and start the adventure
              </Typography>
            </Box>
            <form
              noValidate
              autoComplete='off'
              onSubmit={handleSubmit(handleLogin)}
            >
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='email'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      autoFocus
                      label='Email'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.email)}
                      placeholder='admin@materio.com'
                    />
                  )}
                />
                {errors.email && (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {errors.email.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth>
                <InputLabel
                  htmlFor='auth-login-v2-password'
                  error={Boolean(errors.password)}
                >
                  Password
                </InputLabel>
                <Controller
                  name='password'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <OutlinedInput
                      value={value}
                      onBlur={onBlur}
                      label='Password'
                      onChange={onChange}
                      id='auth-login-v2-password'
                      error={Boolean(errors.password)}
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <Icon
                              icon={
                                showPassword
                                  ? 'mdi:eye-outline'
                                  : 'mdi:eye-off-outline'
                              }
                              fontSize={20}
                            />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errors.password && (
                  <FormHelperText sx={{ color: 'error.main' }} id=''>
                    {errors.password.message}
                  </FormHelperText>
                )}
              </FormControl>
              <Box
                sx={{
                  mb: 4,
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                }}
              >
                <FormControlLabel
                  label='Remember Me'
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                  }
                />
                <LinkStyled href='/forgot-password'>
                  Forgot Password?
                </LinkStyled>
              </Box>
              <Button
                fullWidth
                size='large'
                type='submit'
                variant='contained'
                sx={{ mb: 7 }}
              >
                Login
              </Button>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                <Typography variant='body2' sx={{ mr: 2 }}>
                  New on our platform?
                </Typography>
                <Typography variant='body2'>
                  <LinkStyled href='/register'>Create an account</LinkStyled>
                </Typography>
              </Box>
              <Divider sx={{ my: (theme) => `${theme.spacing(5)} !important` }}>
                or
              </Divider>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <IconButton
                  href='/'
                  component={Link}
                  sx={{ color: '#497ce2' }}
                  onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                >
                  <Icon icon='mdi:facebook' />
                </IconButton>
                <IconButton
                  href='/'
                  component={Link}
                  sx={{ color: '#1da1f2' }}
                  onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                >
                  <Icon icon='mdi:twitter' />
                </IconButton>
                <IconButton
                  href='/'
                  component={Link}
                  onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                  sx={{
                    color: (theme) =>
                      theme.palette.mode === 'light' ? '#272727' : 'grey.300',
                  }}
                >
                  <Icon icon='mdi:github' />
                </IconButton>
                <IconButton
                  href='/'
                  component={Link}
                  sx={{ color: '#db4437' }}
                  onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                >
                  <Icon icon='mdi:google' />
                </IconButton>
              </Box>
            </form>
          </BoxWrapper>
        </Box>
      </RightWrapper>
      <Dialog fullWidth open={openInputCode}>
        <DialogContent
          sx={{
            px: (theme) => [
              `${theme.spacing(5)} !important`,
              `${theme.spacing(15)} !important`,
            ],
            py: (theme) => [
              `${theme.spacing(8)} !important`,
              `${theme.spacing(12.5)} !important`,
            ],
          }}
        >
          <Box sx={{ mb: 12, display: 'flex', justifyContent: 'center' }}>
            <Typography variant='h5' sx={{ fontSize: '1.625rem' }}>
              Two-Factor Verification
            </Typography>
          </Box>

          <Typography sx={{ color: 'text.secondary', fontWeight: 500 }}>
            Verify Your Mobile Number for SMS
          </Typography>
          <Typography sx={{ mt: 4, mb: 6 }}>
            For security reasons, we need to verify your identity. A
            verification code has been sent to the phone number associated with
            your account
          </Typography>

          <form onSubmit={handleSubmitCode(onSubmitCode)}>
            <div>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='code'
                  control={controlCode}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      autoFocus
                      label='Code'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errorsCode.code)}
                      placeholder='XXXXXX'
                    />
                  )}
                />
                {errorsCode.code && (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {errorsCode.code.message}
                  </FormHelperText>
                )}
              </FormControl>
              <Button type='submit' variant='contained' color='primary'>
                Apply
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

LoginPage.guestGuard = true

export default LoginPage
