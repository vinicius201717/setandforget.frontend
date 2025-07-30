// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { formatDistanceToNow } from 'date-fns'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { PeopleProfileResponse } from 'src/context/types'

interface PropsTypes {
  peopleData: PeopleProfileResponse
}

const AboutOverview = (props: PropsTypes) => {
  const { peopleData } = props

  const creationTimeAgo = formatDistanceToNow(
    new Date(peopleData.people.created_at),
    {
      addSuffix: true,
    },
  )
  // CONTINUAR DAQYU, AJUSTAR OS BUTOES DE AMIZADE DE ACORDO COM QUEM MANDA A SOLICITAÇÃO
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
                    alignItems: 'center',
                  }}
                >
                  <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>
                    Full Name:
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    {peopleData.people.name.charAt(0).toUpperCase() +
                      peopleData.people.name.slice(1)}
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
                    alignItems: 'center',
                  }}
                >
                  <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>
                    Member Since:
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    {creationTimeAgo}
                  </Typography>
                </Box>
              </Box>

              {/* USERNAME (opcional, caso tenha) */}
              {peopleData.people.name && (
                <Box
                  sx={{
                    display: 'flex',
                    '&:not(:last-of-type)': { mb: 4 },
                    '& svg': { color: 'text.secondary' },
                  }}
                >
                  <Box sx={{ display: 'flex', mr: 2 }}>
                    <Icon icon='mdi:account' />
                  </Box>
                  <Box
                    sx={{
                      columnGap: 2,
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                    }}
                  >
                    <Typography
                      sx={{ fontWeight: 600, color: 'text.secondary' }}
                    >
                      Username:
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                      @{peopleData.people.name}
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default AboutOverview
