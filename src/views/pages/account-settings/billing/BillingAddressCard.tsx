// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'
import { postAddress } from 'src/pages/api/address/postAddress'
import toast from 'react-hot-toast'
import {
  AddressListSetAddressesProps,
  PostAddressResponseType,
} from 'src/types/apps/addressType'
const defaultValues = {
  address: '',
  state: '',
  city: '',
  zipCode: '',
  country: 'brazil',
}

const schema = z.object({
  address: z.string().min(1, 'Billing Address is required'),
  state: z.string().min(1, 'State is required'),
  city: z.string().min(1, 'City is required'),
  zipCode: z.string().regex(/^\d+$/, 'Zip Code must be a number'),
  country: z.string().min(1, 'Country is required'),
})

type BillingAddressForm = z.infer<typeof schema>

const BillingAddressCard = ({ setAddresses }: AddressListSetAddressesProps) => {
  // ** Hooks
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<BillingAddressForm>({
    defaultValues,
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: BillingAddressForm) => {
    const postData = {
      ...data,
      zipCode: Number(data.zipCode),
    }

    postAddress(postData).then(
      (response: PostAddressResponseType | null | undefined) => {
        if (response) {
          setAddresses((prevAddresses: PostAddressResponseType[]) => [
            ...prevAddresses,
            response,
          ])
          toast.success('Address saved successfully', {
            position: 'bottom-right',
          })
        } else {
          toast.error('Failed to save address', { position: 'bottom-right' })
        }
      },
    )
  }

  const resetForm = () => {
    reset()
  }

  return (
    <Card>
      <CardHeader title='Billing Address' />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Controller
                name='address'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Address'
                    placeholder='Address'
                    error={!!errors.address}
                    helperText={errors.address?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='state'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='State'
                    placeholder='GO'
                    error={!!errors.state}
                    helperText={errors.state?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='city'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='City'
                    placeholder='Aparecida de Goiania'
                    error={!!errors.city}
                    helperText={errors.city?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='zipCode'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type='number'
                    label='Zip Code'
                    placeholder='231465'
                    error={!!errors.zipCode}
                    helperText={errors.zipCode?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='country'
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.country}>
                    <InputLabel>Country</InputLabel>
                    <Select {...field} label='Country'>
                      <MenuItem value='brazil'>Brazil</MenuItem>
                      <MenuItem value='australia'>Australia</MenuItem>
                      <MenuItem value='canada'>Canada</MenuItem>
                      <MenuItem value='france'>France</MenuItem>
                      <MenuItem value='united-kingdom'>United Kingdom</MenuItem>
                      <MenuItem value='united-states'>United States</MenuItem>
                    </Select>
                    <FormHelperText>{errors.country?.message}</FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type='submit' variant='contained' sx={{ mr: 4 }}>
                Save Changes
              </Button>
              <Button variant='outlined' color='secondary' onClick={resetForm}>
                Discard
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default BillingAddressCard
