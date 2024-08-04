/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
// ** React Imports
import { useState, ChangeEvent, useEffect } from 'react'

// ** Currencies
import { currencies } from './currencies'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import Dialog from '@mui/material/Dialog'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import RadioGroup from '@mui/material/RadioGroup'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import Box, { BoxProps } from '@mui/material/Box'
import CardHeader from '@mui/material/CardHeader'
import DialogTitle from '@mui/material/DialogTitle'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControlLabel from '@mui/material/FormControlLabel'
import DialogContentText from '@mui/material/DialogContentText'
import CreditCardIcon from '@mui/icons-material/CreditCard'

// ** Third Party Imports
import Payment from 'payment'
import Cards, { Focused } from 'react-credit-cards'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Styled Component Imports
import CardWrapper from 'src/@core/styles/libs/react-credit-cards'

// ** Util Import
import {
  formatCVC,
  formatExpirationDate,
  formatCreditCardNumber,
} from 'src/@core/utils/format'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { useAuth } from 'src/hooks/useAuth'
import { createBankAccount } from 'src/pages/api/bank-account/createBankAccount'
import { Alert, AlertTitle, CircularProgress, Modal } from '@mui/material'
import {
  BankAccountData,
  BankAccountResponse,
} from 'src/types/apps/bankAccounts'
import toast from 'react-hot-toast'
import { deleteBankAccountById } from 'src/pages/api/bank-account/deleteBankAccount'
import { bankAccountGet } from 'src/pages/api/bank-account/getBankAccounts'

interface DataType {
  name: string
  imgSrc: string
  imgAlt: string
  cardCvc: string
  expiryDate: string
  cardNumber: string
  cardStatus?: string
  badgeColor?: ThemeColor
}

interface SelectedCardType {
  cvc: string
  name: string
  expiry: string
  cardId: number
  cardNumber: string
  focus: Focused | undefined
}

const CreditCardWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('xl')]: {
    '& > div:first-of-type': {
      marginBottom: theme.spacing(6),
    },
  },
  [theme.breakpoints.up('xl')]: {
    alignItems: 'center',
    flexDirection: 'row',
    '& > div:first-of-type': {
      marginRight: theme.spacing(6),
    },
  },
}))

const data: DataType[] = [
  {
    cardCvc: '587',
    name: 'Tom McBride',
    expiryDate: '12/24',
    imgAlt: 'Mastercard',
    badgeColor: 'primary',
    cardStatus: 'Primary',
    cardNumber: '5577 0000 5577 9865',
    imgSrc: '/images/logos/mastercard.png',
  },
  {
    cardCvc: '681',
    imgAlt: 'Visa card',
    expiryDate: '02/24',
    name: 'Mildred Wagner',
    cardNumber: '4532 3616 2070 5678',
    imgSrc: '/images/logos/visa.png',
  },
]

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

