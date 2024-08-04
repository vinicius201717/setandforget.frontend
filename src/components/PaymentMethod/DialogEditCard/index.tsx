/* eslint-disable no-unused-vars */
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { CardWrapper } from './style'
import Cards, { Focused } from 'react-credit-cards'
import { DataType, SelectedCardType } from 'src/types/apps/bankAccountsType'
import Payment from 'payment'
import { ChangeEvent } from 'react'

interface DialogEditCardProps {
  openEditCard: boolean
  selectedCard: SelectedCardType | null
  expiry: string
  cvc: string
  data: DataType[]
  handleEditCardClose: () => void
  handleSelectedCardBlur: () => void
  handleInputChangeDialog: (e: ChangeEvent<HTMLInputElement>) => void
  setSelectedCard: React.Dispatch<React.SetStateAction<SelectedCardType | null>>
}

export const DialogEditCard = ({
  openEditCard,
  selectedCard,
  expiry,
  cvc,
  data,
  handleEditCardClose,
  handleInputChangeDialog,
  handleSelectedCardBlur,
  setSelectedCard,
}: DialogEditCardProps) => {
  return (
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
                        Payment.fns.cardType(selectedCard.cardNumber) === 'amex'
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
    </Dialog>
  )
}
