// components/about/PaymentMethodsSection.tsx

import { Card, CardContent, Typography, Box } from '@mui/material'
import Icon from 'src/@core/components/icon'
import Link from 'next/link'
import { UserDataType } from 'src/context/types'

interface Props {
  user: UserDataType
}

export default function PaymentMethodsSection({ user }: Props) {
  return (
    <Card>
      <CardContent>
        <Typography
          variant='caption'
          sx={{ mb: 5, display: 'block', textTransform: 'uppercase' }}
        >
          Payment methods
        </Typography>

        {user?.creditCardTransaction?.length ? (
          user.creditCardTransaction.map((card, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                '&:not(:last-of-type)': { mb: 4 },
                '& svg': { color: 'text.secondary' },
              }}
            >
              <Box sx={{ display: 'flex', mr: 2 }}>
                <Icon icon='mdi:credit-card' />
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', columnGap: 2 }}>
                <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>
                  {card.brand}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  **** **** **** {card.lastDigits}
                </Typography>
              </Box>
            </Box>
          ))
        ) : (
          <Link href='/pages/account-settings/billing/'>
            <Typography
              sx={{
                fontWeight: 600,
                color: (theme) => theme.palette.primary.main,
              }}
            >
              Add credit card?
            </Typography>
          </Link>
        )}
      </CardContent>
    </Card>
  )
}