const PaymentMethodCard = () => {
  const user = useAuth()
  // ** States
  const [name, setName] = useState<string>('')
  const [cvc, setCvc] = useState<string | number>('')
  const [cardNumber, setCardNumber] = useState<string>('')
  const [focus, setFocus] = useState<Focused | undefined>()
  const [expiry, setExpiry] = useState<string | number>('')
  const [openEditCard, setOpenEditCard] = useState<boolean>(false)
  const [paymentMethod, setPaymentMethod] = useState<string>('card')
  const [selectedCard, setSelectedCard] = useState<SelectedCardType | null>(
    null,
  )
  const [loadingWithdraw, setLoadingWithdraw] = useState<boolean>(false)
  const [bankAccounts, setBankAccounts] = useState<BankAccountResponse[]>([])
  const [open, setOpen] = useState(false)
  const [selectedBank, setSelectedBank] = useState<null | number>(null)

  const [openDelete, setOpenDelete] = useState(false)
  const [selectedBankDelete, setSelectedBankDelete] = useState<null | string>(
    null,
  )

  const handleOpenDelete = (index: string) => {
    setSelectedBankDelete(index)
    setOpenDelete(true)
  }

  const handleCloseDelete = () => {
    setOpenDelete(false)
    setSelectedBankDelete(null)
  }

  const handleDeleteDelete = () => {
    if (selectedBankDelete !== null) {
      deleteBankAccountById(selectedBankDelete).then(
        (response: BankAccountResponse | null) => {
          if (response) {
            setBankAccounts((prev) =>
              prev.filter((bank) => bank.id !== selectedBankDelete),
            )
            toast.success('Bank account deleted successfully.', {
              position: 'bottom-right',
            })
          }
        },
      )
    }
    handleCloseDelete()
  }

  const handleOpen = (index: number) => {
    setSelectedBank(index)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedBank(null)
  }

  const handleDelete = () => {
    if (selectedBank !== null) {
      console.log(`Deleting bank account at index: ${selectedBank}`)
    }
    handleClose()
  }

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<BankAccountData>({
    resolver: zodResolver(schema),
    defaultValues: {
      accountHolderName: user?.user?.name.toUpperCase() || '',
      accountHolderType: 'individual',
      bankName: '',
      routingNumber: '',
      accountNumber: '',
      currency: '',
      country: '',
    },
  })

  useEffect(() => {
    bankAccountGet().then((response: BankAccountResponse[] | null) => {
      if (response) {
        setBankAccounts(response)
      }
    })
  }, [])

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

  const handleEditCardClickOpen = (id: number) => {
    setSelectedCard({
      cardId: id,
      focus: undefined,
      name: data[id].name,
      cvc: data[id].cardCvc,
      expiry: data[id].expiryDate,
      cardNumber: data[id].cardNumber,
    })
    setOpenEditCard(true)
  }

  const handleEditCardClose = () => {
    setOpenEditCard(false)
    setTimeout(() => {
      setSelectedCard(null)
    }, 200)
  }

  const handleBlur = () => setFocus(undefined)
  const handleSelectedCardBlur = () => setFocus(undefined)

  const handleInputChangePaymentMethod = ({
    target,
  }: ChangeEvent<HTMLInputElement>) => {
    if (target.name === 'cardNumber') {
      target.value = formatCreditCardNumber(target.value, Payment)
      setCardNumber(target.value)
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value)
      setExpiry(target.value)
    } else if (target.name === 'cvc') {
      target.value = formatCVC(target.value, cardNumber, Payment)
      setCvc(target.value)
    }
  }

  const handleInputChangeDialog = ({
    target,
  }: ChangeEvent<HTMLInputElement>) => {
    if (target.name === 'cardNumberDialog') {
      target.value = formatCreditCardNumber(target.value, Payment)
      setSelectedCard({
        ...selectedCard,
        cardNumber: target.value,
      } as SelectedCardType)
    } else if (target.name === 'expiryDialog') {
      target.value = formatExpirationDate(target.value)
      setSelectedCard({
        ...selectedCard,
        expiry: target.value,
      } as SelectedCardType)
    } else if (target.name === 'cvcDialog') {
      target.value = formatCVC(
        target.value,
        (selectedCard as SelectedCardType).cardNumber,
        Payment,
      )
      setSelectedCard({
        ...selectedCard,
        cvc: target.value,
      } as SelectedCardType)
    }
  }

  // const handleResetForm = () => {
  //   setCvc('')
  //   setName('')
  //   setExpiry('')
  //   setCardNumber('')
  // }

  const handleResetFormWithdraw = () => {
    reset()
  }

  return (
    <>
      <Card>
        <CardHeader
          title={
            paymentMethod === 'card' ? 'Payment method' : 'Withdraw method'
          }
        />
        <CardContent>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <FormControl>
                    <RadioGroup
                      row
                      value={paymentMethod}
                      aria-label='payment method'
                      name='account-settings-billing-radio'
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <FormControlLabel
                        value='card'
                        control={<Radio />}
                        label='Credit/Debit/ATM Card'
                      />
                      <FormControlLabel
                        value='withdraw'
                        label='Withdraw'
                        control={<Radio />}
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                {paymentMethod === 'card' ? (
                  <>
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
                        <TextField
                          fullWidth
                          name='cardNumber'
                          value={cardNumber}
                          autoComplete='off'
                          label='Card Number'
                          onBlur={handleBlur}
                          onChange={handleInputChangePaymentMethod}
                          placeholder='0000 0000 0000 0000'
                          onFocus={(e) => setFocus(e.target.name as Focused)}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        name='name'
                        value={name}
                        autoComplete='off'
                        onBlur={handleBlur}
                        label='Name on Card'
                        placeholder='John Doe'
                        onChange={(e) => setName(e.target.value)}
                        onFocus={(e) => setFocus(e.target.name as Focused)}
                      />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <TextField
                        fullWidth
                        name='expiry'
                        label='Expiry'
                        value={expiry}
                        onBlur={handleBlur}
                        placeholder='MM/YY'
                        onChange={handleInputChangePaymentMethod}
                        inputProps={{ maxLength: '5' }}
                        onFocus={(e) => setFocus(e.target.name as Focused)}
                      />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <TextField
                        fullWidth
                        name='cvc'
                        label='CVC'
                        value={cvc}
                        autoComplete='off'
                        onBlur={handleBlur}
                        onChange={handleInputChangePaymentMethod}
                        onFocus={(e) => setFocus(e.target.name as Focused)}
                        placeholder={
                          Payment.fns.cardType(cardNumber) === 'amex'
                            ? '1234'
                            : '123'
                        }
                      />
                    </Grid>
                  </>
                ) : (
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
                        {loadingWithdraw ? (
                          <CircularProgress size={24} />
                        ) : (
                          'Save Changes'
                        )}
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
                )}
              </Grid>
            </Grid>

            {paymentMethod === 'card' ? (
              <Grid item xs={12} md={6}>
                <Typography sx={{ mb: 4, fontWeight: 500 }}>
                  My Cards
                </Typography>
                {data ? (
                  data.map((item: DataType, index: number) => (
                    <Box
                      key={index}
                      sx={{
                        p: 5,
                        display: 'flex',
                        borderRadius: 1,
                        flexDirection: ['column', 'row'],
                        justifyContent: ['space-between'],
                        backgroundColor: 'action.hover',
                        alignItems: ['flex-start', 'center'],
                        mb: index !== data.length - 1 ? 4 : undefined,
                      }}
                    >
                      <div>
                        <img height='25' alt={item.imgAlt} src={item.imgSrc} />
                        <Box
                          sx={{
                            mt: 1,
                            mb: 2.5,
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <Typography sx={{ fontWeight: 600 }}>
                            {item.name}
                          </Typography>
                          {item.cardStatus ? (
                            <CustomChip
                              skin='light'
                              size='small'
                              sx={{ ml: 4 }}
                              label={item.cardStatus}
                              color={item.badgeColor}
                            />
                          ) : null}
                        </Box>
                        <Typography variant='body2'>
                          **** **** ****{' '}
                          {item.cardNumber.substring(
                            item.cardNumber.length - 4,
                          )}
                        </Typography>
                      </div>

                      <Box sx={{ mt: [3, 0], textAlign: ['start', 'end'] }}>
                        <Button
                          variant='outlined'
                          sx={{ mr: 4 }}
                          onClick={() => handleEditCardClickOpen(index)}
                        >
                          Edit
                        </Button>
                        <Button variant='outlined' color='secondary'>
                          Delete
                        </Button>
                        <Typography variant='body2' sx={{ mt: 4 }}>
                          Card expires at {item.expiryDate}
                        </Typography>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Alert severity='info' sx={{ mb: 6 }}>
                    <AlertTitle>
                      You still don't have registered accounts
                    </AlertTitle>
                    You need register
                  </Alert>
                )}
              </Grid>
            ) : (
              <Grid item xs={12} md={6}>
                <Typography sx={{ mb: 4, fontWeight: 500 }}>
                  My Cards
                </Typography>

                {bankAccounts.length > 0 ? (
                  bankAccounts.map(
                    (bank: BankAccountResponse, index: number) => (
                      <Box
                        key={bank.id}
                        sx={{
                          p: 5,
                          display: 'flex',
                          borderRadius: 1,
                          flexDirection: ['column', 'row'],
                          justifyContent: ['space-between'],
                          backgroundColor: 'action.hover',
                          alignItems: ['flex-start', 'center'],
                          mb: index !== bankAccounts.length - 1 ? 4 : undefined,
                        }}
                      >
                        <div>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <CreditCardIcon
                              sx={{
                                width: '50px',
                                mr: 2,
                                color: 'primary.main',
                              }}
                            />
                            <div>
                              <Typography sx={{ fontWeight: 600 }}>
                                {bank.bankName}
                              </Typography>
                              <Typography variant='body2' color='textSecondary'>
                                Last 4 digits:{' '}
                                <Box component='span' sx={{ fontWeight: 600 }}>
                                  {bank.last4}
                                </Box>
                              </Typography>
                            </div>
                          </Box>
                        </div>

                        <Box sx={{ mt: [3, 0], textAlign: ['start', 'end'] }}>
                          <Button
                            variant='outlined'
                            color='secondary'
                            onClick={() => handleOpenDelete(bank.id)}
                          >
                            Delete
                          </Button>
                        </Box>
                      </Box>
                    ),
                  )
                ) : (
                  <Alert severity='info' sx={{ mb: 6 }}>
                    <AlertTitle>
                      You still don't have registered accounts
                    </AlertTitle>
                    You need register
                  </Alert>
                )}
                <Modal
                  open={openDelete}
                  onClose={handleCloseDelete}
                  aria-labelledby='modal-modal-title'
                  aria-describedby='modal-modal-description'
                >
                  <Box sx={style}>
                    <Typography
                      id='modal-modal-title'
                      variant='h6'
                      component='h2'
                    >
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
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
      <Dialog
        open={openEditCard}
        onClose={handleEditCardClose}
        aria-labelledby='user-view-billing-edit-card'
        aria-describedby='user-view-billing-edit-card-description'
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
      >
        <DialogTitle
          id='user-view-billing-edit-card'
          sx={{
            textAlign: 'center',
            fontSize: '1.5rem !important',
            px: (theme) => [
              `${theme.spacing(5)} !important`,
              `${theme.spacing(15)} !important`,
            ],
            pt: (theme) => [
              `${theme.spacing(8)} !important`,
              `${theme.spacing(12.5)} !important`,
            ],
          }}
        >
          Edit Card
        </DialogTitle>
        <DialogContent
          sx={{
            pb: (theme) => `${theme.spacing(6)} !important`,
            px: (theme) => [
              `${theme.spacing(5)} !important`,
              `${theme.spacing(15)} !important`,
            ],
          }}
        >
          <DialogContentText
            variant='body2'
            id='user-view-billing-edit-card-description'
            sx={{ textAlign: 'center', mb: 7 }}
          >
            Edit your saved card details
          </DialogContentText>
          {selectedCard !== null && (
            <form>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <CardWrapper sx={{ '& .rccs': { m: '0 auto' } }}>
                    <Cards
                      cvc={selectedCard.cvc}
                      focused={selectedCard.focus}
                      expiry={selectedCard.expiry}
                      name={selectedCard.name}
                      number={selectedCard.cardNumber}
                    />
                  </CardWrapper>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={6}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        autoComplete='off'
                        label='Card Number'
                        name='cardNumberDialog'
                        onBlur={handleSelectedCardBlur}
                        onChange={handleInputChangeDialog}
                        placeholder='0000 0000 0000 0000'
                        defaultValue={selectedCard.cardNumber}
                        onFocus={(e) =>
                          setSelectedCard({
                            ...selectedCard,
                            focus: e.target.name as Focused,
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <TextField
                        fullWidth
                        name='nameDialog'
                        autoComplete='off'
                        label='Name on Card'
                        placeholder='John Doe'
                        onBlur={handleSelectedCardBlur}
                        defaultValue={selectedCard.name}
                        onChange={(e) =>
                          setSelectedCard({
                            ...selectedCard,
                            name: e.target.value,
                          })
                        }
                        onFocus={(e) =>
                          setSelectedCard({
                            ...selectedCard,
                            focus: e.target.name as Focused,
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label='Expiry'
                        placeholder='MM/YY'
                        name='expiryDialog'
                        defaultValue={expiry}
                        onBlur={handleSelectedCardBlur}
                        inputProps={{ maxLength: '5' }}
                        onChange={handleInputChangeDialog}
                        onFocus={(e) =>
                          setSelectedCard({
                            ...selectedCard,
                            focus: e.target.name as Focused,
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <FormControl fullWidth>
                        <InputLabel id='user-view-billing-edit-card-status-label'>
                          Card Status
                        </InputLabel>
                        <Select
                          label='Card Status'
                          id='user-view-billing-edit-card-status'
                          labelId='user-view-billing-edit-card-status-label'
                          defaultValue={
                            data[selectedCard.cardId].cardStatus
                              ? data[selectedCard.cardId].cardStatus
                              : ''
                          }
                        >
                          <MenuItem value='Primary'>Primary</MenuItem>
                          <MenuItem value='Expired'>Expired</MenuItem>
                          <MenuItem value='Active'>Active</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label='CVC'
                        name='cvcDialog'
                        defaultValue={cvc}
                        autoComplete='off'
                        onBlur={handleSelectedCardBlur}
                        onChange={handleInputChangeDialog}
                        onFocus={(e) =>
                          setSelectedCard({
                            ...selectedCard,
                            focus: e.target.name as Focused,
                          })
                        }
                        placeholder={
                          Payment.fns.cardType(selectedCard.cardNumber) ===
                          'amex'
                            ? '1234'
                            : '123'
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          )}
        </DialogContent>
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
          <Button
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
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default PaymentMethodCard
