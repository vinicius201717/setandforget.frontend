import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import NextLink from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  CircularProgress,
  Link as MUILink,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'
import toast from 'react-hot-toast'
import { postWithdrawPix } from 'src/pages/api/withdraw/postWithdrawPix'

// Schema de validação Zod
const schema = z.object({
  amount: z
    .string()
    .refine(
      (val) => /^\d+(\.\d{2})?$/.test(val),
      'Must be a valid amount with 2 decimal places',
    )
    .transform((val) => parseFloat(val))
    .refine(
      (val) => val >= 20,
      'The minimum withdrawal amount via PIX is R$ 20.00',
    )
    .refine(
      (val) => val <= 5000,
      'The maximum withdrawal amount via PIX is R$ 5,000.00',
    ),
  ownerTaxnumber: z
    .string()
    .regex(/^\d{11}$/, 'CPF must contain exactly 11 digits')
    .refine((val) => validateCPF(val), 'Invalid CPF'),
  pixKeyType: z.number().min(296, 'Select a valid PIX key type'),
  pixKey: z
    .string()
    .min(1, 'PIX key is required')
    .max(100, 'PIX key is too long'),
})

function validateCPF(cpf: string): boolean {
  if (!cpf || cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false
  let sum = 0
  let remainder
  for (let i = 1; i <= 9; i++)
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i)
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cpf.substring(9, 10))) return false
  sum = 0
  for (let i = 1; i <= 10; i++)
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i)
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  return remainder === parseInt(cpf.substring(10, 11))
}

interface FormValues {
  amount: string
  ownerTaxnumber: string
  pixKeyType: number
  pixKey: string
}

const WithdrawPixPage = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { user, setUser } = useAuth()

  const accountBalance = user?.Account.amount as number

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      amount: '',
      ownerTaxnumber: '',
      pixKeyType: 296, // Default to CPF
      pixKey: '',
    },
  })

  const updateBalance = (amount: number) => {
    if (user) {
      const newAmount = user.Account.amount - amount * 100
      const updatedUser = {
        ...user,
        Account: {
          ...user.Account,
          amount: newAmount,
        },
      }
      setUser(updatedUser)
    }
  }

  const onSubmit = async (data: FormValues) => {
    console.log('Form Data:', data) // Depuração
    setLoading(true)
    const amountInCents = parseFloat(data.amount) * 100

    if (amountInCents <= accountBalance) {
      try {
        const response = await postWithdrawPix({
          amount: amountInCents,
          ownerTaxnumber: data.ownerTaxnumber,
          pixKey: data.pixKey,
        })

        console.log('API Response:', response) // Depuração
        if (response && response.response && response.response.success) {
          toast.success(
            response.response.message || 'Saque via PIX realizado com sucesso!',
            { position: 'bottom-right' },
          )
          updateBalance(parseFloat(data.amount))
        } else if (response && response.error) {
          toast.error(response.error, { position: 'bottom-right' })
        } else {
          toast.error('Erro desconhecido no processo de saque', {
            position: 'bottom-right',
          })
        }
      } catch (error) {
        console.error('API Error:', error) // Depuração
        toast.error('Ocorreu um erro: ' + (error as Error).message, {
          position: 'bottom-right',
        })
      } finally {
        setLoading(false)
      }
    } else {
      setLoading(false)
      toast.error(
        `Saldo insuficiente. Seu saldo é R$ ${accountBalance / 100}`,
        { position: 'bottom-right' },
      )
    }
  }

  return (
    <Grid container spacing={3} justifyContent='center' alignItems='center'>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant='h6' gutterBottom>
            Withdraw via PIX
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Controller
                  name='amount'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label='Valor do Saque'
                      variant='outlined'
                      {...field}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>R$</InputAdornment>
                        ),
                        inputProps: { step: 0.01 },
                      }}
                      error={!!errors.amount}
                      helperText={
                        errors.amount
                          ? errors.amount.message
                          : 'Mínimo R$ 20,00'
                      }
                      onChange={(e) => {
                        field.onChange(e.target.value)
                        trigger('amount')
                      }}
                      type='number'
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name='ownerTaxnumber'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label='CPF do Titular'
                      variant='outlined'
                      {...field}
                      error={!!errors.ownerTaxnumber}
                      helperText={
                        errors.ownerTaxnumber
                          ? errors.ownerTaxnumber.message
                          : '11 dígitos'
                      }
                      onChange={(e) => {
                        field.onChange(e.target.value.replace(/[^\d]/g, ''))
                        trigger('ownerTaxnumber')
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name='pixKeyType'
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Tipo da Chave PIX</InputLabel>
                      <Select label='Tipo da Chave PIX' {...field}>
                        <MenuItem value={296}>CPF</MenuItem>
                        <MenuItem value={297}>Telefone</MenuItem>
                        <MenuItem value={298}>Email</MenuItem>
                        <MenuItem value={299}>CNPJ</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name='pixKey'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label='Chave PIX'
                      variant='outlined'
                      {...field}
                      error={!!errors.pixKey}
                      helperText={
                        errors.pixKey
                          ? errors.pixKey.message
                          : 'Ex.: e-mail, CPF ou telefone'
                      }
                      onChange={(e) => {
                        field.onChange(e.target.value)
                        trigger('pixKey')
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <Grid item>
                    <Button
                      size='medium'
                      variant='contained'
                      color='primary'
                      type='submit'
                      disabled={loading || Object.keys(errors).length > 0}
                    >
                      {loading ? (
                        <CircularProgress size={16} color='inherit' />
                      ) : (
                        'Withdraw'
                      )}
                    </Button>
                  </Grid>
                  <NextLink href='/pages/transactions' passHref legacyBehavior>
                    <MUILink
                      sx={{
                        ml: 2,
                        color: 'primary.main',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'none' },
                      }}
                      underline='none'
                    >
                      <Grid item>
                        <Button size='small' variant='text' color='secondary'>
                          Transactions
                        </Button>
                      </Grid>
                    </MUILink>
                  </NextLink>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default WithdrawPixPage
