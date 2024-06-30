/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import { deposit } from 'src/pages/api/payment/deposit'
import toast from 'react-hot-toast'

// Schema de validação Zod
const schema = z.object({
  amount: z.string().regex(/^\d+$/, 'Only digits are allowed'),
})

interface FormValues {
  amount: string
}

interface DefaultValuesDepositProps {
  setAmount: (value: string) => void
  triggerValidation: () => void
}

function DefaultValuesDeposit({
  setAmount,
  triggerValidation,
}: DefaultValuesDepositProps) {
  const theme = useTheme()
  const values = ['50', '100', '200', '500', '1000', '2000']
  const [selectedValue, setSelectedValue] = useState('')

  return (
    <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
      {values.map((value) => (
        <Grid item xs={12} sm={6} md={4} lg={1} key={value}>
          <Box
            onClick={() => {
              setAmount(value)
              setSelectedValue(value)
              triggerValidation()
            }}
            width='100px'
            height='70px'
            sx={{
              backgroundColor:
                selectedValue === value
                  ? theme.palette.primary.main
                  : 'transparent',
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: '10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <Typography
              sx={{
                fontSize: '1rem',
                color:
                  selectedValue === value ? '#FFF' : theme.palette.text.primary,
              }}
            >
              ${value}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}

export function DepositMethod() {
  const { control, handleSubmit, setValue, trigger } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      amount: '',
    },
  })

  const onSubmit = (data: FormValues) => {
    deposit(data.amount).then((response) => {
      if (response) {
        window.location.href = response
      } else {
        toast.error('Error in the deposit process', {
          position: 'bottom-right',
        })
      }
    })
  }

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
      <Typography variant='h6'>Deposit</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='amount'
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label='Valor do Depósito'
              variant='outlined'
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              type='number'
              sx={{ mb: 4, mt: 10 }}
            />
          )}
        />
        <Typography variant='h6' gutterBottom sx={{ mt: 4 }}>
          Valores Padrão
        </Typography>
        <DefaultValuesDeposit
          setAmount={(value) => setValue('amount', value)}
          triggerValidation={() => trigger('amount')}
        />
        <Button
          type='submit'
          variant='contained'
          color='primary'
          sx={{ mt: 2 }}
        >
          Depositar
        </Button>
      </form>
    </Paper>
  )
}
