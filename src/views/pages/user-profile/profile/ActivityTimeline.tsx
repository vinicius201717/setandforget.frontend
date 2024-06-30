// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import MuiTimeline, { TimelineProps } from '@mui/lab/Timeline'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import Link from 'next/link'
import { UserDataType } from 'src/context/types'
import { Button } from '@mui/material'
import { formatMoney } from 'src/utils/format-money'
// Styled Timeline component
const Timeline = styled(MuiTimeline)<TimelineProps>({
  paddingLeft: 0,
  paddingRight: 0,
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none',
    },
  },
})

type PropsType = {
  user: UserDataType
}

const ActivityTimeline = (props: PropsType) => {
  const { user } = props

  return (
    <Card>
      <CardHeader
        title='Balance'
        sx={{ '& .MuiCardHeader-avatar': { mr: 2.5 } }}
        avatar={<Icon icon='mdi:chart-timeline-variant' />}
        titleTypographyProps={{ sx: { color: 'text.primary' } }}
      />
      <CardContent>
        <Timeline sx={{ my: 0, py: 0 }}>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='error' />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent
              sx={{ mt: 0, mb: (theme) => `${theme.spacing(2.75)} !important` }}
            >
              <Box
                sx={{
                  mb: 2.5,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant='h6' sx={{ mr: 2, fontWeight: 600 }}>
                  Money
                </Typography>
              </Box>
              <Typography variant='h4' sx={{ mb: 2 }}>
                {user.userBalance
                  ? formatMoney(user.userBalance.balance)
                  : formatMoney(0.0)}
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <Box
            sx={{
              mb: 2.5,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'start',
              gap: 10,
            }}
          >
            <Link href='/pages/account-settings/account/'>
              <Button
                variant='outlined'
                color='primary'
                sx={{ minWidth: '120px' }}
              >
                deposit
              </Button>
            </Link>
            <Link href='/pages/account-settings/account/'>
              <Button
                variant='outlined'
                color='secondary'
                sx={{ minWidth: '120px' }}
              >
                Withdraw
              </Button>
            </Link>
          </Box>
        </Timeline>
      </CardContent>
    </Card>
  )
}

export default ActivityTimeline
