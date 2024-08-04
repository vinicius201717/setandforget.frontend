import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  TextField,
} from '@mui/material'
import Cards, { Focused } from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { z } from 'zod'
import Payment from 'payment'
import { CardWrapper, CreditCardWrapper } from './style'

const schema = z.object({
  cardNumber: z.string().min(1, 'Card number is required'),
  name: z.string().min(1, 'Name is required'),
  expiry: z.string().min(1, 'Expiry date is required'),
  cvc: z.string().min(1, 'CVC is required'),
})

type PaymentMethodForm = z.infer<typeof schema>

export const PaymentMethodCardComponent = () => {
  const [cardNumber, setCardNumber] = useState('')
  const [name, setName] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [focus, setFocus] = useState<Focused | undefined>(undefined)
  const [loading, setLoading] = useState(false)

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PaymentMethodForm>({
    resolver: zodResolver(schema),
  })

  const handleResetForm = () => {
    setCvc('')
    setName('')
    setExpiry('')
    setCardNumber('')
  }

  const handleInputChangePaymentMethod = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target
    switch (name) {
      case 'cardNumber':
        setCardNumber(value)
        break
      case 'name':
        setName(value)
        break
      case 'expiry':
        setExpiry(value)
        break
      case 'cvc':
        setCvc(value)
        break
    }
  }

  const handleBlur = () => {
    setFocus(undefined)
  }

  const onSubmit = (data: PaymentMethodForm) => {
    console.log(data)

    setLoading(true)
    // Realizar a lógica para processar o pagamento
    setTimeout(() => {
      setLoading(false)
      toast.success('Payment method saved successfully!', {
        position: 'bottom-right',
      })
    }, 2000)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3} marginLeft={1} marginTop={5}>
        <Grid item xs={12}>
          <CreditCardWrapper>
            <CardWrapper>
              <Cards
                cvc={cvc}
                focused={focus}
                expiry={expiry}
                name={name}
                number={cardNumber}
              />
            </CardWrapper>
          </CreditCardWrapper>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <Controller
              name='cardNumber'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  value={cardNumber}
                  autoComplete='off'
                  label='Card Number'
                  onBlur={handleBlur}
                  onChange={handleInputChangePaymentMethod}
                  placeholder='0000 0000 0000 0000'
                  onFocus={(e) => setFocus(e.target.name as Focused)}
                  error={!!errors.cardNumber}
                  helperText={errors.cardNumber?.message}
                />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name='name'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                value={name}
                autoComplete='off'
                onBlur={handleBlur}
                label='Name on Card'
                placeholder='John Doe'
                onChange={(e) => setName(e.target.value)}
                onFocus={(e) => setFocus(e.target.name as Focused)}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <Controller
            name='expiry'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                value={expiry}
                onBlur={handleBlur}
                placeholder='MM/YY'
                onChange={handleInputChangePaymentMethod}
                inputProps={{ maxLength: 5 }}
                onFocus={(e) => setFocus(e.target.name as Focused)}
                error={!!errors.expiry}
                helperText={errors.expiry?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <Controller
            name='cvc'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                value={cvc}
                autoComplete='off'
                onBlur={handleBlur}
                onChange={handleInputChangePaymentMethod}
                onFocus={(e) => setFocus(e.target.name as Focused)}
                placeholder={
                  Payment.fns.cardType(cardNumber) === 'amex' ? '1234' : '123'
                }
                error={!!errors.cvc}
                helperText={errors.cvc?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} marginLeft={4} marginTop={10}>
          <Button
            type='submit'
            variant='contained'
            sx={{ mr: 4, minWidth: '150px' }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Save Changes'}
          </Button>
          <Button
            type='reset'
            variant='outlined'
            color='secondary'
            onClick={handleResetForm}
          >
            Reset
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
