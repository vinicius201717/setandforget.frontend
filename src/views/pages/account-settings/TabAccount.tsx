// ** React Imports
import { useState, ElementType, ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import Button, { ButtonProps } from '@mui/material/Button'
import { CircularProgress } from '@mui/material'

// ** Third Party Imports
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useMutation, useQuery } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'

import getUser from 'src/pages/api/user/get-user'
import updateUser from 'src/pages/api/user/update-user'
import { areObjectsEqual } from 'src/utils/are-objects-equals'
import { z } from 'zod'
import { getCountryByPhoneNumber } from 'src/utils/phoneNumber'
import verifyEmail from 'src/pages/api/user/verify-email'
import verifyPhone from 'src/pages/api/user/verify-phone'
import { GridCheckCircleIcon } from '@mui/x-data-grid'

// #region STYLES
const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: 4,
  marginRight: theme.spacing(5),
}))

const ButtonStyled = styled(Button)<
  ButtonProps & { component?: ElementType; htmlFor?: string }
>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center',
  },
}))

const schema = z.object({
  name: z.string().refine(
    (value) => {
      return value === null || /^[a-zA-Z0-9\s]*$/.test(value)
    },
    {
      message: 'Invalid characters. Only alphanumeric and spaces are allowed.',
    },
  ),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().refine(
    (value) => {
      return value === null || /^\d{9,14}$/.test(value)
    },
    {
      message: 'Phone must be between 9 and 14 digits.',
    },
  ),
})

// #endregion

type FormatData = z.infer<typeof schema>

const TabAccount = () => {
  // #region STATES AND HOOKS
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')
  const [updateLoading, setUpdateLoading] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormatData>({
    resolver: zodResolver(schema),
  })
  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['user-account'],
    queryFn: getUser,
  })
  const { mutateAsync: updateProfileFn } = useMutation({
    mutationKey: ['user-update'],
    mutationFn: updateUser,
    onSuccess: () => {
      refetch()
    },
  })
  // #endregion

  const handleInputImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()
    const files = event.target.files
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)
      reader.readAsDataURL(files[0])
    }
  }

  const handleUpdateUserData = async (data: FormatData) => {
    setUpdateLoading(true)
    try {
      const currentUser = {
        name: user?.data.name,
        email: user?.data.email,
        phone: user?.data.phone,
      }
      if (areObjectsEqual(data, currentUser)) {
        toast.error('You did not make any changes', {
          icon: '⚠️',
          position: 'bottom-right',
        })
        return
      }
      await updateProfileFn({
        name: data.name,
        email: data.email,
        phone: data.phone,
      })
      toast.success('Your changes have been successfully updated.', {
        position: 'bottom-right',
      })
    } catch (error) {
      console.log(error)

      toast.error('Update failed. Please try again.', {
        position: 'bottom-right',
      })
    } finally {
      setUpdateLoading(false)
    }
  }

  const onVerifyEmail = () => {
    verifyEmail()
    toast.success('Code sent to your email successfully', {
      position: 'bottom-right',
    })
  }

  const onVerifyPhone = () => {
    verifyPhone()
    toast.success('Code sent to your number successfully', {
      position: 'bottom-right',
    })
  }
  return (
    <>
      <Grid container spacing={6}>
        {isLoading ? (
          <Box
            sx={{
              mt: '20%',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              mr: 'auto',
              ml: 'auto',
            }}
          >
            <CircularProgress sx={{ mb: 4 }} />
          </Box>
        ) : (
          <Grid item xs={12}>
            <Card>
              <form onSubmit={handleSubmit(handleUpdateUserData)}>
                <CardContent sx={{ pb: (theme) => `${theme.spacing(10)}` }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ImgStyled src={imgSrc} alt='Profile Pic' />
                    <div>
                      <ButtonStyled
                        component='label'
                        variant='contained'
                        htmlFor='account-settings-upload-image'
                      >
                        Change avatar
                        <input
                          hidden
                          type='file'
                          accept='image/png, image/jpeg'
                          onChange={handleInputImageChange}
                          id='account-settings-upload-image'
                        />
                      </ButtonStyled>
                    </div>
                  </Box>
                </CardContent>
                <CardContent>
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        {...register('name')}
                        label='Name'
                        placeholder={user?.data.name}
                        defaultValue={user?.data.name}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        {...register('phone')}
                        label='Phone Number'
                        type='number'
                        placeholder={user?.data.phone}
                        defaultValue={user?.data.phone}
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              {getCountryByPhoneNumber(user?.data.phone)}
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment
                              position='end'
                              sx={{ cursor: 'pointer', color: 'primary.main' }}
                            >
                              {user?.data.phone_verified ? (
                                <GridCheckCircleIcon />
                              ) : (
                                <div>
                                  <span onClick={onVerifyPhone}>
                                    unverified
                                  </span>
                                </div>
                              )}
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        {...register('email')}
                        type='email'
                        label='Email'
                        placeholder={user?.data.email}
                        defaultValue={user?.data.email}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment
                              position='end'
                              sx={{ cursor: 'pointer', color: 'primary.main' }}
                            >
                              {user?.data.email_verified ? (
                                <GridCheckCircleIcon />
                              ) : (
                                <div>
                                  <span onClick={onVerifyEmail}>
                                    unverified
                                  </span>
                                </div>
                              )}
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type='submit'
                        variant='contained'
                        sx={{ mr: 4 }}
                        disabled={updateLoading}
                      >
                        Save Changes
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </form>
            </Card>
          </Grid>
        )}
      </Grid>
    </>
  )
}

export default TabAccount
