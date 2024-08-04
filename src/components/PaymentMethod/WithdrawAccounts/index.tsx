/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { Alert, AlertTitle, Box, Button, Typography } from '@mui/material'
import { BankAccountResponse } from 'src/types/apps/bankAccountsType'
import CreditCardIcon from '@mui/icons-material/CreditCard'

interface WithdrawAccountsProps {
  bankAccounts: BankAccountResponse[]
  handleOpenDelete: (id: string) => void
}

export const WithdrawAccounts: React.FC<WithdrawAccountsProps> = ({
  bankAccounts,
  handleOpenDelete,
}) => {
  return (
    <>
      <Typography sx={{ mb: 4, fontWeight: 500 }}>My Cards</Typography>

      {bankAccounts.length > 0 ? (
        bankAccounts.map((bank: BankAccountResponse, index: number) => (
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
