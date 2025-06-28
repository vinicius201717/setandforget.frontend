/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  InputAdornment,
  Card,
  CardContent,
  Link as MUILink,
} from '@mui/material'
import { deposit, DepositResponse } from 'src/pages/api/payment/deposit'
import toast from 'react-hot-toast'
import DepositSuccessModal from './DepositSuccessModal'
import NextLink from 'next/link'

// Schema de validação Zod
const schema = z.object({
  amount: z
    .string()
    .refine(
      (val) => /^\d+(\.\d{1,2})?$/.test(val),
      'Must be a valid number with up to 2 decimals',
    )
    .transform((val) => parseFloat(val))
    .refine((val) => val >= 4.5, 'Minimum amount is 4.50'),
  customerName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100),
  customerDocument: z
    .string()
    .regex(/^\d{11}$/, 'CPF must be 11 digits')
    .refine((val) => validateCPF(val), 'Invalid CPF'),
  customerPhone: z
    .string()
    .regex(
      /^\d{10,11}$/,
      'The phone number must contain only numbers and be 10 or 11 digits long.',
    ),
  customerEmail: z.string().email('Invalid email address'),
  paymentMethod: z.enum(['pix', 'creditCard'], {
    errorMap: () => ({ message: 'Please select a payment method' }),
  }),
  productName: z
    .string()
    .min(2, 'Product name must be at least 2 characters')
    .max(100)
    .optional(),
  cardNumber: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\d{13,16}$/.test(val),
      'Card number must be 13-16 digits',
    ),
  expiryDate: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^(0[1-9]|1[0-2])\/\d{2}$/.test(val),
      'Expiry date must be MM/YY format',
    ),
  cvv: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{3,4}$/.test(val), 'CVV must be 3-4 digits'),
})

// Função para validar CPF (simplificada)
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
  customerName: string
  customerDocument: string
  customerPhone: string
  customerEmail: string
  paymentMethod: 'pix' | 'creditCard'
  productName: string | undefined | ''
  cardNumber?: string
  expiryDate?: string
  cvv?: string
}

