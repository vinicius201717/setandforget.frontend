/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
// ** React Imports
import { useState, ChangeEvent, useEffect, FC } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import { styled } from '@mui/material/styles'
import RadioGroup from '@mui/material/RadioGroup'
import CardContent from '@mui/material/CardContent'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Third Party Imports
import Payment from 'payment'
import { Focused } from 'react-credit-cards'

// ** Util Import
import {
  formatCVC,
  formatExpirationDate,
  formatCreditCardNumber,
} from 'src/@core/utils/format'

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'
import { useAuth } from 'src/hooks/useAuth'
import { CardHeader, FormControl } from '@mui/material'
import { WithdrawForm } from 'src/components/PaymentMethod/WithdrawForm'
import {
  BankAccountResponse,
  DataType,
  SelectedCardType,
} from 'src/types/apps/bankAccountsType'
import { WithdrawAccounts } from 'src/components/PaymentMethod/WithdrawAccounts'
import { bankAccountGet } from 'src/pages/api/bank-account/getBankAccounts'
import { deleteBankAccountById } from 'src/pages/api/bank-account/deleteBankAccount'
import toast from 'react-hot-toast'
import { PaymentMethodCardComponent } from 'src/components/PaymentMethod/PaymentMethodCard'
import { PaymentMethodCardAccouts } from 'src/components/PaymentMethod/PaymentMethodCardAccounts'
import { DialogEditCard } from 'src/components/PaymentMethod/DialogEditCard'
import { PostAddressResponseType } from 'src/types/apps/addressType'
import { PaymentMethodCardProps } from 'src/types/apps/paymentMethodType'

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

const PaymentMethodCard: FC<PaymentMethodCardProps> = ({
  address,
  scrollToBillingAddress,
}) => {
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

  const handleOpen = (index: number) => {
    setSelectedBank(index)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedBank(null)
  }

  useEffect(() => {
    bankAccountGet().then((response: BankAccountResponse[] | null) => {
      if (response) {
        setBankAccounts(response)
      }
    })
  }, [])

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
                  <PaymentMethodCardComponent />
                ) : (
                  <WithdrawForm
                    handleCloseDelete={handleCloseDelete}
                    handleDeleteDelete={handleDeleteDelete}
                    openDelete={openDelete}
                    selectedBankDelete={selectedBankDelete as string}
                    setBankAccounts={setBankAccounts}
                    address={address}
                    scrollToBillingAddress={scrollToBillingAddress}
                  />
                )}
              </Grid>
            </Grid>

            {paymentMethod === 'card' ? (
              <Grid item xs={12} md={6}>
                <PaymentMethodCardAccouts
                  handleEditCardClickOpen={handleEditCardClickOpen}
                  data={data}
                />
              </Grid>
            ) : (
              <Grid item xs={12} md={6}>
                {bankAccounts && bankAccounts.length > 0 ? (
                  <WithdrawAccounts
                    bankAccounts={bankAccounts}
                    handleOpenDelete={handleOpenDelete}
                  />
                ) : (
                  ''
                )}
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
      <DialogEditCard
        cvc={cvc as string}
        data={data}
        expiry={expiry as string}
        handleEditCardClose={handleEditCardClose}
        handleInputChangeDialog={handleInputChangeDialog}
        handleSelectedCardBlur={handleSelectedCardBlur}
        openEditCard={openEditCard}
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
      />
    </>
  )
}

export default PaymentMethodCard
