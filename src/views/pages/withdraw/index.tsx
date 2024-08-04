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
} from '@mui/material'
import { bankAccountGet } from 'src/pages/api/bank-account/getBankAccounts'
import { BankAccountResponse } from 'src/types/apps/bankAccounts'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  InfoContainer,
  RadioBox,
  RadioOpcionContainer,
  RadioSpan,
  StyledLink,
} from './style'
import { Box } from '@mui/system'

const bankAccountSchema = z.object({
  amount: z.number().min(1, 'Amount must be greater than 0'),
  currency: z.string().min(1, 'Currency is required'),
  selectedBank: z.string().min(1, 'You must select a bank'),
})

type BankAccountFormValues = z.infer<typeof bankAccountSchema>

const WithdrawPage = () => {
  const [bankAccounts, setBankAccounts] = useState<BankAccountResponse[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BankAccountFormValues>({
    resolver: zodResolver(bankAccountSchema),
  })

  useEffect(() => {
    bankAccountGet().then((response: BankAccountResponse[] | null) => {
      if (response) {
        setBankAccounts(response)
      }
    })
  }, [])

  const onSubmit: SubmitHandler<BankAccountFormValues> = (data) => {
    console.log('Amount:', data.amount)
    console.log('Currency:', data.currency)
    console.log('Selected Bank:', data.selectedBank)
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
                  <TextField
                    fullWidth
                    label='Amount'
                    variant='outlined'
                    {...register('amount', { valueAsNumber: true })}
                    error={!!errors.amount}
                    helperText={errors.amount ? errors.amount.message : ''}
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
                    <RadioGroup
                      {...register('selectedBank')}
                      style={{ width: '100%' }}
                    >
                      {bankAccounts.length > 0 ? (
                        bankAccounts.map((bank) => (
                          <RadioOpcionContainer key={bank.id}>
                            <FormControlLabel
                              value={bank.id}
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
                        <InfoContainer>
                          <Typography variant='body1' gutterBottom>
                            No bank accounts available. Please add a bank
                            account to proceed with the withdrawal. The link
                            takes you to the page to add a withdrawal bank
                            account with instructions. When the page opens, the
                            options{' '}
                            <Box component='span' fontWeight='fontWeightBold'>
                              Credit/Debit/ATM
                            </Box>{' '}
                            Card will be selected. Change the selection to{' '}
                            <Box component='span' fontWeight='fontWeightBold'>
                              Withdraw
                            </Box>
                            . Follow these steps:
                            <ol>
                              <li>
                                Click on the{' '}
                                <Box
                                  component='span'
                                  fontWeight='fontWeightBold'
                                >
                                  Withdraw
                                </Box>{' '}
                                dropdown menu.
                              </li>
                              <li>
                                Fill in your bank account details, including
                                account number and routing number.
                              </li>
                              <li>
                                Ensure all provided information is accurate to
                                avoid any issues with transactions.
                              </li>
                              <li>
                                Click on the{' '}
                                <Box
                                  component='span'
                                  fontWeight='fontWeightBold'
                                >
                                  Submit
                                </Box>{' '}
                                button to save your bank account details.
                              </li>
                              <li>
                                After submitting and completing the addition of
                                the account, return here and try again.
                              </li>
                            </ol>
                          </Typography>
                          <StyledLink href='/pages/account-settings/billing'>
                            Add Bank Account
                          </StyledLink>
                        </InfoContainer>
                      )}
                    </RadioGroup>
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
