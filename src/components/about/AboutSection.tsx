// components/about/AboutSection.tsx

import { Box, Typography, Card, CardContent } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { formatDistanceToNow } from 'date-fns'
import { UserDataType } from 'src/context/types'

interface Props {
  user: UserDataType
}

export default function AboutSection({ user }: Props) {
  const creationTimeAgo = formatDistanceToNow(new Date(user.created_at), {
    addSuffix: true,
  })

  return (
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
            <Box sx={{ display: 'flex', columnGap: 2 }}>
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
            <Box sx={{ display: 'flex', columnGap: 2 }}>
              <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>
                Since:
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                {creationTimeAgo}
              </Typography>
            </Box>
          </Box>

          {/* EMAIL */}
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
            <Box sx={{ display: 'flex', columnGap: 2 }}>
              <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>
                Email:
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                {user.email}
              </Typography>
            </Box>
          </Box>

          {/* PHONE */}
          <Box
            sx={{
              display: 'flex',
              '& svg': { color: 'text.secondary' },
            }}
          >
            <Box sx={{ display: 'flex', mr: 2 }}>
              <Icon icon='mdi:phone' />
            </Box>
            <Box sx={{ display: 'flex', columnGap: 2 }}>
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
  )
}
