import React, { useEffect, useState } from 'react'
import {
  TextField,
  Button,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Card,
  CardContent,
  Typography,
  Select,
  InputLabel,
  MenuItem,
  InputAdornment,
} from '@mui/material'
import { bankAccountGet } from 'src/pages/api/bank-account/getBankAccounts'
import { BankAccountResponse } from 'src/types/apps/bankAccountsType'
import { z } from 'zod'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RadioBox, RadioOpcionContainer, RadioSpan } from './style'
import { postWithdraw } from 'src/pages/api/payment/postWithdraw'
import { useAuth } from 'src/hooks/useAuth'
import { formatMoney } from 'src/utils/format-money'
import { WithdrawInfoToCreateAccount } from 'src/components/WithdrawInforToCreateAccount'

const WithdrawPage = () => {
  const [bankAccounts, setBankAccounts] = useState<BankAccountResponse[]>([])

  const { user } = useAuth()

  const accountBalance = user?.Account.amount as number
  const bankAccountSchema = z.object({
    amount: z
      .number()
      .min(10, 'Amount must be greater than 10')
      .refine(
        (value) => accountBalance !== null && value <= accountBalance / 100,
        {
          message: `Amount must be less than or equal to your account balance ${formatMoney(accountBalance / 100)}`,
        },
      ),
    currency: z.string().min(1, 'Currency is required'),
    selectedBank: z.string().min(1, 'You must select a bank'),
  })

  type BankAccountFormValues = z.infer<typeof bankAccountSchema>

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BankAccountFormValues>({
    resolver: zodResolver(bankAccountSchema),
  })

  useEffect(() => {
    bankAccountGet().then((response: BankAccountResponse[] | null) => {
      if (response) {
        setBankAccounts(response)
        if (response.length > 0) {
          setValue('selectedBank', response[0].stripeId)
        }
      }
    })
  }, [setValue])

  const onSubmit: SubmitHandler<BankAccountFormValues> = (data) => {
    if (data.amount < accountBalance / 100)
      postWithdraw(data).then((response) => console.log(response))
  }

  return (
    <Grid container spacing={3} justifyContent='center' alignItems='center'>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant='h4' gutterBottom>
              Withdraw Funds
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Controller
                    name='amount'
                    control={control}
                    rules={{
                      required: 'Amount is required',
                      validate: (value) =>
                        value <= accountBalance ||
                        `Amount must be less than or equal to your account balance (${accountBalance})`,
                    }}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        label='Amount'
                        variant='outlined'
                        {...field}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>$</InputAdornment>
                          ),
                        }}
                        error={!!errors.amount}
                        helperText={errors.amount ? errors.amount.message : ''}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                        type='number'
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    variant='outlined'
                    error={!!errors.currency}
                  >
                    <InputLabel>Currency</InputLabel>
                    <Select label='Currency' {...register('currency')}>
                      <MenuItem value='brl'>BRL</MenuItem>
                      <MenuItem value='usd'>USD</MenuItem>
                      <MenuItem value='eur'>EUR</MenuItem>
                      <MenuItem value='gbp'>GBP</MenuItem>
                    </Select>
                    {errors.currency && (
                      <p style={{ color: 'red' }}>{errors.currency.message}</p>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    component='fieldset'
                    error={!!errors.selectedBank}
                    style={{ width: '100%' }}
                  >
                    <FormLabel component='legend'>Select Bank</FormLabel>
                    <Controller
                      name='selectedBank'
                      control={control}
                      render={({ field }) => (
                        <RadioGroup {...field} style={{ width: '100%' }}>
                          {bankAccounts.length > 0 ? (
                            bankAccounts.map((bank) => (
                              <RadioOpcionContainer key={bank.id}>
                                <FormControlLabel
                                  value={bank.stripeId}
                                  control={<Radio />}
                                  label={
                                    <RadioBox>
                                      <span>{bank.bankName}</span>
                                      <RadioSpan>
                                        Last 4 digits: {bank.last4}
                                      </RadioSpan>
                                    </RadioBox>
                                  }
                                  style={{ width: '100%', margin: 0 }}
                                />
                                <span>{bank.currency.toUpperCase()}</span>
                              </RadioOpcionContainer>
                            ))
                          ) : (
                            <WithdrawInfoToCreateAccount />
                          )}
                        </RadioGroup>
                      )}
                    />
                    {errors.selectedBank && (
                      <p style={{ color: 'red' }}>
                        {errors.selectedBank.message}
                      </p>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant='contained'
                    color='primary'
                    type='submit'
                  >
                    Withdraw
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default WithdrawPage
