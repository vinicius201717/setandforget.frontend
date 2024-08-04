/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { Alert, AlertTitle, Box, Button, Typography } from '@mui/material'
import CustomChip from 'src/@core/components/mui/chip'
import { DataType } from 'src/types/apps/bankAccountsType'

interface PaymentMethodAccountsProps {
  handleEditCardClickOpen: (index: number) => void
  data: DataType[]
}
export const PaymentMethodCardAccouts = ({
  handleEditCardClickOpen,
  data,
}: PaymentMethodAccountsProps) => {
  return (
    <>
      <Typography sx={{ mb: 4, fontWeight: 500 }}>My Cards</Typography>
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
                <Typography sx={{ fontWeight: 600 }}>{item.name}</Typography>
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
                {item.cardNumber.substring(item.cardNumber.length - 4)}
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
          <AlertTitle>You still don't have registered accounts</AlertTitle>
          You need register
        </Alert>
      )}
    </>
  )
}
