// ** React Imports
import { ReactNode, useState } from 'react'

// ** Next Import
import Link from 'next/link'
import router from 'next/router'
import { register as onRegister } from '../api/auth/register'

// ** MUI Components
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'

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
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// ** Styled Components
import {
  BoxWrapper,
  LinkStyled,
  RegisterIllustration,
  RightWrapper,
  TreeIllustration,
  TypographyStyled,
} from './style'
import GoodGameLogo from 'src/@core/components/logo'

const RegisterIllustrationWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  padding: theme.spacing(20),
  paddingRight: '0 !important',
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(10),
  },
}))

const formDataSchema = z.object({
  name: z.string().min(3, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid e-mail' }),
  phone: z
    .string()
    .regex(/^\+\d{1,3}\d{2,3}\d{8,}$/, {
      message: 'Invalid phone number format. Example: +0011222222222',
    })
    .nullable(),
  password: z
    .string()
    .min(6, { message: 'Password must have at least 6 characters' }),
  agree: z.boolean().refine((data) => data === true, {
    message: 'You must agree to the terms and conditions',
  }),
})

type formDataType = {
  name: string
  email: string
  phone?: string
  password: string
  agree: boolean
}

const Register = () => {
  const redirectLogin = () => {
    router.push('/login')
  }

  // ** States
  const [showPassword, setShowPassword] = useState<boolean>(false)

  // ** Hooks
  const theme = useTheme()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** Vars
  const { skin } = settings

  const imageSource =
    skin === 'bordered'
      ? 'auth-v2-register-illustration-bordered'
      : 'auth-v2-register-illustration'

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<formDataType>({
    resolver: zodResolver(formDataSchema),
  })

  const handleGoogleSignUp = () => {
    const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent('http://localhost:3001/auth/google/callback')}&response_type=code&scope=profile email`
    window.location.href = googleUrl
  }

  async function handleSignUp(data: formDataType): Promise<void> {
    onRegister({ data, onRedirectToLogin: redirectLogin })
  }

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
          <RegisterIllustrationWrapper>
            <RegisterIllustration
              alt='register-illustration'
              src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
            />
          </RegisterIllustrationWrapper>
          <FooterIllustrationsV2
            image={
              <TreeIllustration alt='tree' src='/images/pages/tree-2.png' />
            }
          />
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
                Adventure starts here 🚀
              </TypographyStyled>
              <Typography variant='body2'>
                Make your app management easy and fun!
              </Typography>
            </Box>
            <form
              noValidate
              autoComplete='off'
              onSubmit={handleSubmit(handleSignUp)}
            >
              <TextField
                {...register('name')}
                autoFocus
                fullWidth
                sx={{ mb: 4 }}
                label='Name'
                error={!!errors.name}
                placeholder='Vinicius Caetano'
              />
              <TextField
                {...register('email')}
                fullWidth
                label='Email'
                error={!!errors.email}
                sx={{ mb: 4 }}
                placeholder='gainagencia@develop.com'
              />
              <TextField
                {...register('phone')}
                fullWidth
                label='Phone'
                sx={{ mb: 4 }}
                error={!!errors.phone}
                placeholder='62 999999999'
              />
              <FormControl fullWidth>
                <InputLabel htmlFor='auth-login-v2-password'>
                  Password
                </InputLabel>
                <OutlinedInput
                  {...register('password')}
                  label='Password'
                  id='auth-login-v2-password'
                  error={!!errors.password}
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
                        />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    {...register('agree')}
                    sx={{ ...(errors.agree && { color: 'red' }) }}
                  />
                }
                sx={{
                  mb: 4,
                  mt: 1.5,
                  '& .MuiFormControlLabel-label': { fontSize: '0.875rem' },
                }}
                label={
                  <>
                    <Typography
                      variant='body2'
                      component='span'
                      sx={{ ...(errors.agree && { color: 'red' }) }}
                    >
                      I agree to{' '}
                    </Typography>
                    <LinkStyled href='/' onClick={(e) => e.preventDefault()}>
                      privacy policy & terms
                    </LinkStyled>
                  </>
                }
              />
              <Button
                fullWidth
                size='large'
                type='submit'
                variant='contained'
                sx={{ mb: 7 }}
                disabled={isLoading}
              >
                Sign up
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
                  Already have an account?
                </Typography>
                <Typography variant='body2'>
                  <LinkStyled href='/login'>Sign in instead</LinkStyled>
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
                  sx={{ color: '#db4437' }}
                  onClick={() => handleGoogleSignUp()}
                >
                  <Icon icon='mdi:google' />
                </IconButton>
              </Box>
            </form>
          </BoxWrapper>
        </Box>
      </RightWrapper>
    </Box>
  )
}

Register.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

Register.guestGuard = true

export default Register
