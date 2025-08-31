// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import MuiDivider, { DividerProps } from '@mui/material/Divider'
import Button from '@mui/material/Button'
import { DepositWithdrawResponse } from 'src/types/apps/dashboardType'
import Image from 'next/image'
import Link from 'next/link'

// Styled Divider component
const Divider = styled(MuiDivider)<DividerProps>(({ theme }) => ({
  margin: `${theme.spacing(5, 0)} !important`,
  borderRight: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down('md')]: {
    borderRight: 'none',
    margin: theme.spacing(0, 5),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}))

interface DepositWithdrawProps {
  depositWithdraw: DepositWithdrawResponse
}

const AnalyticsDepositWithdraw = ({
  depositWithdraw,
}: DepositWithdrawProps) => {
  return (
    <Card
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: ['column', 'column', 'row'],
        alignItems: 'stretch',
        height: '100%',
      }}
    >
      {/* Deposits */}
      <Box
        sx={{
          width: '100%',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardHeader
          title='Deposit'
          sx={{
            pt: 5.5,
            alignItems: 'center',
            '& .MuiCardHeader-action': { mt: 0.6 },
          }}
          titleTypographyProps={{
            variant: 'h6',
            sx: {
              lineHeight: '1.6 !important',
              letterSpacing: '0.15px !important',
            },
          }}
        />

        <CardContent
          sx={{
            flex: 1,
            pb: (theme) => `${theme.spacing(5.5)} !important`,
            maxHeight: 300, // altura máxima do conteúdo
            overflowY: 'auto', // barra de rolagem vertical
          }}
        >
          {depositWithdraw.deposits.length === 0 ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                textAlign: 'center',
              }}
            >
              <Image
                src={'/images/pages/no-deposit.png'}
                alt='No deposits'
                width={180}
                height={150}
              />
              <Typography variant='body2' sx={{ mt: 2 }}>
                No deposits yet
              </Typography>
              <Link href={'/pages/deposit'}>
                <Button variant='contained' sx={{ mt: 2 }}>
                  Make a deposit
                </Button>
              </Link>
            </Box>
          ) : (
            depositWithdraw.deposits.map((item, index) => (
              <Box
                key={item.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: index !== depositWithdraw.deposits.length - 1 ? 6 : 0,
                }}
              >
                <Box
                  sx={{
                    minWidth: 38,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Image
                    src={
                      item.paymentType === 'pix'
                        ? '/images/logos/pix.png'
                        : item.paymentType === 'card'
                          ? '/images/logos/card.png'
                          : '/images/logos/default.png'
                    }
                    alt={item.paymentType}
                    width={28}
                    height={28}
                  />
                </Box>
                <Box
                  sx={{
                    ml: 4,
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box sx={{ mr: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                      {item.paymentType.toUpperCase()}
                    </Typography>
                    <Typography variant='caption'>{'payment'}</Typography>
                  </Box>
                  <Typography
                    variant='subtitle2'
                    sx={{ fontWeight: 600, color: 'success.main' }}
                  >
                    +${item.amount}
                  </Typography>
                </Box>
              </Box>
            ))
          )}
        </CardContent>
      </Box>

      <Divider flexItem />

      {/* Withdrawals */}
      <Box
        sx={{
          width: '100%',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardHeader
          title='Withdraw'
          sx={{
            pt: 5.5,
            alignItems: 'center',
            '& .MuiCardHeader-action': { mt: 0.6 },
          }}
          action={
            <Link
              href='/pages/transactions'
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              View All
            </Link>
          }
          titleTypographyProps={{
            variant: 'h6',
            sx: {
              lineHeight: '1.6 !important',
              letterSpacing: '0.15px !important',
            },
          }}
        />

        <CardContent
          sx={{
            flex: 1,
            pb: (theme) => `${theme.spacing(5.5)} !important`,
            maxHeight: 300, // altura máxima do conteúdo
            overflowY: 'auto', // barra de rolagem vertical
          }}
        >
          {depositWithdraw.withdrawls.length === 0 ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                textAlign: 'center',
              }}
            >
              <Image
                src={'/images/pages/no-withdraw.png'}
                alt='No withdrawals'
                width={150}
                height={150}
              />
              <Typography variant='body2' sx={{ mt: 2 }}>
                No withdrawals yet
              </Typography>
              <Link href={'/pages/withdraw'}>
                <Button variant='contained' sx={{ mt: 2 }}>
                  Make a withdraw
                </Button>
              </Link>
            </Box>
          ) : (
            depositWithdraw.withdrawls.map((item, index) => (
              <Box
                key={item.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: index !== depositWithdraw.withdrawls.length - 1 ? 6 : 0,
                }}
              >
                <Box
                  sx={{
                    minWidth: 38,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Image
                    src={'/images/logos/pix.png'}
                    alt={'PIX'}
                    width={28}
                    height={28}
                  />
                </Box>
                <Box
                  sx={{
                    ml: 4,
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box sx={{ mr: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                      {'PIX'}
                    </Typography>
                    <Typography variant='caption'>{'withdrawal'}</Typography>
                  </Box>
                  <Typography
                    variant='subtitle2'
                    sx={{ fontWeight: 600, color: 'error.main' }}
                  >
                    -${item.amount}
                  </Typography>
                </Box>
              </Box>
            ))
          )}
        </CardContent>
      </Box>
    </Card>
  )
}

export default AnalyticsDepositWithdraw
