import { Icon } from '@iconify/react'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import { UserDataType } from 'src/context/types'

const Subscription = (props: { user: UserDataType }) => {
  // eslint-disable-next-line no-unused-vars
  const { user } = props

  return (
    <Card sx={{ mt: 6 }}>
      <CardHeader
        title='Subscription'
        sx={{ '& .MuiCardHeader-avatar': { mr: 2.5 } }}
        avatar={<Icon icon='mdi:account-check' />}
        titleTypographyProps={{ sx: { color: 'text.primary' } }}
      />
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            '&:not(:last-of-type)': { mb: 4 },
            '& svg': { color: 'text.secondary' },
            mb: 5,
          }}
        >
          <Box
            sx={{
              columnGap: 2,
              display: 'flex',
              flexWrap: 'wrap',
              alignusers: 'center',
            }}
          >
            <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>
              Subscriptions:
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>2</Typography>
          </Box>
        </Box>
        <Link href='/pages/account-settings/account/'>
          <Button
            variant='contained'
            sx={{ backgroundColor: (theme) => theme.palette.primary.main }}
          >
            Access your subscriptions
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

export default Subscription
