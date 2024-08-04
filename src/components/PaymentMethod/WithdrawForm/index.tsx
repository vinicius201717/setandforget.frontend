import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  CircularProgress,
  DialogActions,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useAuth } from 'src/hooks/useAuth'
import { createBankAccount } from 'src/pages/api/bank-account/createBankAccount'
import {
  BankAccountData,
  BankAccountResponse,
} from 'src/types/apps/bankAccountsType'
import { currencies } from 'src/views/pages/account-settings/billing/currencies'
import { z } from 'zod'

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
}

const schema = z.object({
  accountHolderName: z
    .string({
      required_error: 'Account holder name is required',
    })
    .min(1, 'Account holder name is required'),

  accountHolderType: z.enum(['individual', 'company'], {
    required_error: 'Account holder type is required',
  }),

  bankName: z
    .string({
      required_error: 'Bank name is required',
    })
    .min(1, 'Bank name is required'),

  routingNumber: z
    .string({
      required_error: 'Routing number is required',
    })
    .regex(/^\d{4,9}$/, 'Routing number must be 4 or 9 digits'),

  accountNumber: z
    .string({
      required_error: 'Account number is required',
    })
    .regex(/^\d{8,12}$/, 'Account number must be between 8 and 12 digits'),

  currency: z
    .string({
      required_error: 'Currency is required',
    })
    .min(1, 'Currency is required'),

  country: z
    .string({
      required_error: 'Country is required',
    })
    .min(1, 'Country is required'),
})

interface WithdrawFormProps {
  openDelete: boolean
  handleCloseDelete: () => void
  handleDeleteDelete: () => void
  selectedBankDelete: string
  setBankAccounts: React.Dispatch<React.SetStateAction<BankAccountResponse[]>>
}

export const WithdrawForm = ({
  openDelete,
  setBankAccounts,
  handleCloseDelete,
  handleDeleteDelete,
}: WithdrawFormProps) => {
  const [loadingWithdraw, setLoadingWithdraw] = useState<boolean>(false)

  const { user } = useAuth()

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<BankAccountData>({
    resolver: zodResolver(schema),
    defaultValues: {
      accountHolderName: user?.name.toUpperCase() || '',
      accountHolderType: 'individual',
      bankName: '',
      routingNumber: '',
      accountNumber: '',
      currency: '',
      country: '',
    },
  })

  const handleResetFormWithdraw = () => {
    reset()
  }

  const onSubmit = (data: BankAccountData) => {
    setLoadingWithdraw(true)
    createBankAccount(data)
      .then((response) => {
        setLoadingWithdraw(false)
        if (response) {
          setBankAccounts((prev) => [
            ...prev,
            response as unknown as BankAccountResponse,
          ])
          toast.success('Bank account created successfully!', {
            position: 'bottom-right',
          })
        }
      })
      .catch((err) => {
        setLoadingWithdraw(false)
        console.log(err)
        toast.error('Error creating bank account', { position: 'bottom-right' })
      })
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} marginLeft={1} marginTop={5}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Controller
                name='accountHolderName'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Account Holder Name'
                    type='text'
                    placeholder='VINICIUS CAETANO'
                    error={!!errors.accountHolderName}
                    helperText={errors.accountHolderName?.message}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Controller
                name='accountHolderType'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Account Holder Type'
                    type='text'
                    placeholder='individual or company'
                    error={!!errors.accountHolderType}
                    helperText={errors.accountHolderType?.message}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Controller
                name='bankName'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Bank Name'
                    type='text'
                    placeholder='Nubank'
                    error={!!errors.bankName}
                    helperText={errors.bankName?.message}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Controller
                name='routingNumber'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Routing Number'
                    placeholder='00000000'
                    type='number'
                    error={!!errors.routingNumber}
                    helperText={errors.routingNumber?.message}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Controller
                name='accountNumber'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type='number'
                    label='Account Number'
                    placeholder='000123456789'
                    error={!!errors.accountNumber}
                    helperText={errors.accountNumber?.message}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Controller
                name='country'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type='text'
                    label='Country'
                    placeholder='Brazil'
                    error={!!errors.country}
                    helperText={errors.country?.message}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id='demo-simple-select-helper-label'>
                Currency
              </InputLabel>
              <Controller
                name='currency'
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId='demo-simple-select-helper-label'
                    id='demo-simple-select-helper'
                    label='Currency'
                    MenuProps={{
                      PaperProps: {
                        className: 'custom-scrollbar',
                        style: {
                          maxHeight: 200,
                        },
                      },
                    }}
                    error={!!errors.currency}
                  >
                    {currencies.map((currency) => (
                      <MenuItem key={currency} value={currency}>
                        {currency}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12} marginLeft={4} marginTop={10}>
          <Button
            type='submit'
            variant='contained'
            sx={{ mr: 4, minWidth: '150px' }}
            disabled={loadingWithdraw}
          >
            {loadingWithdraw ? <CircularProgress size={24} /> : 'Save Changes'}
          </Button>
          <Button
            type='reset'
            variant='outlined'
            color='secondary'
            onClick={handleResetFormWithdraw}
          >
            Reset
          </Button>
        </Grid>
      </form>
      <Modal
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Confirm Deletion
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            Are you sure you want to delete this bank account?
          </Typography>
          <Box
            sx={{
              mt: 4,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Button
              variant='contained'
              color='primary'
              onClick={handleCloseDelete}
            >
              Cancel
            </Button>
            <Button
              variant='outlined'
              color='secondary'
              onClick={handleDeleteDelete}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
      <DialogActions
        sx={{
          justifyContent: 'center',
          px: (theme) => [
            `${theme.spacing(5)} !important`,
            `${theme.spacing(15)} !important`,
          ],
          pb: (theme) => [
            `${theme.spacing(8)} !important`,
            `${theme.spacing(12.5)} !important`,
          ],
        }}
      >
        {/* <Button
          variant='contained'
          sx={{ mr: 2 }}
          onClick={handleEditCardClose}
        >
          {loadingWithdraw ? <CircularProgress size={24} /> : 'Submit'}
        </Button>
        <Button
          variant='outlined'
          color='secondary'
          onClick={handleEditCardClose}
        >
          Cancel
        </Button> */}
      </DialogActions>
    </>
  )
}
