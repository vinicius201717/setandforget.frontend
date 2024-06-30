/* eslint-disable react/no-unescaped-entities */
// ** React Imports

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'
import { useAuth } from 'src/hooks/useAuth'
import { useEffect, useState } from 'react'
import { getCountryByPhoneNumber } from 'src/utils/phoneNumber'
import { Switch } from '@mui/material'
import { updateTwoFactor } from 'src/pages/api/user/update-security'
import toast from 'react-hot-toast'

const TwoFactorAuthenticationCard = () => {
  const defaltState = false
  const { user } = useAuth()
  // ** States
  const [open, setOpen] = useState<boolean>(defaltState)
  const [changeSwitch, setChangeSwitch] = useState(defaltState)
  const [twoFactor, setTwoFactor] = useState<boolean>(
    user?.twoFactor as boolean,
  )

  // ** Hooks
  const {
    control,
    formState: { errors },
  } = useForm({ defaultValues: { phoneNumber: user?.phone } })

  const toggle2FADialog = () => setOpen(!open)

  const on2FAFormSubmit = () => {
    updateTwoFactor()
      .then(() => {
        setTwoFactor((current) => !current)
        setChangeSwitch((current) => !current)
        toast.success('Challenge created successfully!', {
          position: 'bottom-right',
        })
      })
      .catch(() => {
        toast.error('Internal error. try later!', {
          position: 'bottom-right',
        })
      })
  }

  const onChangeSwitch = () => {
    setChangeSwitch((current) => !current)
  }

  const close2FADialog = () => {
    setChangeSwitch(defaltState)
    toggle2FADialog()
  }

  const label = { inputProps: { 'aria-label': 'Switch demo' } }

  useEffect(() => {
    setChangeSwitch(defaltState)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <>
      <Card>
        <CardHeader title='Two-steps verification' />
        <CardContent>
          <Typography sx={{ mb: 4, color: 'text.secondary' }}>
            Two factor authentication is not enabled yet.
          </Typography>
          <Typography sx={{ mb: 6, color: 'text.secondary' }}>
            Two-factor authentication adds an additional layer of security to
            your account by requiring more than just a password to log in.{' '}
            <Box
              href='/'
              component={'a'}
              onClick={(e) => e.preventDefault()}
              sx={{ textDecoration: 'none', color: 'primary.main' }}
            >
              Learn more.
            </Box>
          </Typography>
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <Button variant='contained' onClick={toggle2FADialog}>
              Enable two-factor authentication
            </Button>
            <Button variant='outlined' color={twoFactor ? 'success' : 'error'}>
              {twoFactor ? 'Enabled' : 'Disabled'}
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Dialog fullWidth open={open} onClose={toggle2FADialog}>
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
              Enable One Time Password
            </Typography>
          </Box>

          <IconButton
            size='small'
            onClick={close2FADialog}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>

          <Typography sx={{ color: 'text.secondary', fontWeight: 500 }}>
            Verify Your Mobile Number for SMS
          </Typography>
          <Typography sx={{ mt: 4, mb: 6 }}>
            When this feature is turned on, we'll check every time you sign in
            from a new device using your registered phone number.
          </Typography>

          <form>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel
                htmlFor='opt-phone-number'
                error={Boolean(errors.phoneNumber)}
              >
                Phone Number
              </InputLabel>
              <Controller
                name='phoneNumber'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <OutlinedInput
                    type='number'
                    value={value}
                    onChange={onChange}
                    label='Phone Number'
                    id='opt-phone-number'
                    placeholder={user?.phone}
                    error={Boolean(errors.phoneNumber)}
                    disabled={true}
                    startAdornment={
                      <InputAdornment position='start'>
                        {getCountryByPhoneNumber(user?.phone as string)}
                      </InputAdornment>
                    }
                    sx={{
                      '& .Mui-disabled': {
                        color: 'text.primary',
                        '-webkit-text-fill-color': 'unset',
                        opacity: 1,
                      },
                    }}
                  />
                )}
              />
              {errors.phoneNumber && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  Please enter a valid phone number
                </FormHelperText>
              )}
            </FormControl>
            <div>
              <Switch
                {...label}
                defaultChecked={twoFactor}
                onClick={onChangeSwitch}
              />
              <Button
                type='button'
                variant='contained'
                color='primary'
                onClick={on2FAFormSubmit}
                disabled={!changeSwitch}
              >
                Apply
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default TwoFactorAuthenticationCard