export function DepositMethod() {
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      amount: '',
      customerName: '',
      customerDocument: '',
      customerPhone: '',
      customerEmail: '',
      paymentMethod: 'pix',
      productName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    },
  })

  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'creditCard'>(
    'pix',
  )
  const [depositResponse, setDepositResponse] =
    useState<DepositResponse | null>(null)

  const [modalOpen, setModalOpen] = useState(false) // Estado para controlar o modal

  const onSubmit = async (data: FormValues) => {
    const toastId = toast.loading('Just a moment...', {
      position: 'bottom-right',
      icon: '⏳',
    })

    try {
      const response = await deposit({
        amount: parseFloat(data.amount),
        customerName: data.customerName,
        customerDocument: data.customerDocument,
        customerPhone: data.customerPhone,
        customerEmail: data.customerEmail,
        paymentType: data.paymentMethod,
        productName: data.productName,
        ...(data.paymentMethod === 'creditCard'
          ? {
              cardNumber: data.cardNumber,
              expiryDate: data.expiryDate,
              cvv: data.cvv,
            }
          : {}),
      })

      toast.dismiss(toastId)

      if (response.response?.pixCode) {
        setDepositResponse(response)
        toast.success(
          response.response.message || 'Transaction created successfully!',
          {
            position: 'bottom-right',
          },
        )
        setModalOpen(true)
      } else if (response.error) {
        toast.error(response.error, { position: 'bottom-right' })
      } else {
        toast.error('Unknown error in the deposit process', {
          position: 'bottom-right',
        })
      }
    } catch (error) {
      toast.dismiss(toastId)
      toast.error('An error occurred: ' + (error as Error).message, {
        position: 'bottom-right',
      })
    }
  }

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
      <Typography variant='h6'>Deposit</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='amount'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label='Deposit Amount'
              variant='outlined'
              fullWidth
              error={!!errors.amount}
              helperText={
                errors.amount
                  ? errors.amount.message
                  : 'Minimum deposit is R$ 20,00'
              }
              type='number'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>$</InputAdornment>
                ),
                inputProps: {
                  step: 0.01,
                },
              }}
              sx={{ mb: 2, mt: 2 }}
              onChange={(e) => {
                field.onChange(e.target.value)
                trigger('amount')
              }}
            />
          )}
        />
        <Typography variant='body2' color='textSecondary' sx={{ mb: 4 }}>
          Note: The minimum withdrawal amount is R$ 50,00.
        </Typography>
        <Controller
          name='customerName'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label='Customer Name'
              variant='outlined'
              fullWidth
              error={!!errors.customerName}
              helperText={
                errors.customerName ? errors.customerName.message : ''
              }
              sx={{ mb: 4 }}
              onChange={(e) => {
                field.onChange(e.target.value)
                trigger('customerName')
              }}
            />
          )}
        />
        <Controller
          name='customerDocument'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label='CPF (11 digits)'
              variant='outlined'
              fullWidth
              error={!!errors.customerDocument}
              helperText={
                errors.customerDocument
                  ? errors.customerDocument.message
                  : 'Enter CPF without dashes or dots'
              }
              sx={{ mb: 4 }}
              onChange={(e) => {
                field.onChange(e.target.value.replace(/[^\d]/g, ''))
                trigger('customerDocument')
              }}
            />
          )}
        />
        <Controller
          name='customerPhone'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label='Phone (e.g., +5511999999999)'
              variant='outlined'
              fullWidth
              error={!!errors.customerPhone}
              helperText={
                errors.customerPhone
                  ? errors.customerPhone.message
                  : 'Include country code (e.g., +55)'
              }
              sx={{ mb: 4 }}
              onChange={(e) => {
                field.onChange(e.target.value.replace(/[^\d+]/g, ''))
                trigger('customerPhone')
              }}
            />
          )}
        />
        <Controller
          name='customerEmail'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label='Email'
              variant='outlined'
              fullWidth
              error={!!errors.customerEmail}
              helperText={
                errors.customerEmail ? errors.customerEmail.message : ''
              }
              sx={{ mb: 4 }}
              onChange={(e) => {
                field.onChange(e.target.value)
                trigger('customerEmail')
              }}
            />
          )}
        />
        <Controller
          name='productName'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label='Product Name (optional)'
              variant='outlined'
              fullWidth
              error={!!errors.productName}
              helperText={errors.productName ? errors.productName.message : ''}
              sx={{ mb: 4 }}
              onChange={(e) => {
                field.onChange(e.target.value)
                trigger('productName')
              }}
            />
          )}
        />
        <FormControl component='fieldset' sx={{ mb: 4 }}>
          <FormLabel component='legend'>Payment Method</FormLabel>
          <Controller
            name='paymentMethod'
            control={control}
            render={({ field }) => (
              <RadioGroup
                {...field}
                value={paymentMethod}
                onChange={(e) => {
                  const value = e.target.value as 'pix' | 'creditCard'
                  setPaymentMethod(value)
                  field.onChange(value)
                  trigger('paymentMethod')
                }}
              >
                <FormControlLabel value='pix' control={<Radio />} label='Pix' />
                <FormControlLabel
                  value='creditCard'
                  control={<Radio />}
                  label='Cartão de Crédito'
                />
              </RadioGroup>
            )}
          />
        </FormControl>
        {paymentMethod === 'creditCard' && (
          <Card variant='outlined' sx={{ mb: 4, p: 2 }}>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Card Details
              </Typography>
              <Controller
                name='cardNumber'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Card Number'
                    variant='outlined'
                    fullWidth
                    error={!!errors.cardNumber}
                    helperText={
                      errors.cardNumber
                        ? errors.cardNumber.message
                        : '13-16 digits'
                    }
                    sx={{ mb: 2 }}
                    onChange={(e) => {
                      field.onChange(e.target.value.replace(/[^\d]/g, ''))
                      trigger('cardNumber')
                    }}
                  />
                )}
              />
              <Controller
                name='expiryDate'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Expiry Date (MM/YY)'
                    variant='outlined'
                    fullWidth
                    error={!!errors.expiryDate}
                    helperText={
                      errors.expiryDate
                        ? errors.expiryDate.message
                        : 'e.g., 12/25'
                    }
                    sx={{ mb: 2 }}
                    onChange={(e) => {
                      field.onChange(e.target.value.replace(/[^0-9/]/g, ''))
                      trigger('expiryDate')
                    }}
                  />
                )}
              />
              <Controller
                name='cvv'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='CVV'
                    variant='outlined'
                    fullWidth
                    error={!!errors.cvv}
                    helperText={errors.cvv ? errors.cvv.message : '3-4 digits'}
                    sx={{ mb: 2 }}
                    onChange={(e) => {
                      field.onChange(e.target.value.replace(/[^\d]/g, ''))
                      trigger('cvv')
                    }}
                  />
                )}
              />
            </CardContent>
          </Card>
        )}
        <Grid
          container
          justifyContent='space-between'
          alignItems='center'
          sx={{ mt: 4 }}
        >
          <Button
            type='submit'
            variant='contained'
            color='primary'
            disabled={Object.keys(errors).length > 0}
          >
            Deposit
          </Button>

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
      </form>

      {/* Modal */}
      <DepositSuccessModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        response={depositResponse as DepositResponse}
      />
    </Paper>
  )
}
