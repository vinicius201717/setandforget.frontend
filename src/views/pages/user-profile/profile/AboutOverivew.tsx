// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { formatDistanceToNow } from 'date-fns'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { UserDataType } from 'src/context/types'
import Link from 'next/link'

interface PropsTypes {
  user: UserDataType
}

const AboutOverivew = (props: PropsTypes) => {
  const { user } = props

  const creationTimeAgo = formatDistanceToNow(new Date(user.created_at), {
    addSuffix: true,
  })
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box sx={{ mb: 6 }}>
              <Typography
                variant='caption'
                sx={{ mb: 5, display: 'block', textTransform: 'uppercase' }}
              >
                About
              </Typography>
              {/* NAME */}
              <Box
                sx={{
                  display: 'flex',
                  '&:not(:last-of-type)': { mb: 4 },
                  '& svg': { color: 'text.secondary' },
                }}
              >
                <Box sx={{ display: 'flex', mr: 2 }}>
                  <Icon icon='mdi:user' />
                </Box>
                <Box
                  sx={{
                    columnGap: 2,
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignusers: 'center',
                  }}
                >
                  <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>
                    Full Name:
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
                  </Typography>
                </Box>
              </Box>

              {/* DATE */}
              <Box
                sx={{
                  display: 'flex',
                  '&:not(:last-of-type)': { mb: 4 },
                  '& svg': { color: 'text.secondary' },
                }}
              >
                <Box sx={{ display: 'flex', mr: 2 }}>
                  <Icon icon='mdi:calendar' />
                </Box>
                <Box
                  sx={{
                    columnGap: 2,
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignusers: 'center',
                  }}
                >
                  <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>
                    Since:
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    {creationTimeAgo}
                  </Typography>
                </Box>
              </Box>

              {/* E-MAIL */}
              <Box
                sx={{
                  display: 'flex',
                  '&:not(:last-of-type)': { mb: 4 },
                  '& svg': { color: 'text.secondary' },
                }}
              >
                <Box sx={{ display: 'flex', mr: 2 }}>
                  <Icon icon='mdi:email' />
                </Box>
                <Box
                  sx={{
                    columnGap: 2,
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignusers: 'center',
                  }}
                >
                  <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>
                    Email:
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    {user.email}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  '&:not(:last-of-type)': { mb: 4 },
                  '& svg': { color: 'text.secondary' },
                }}
              >
                <Box sx={{ display: 'flex', mr: 2 }}>
                  <Icon icon='mdi:phone' />
                </Box>
                <Box
                  sx={{
                    columnGap: 2,
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignusers: 'center',
                  }}
                >
                  <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>
                    Phone:
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    +{user.phone}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <div>
              <Typography
                variant='caption'
                sx={{ mb: 5, display: 'block', textTransform: 'uppercase' }}
              >
                Payment methods
              </Typography>
              {user?.creditCardTransaction?.length ? (
                user.creditCardTransaction.map((card, key) => {
                  return (
                    <Box
                      sx={{
                        display: 'flex',
                        '&:not(:last-of-type)': { mb: 4 },
                        '& svg': { color: 'text.secondary' },
                      }}
                      key={key}
                    >
                      <Box sx={{ display: 'flex', mr: 2 }}>
                        <Icon icon='mdi:credit-card' />
                      </Box>
                      <Box
                        sx={{
                          columnGap: 2,
                          display: 'flex',
                          flexWrap: 'wrap',
                          alignusers: 'center',
                        }}
                      >
                        <Typography
                          sx={{ fontWeight: 600, color: 'text.secondary' }}
                        >
                          {card.brand}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>
                          **** **** **** {card.lastDigits}
                        </Typography>
                      </Box>
                    </Box>
                  )
                })
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
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default AboutOverivew
