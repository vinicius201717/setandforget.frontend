import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import { NotificationsType } from 'src/context/types'
import { useAuth } from 'src/hooks/useAuth'
import {
  Badge,
  Box,
  CircularProgress,
  MenuItem,
  Typography,
  styled,
} from '@mui/material'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { getInitials } from 'src/@core/utils/get-initials'
import { CustomAvatarProps } from 'src/@core/components/mui/avatar/types'

const Avatar = styled(CustomAvatar)<CustomAvatarProps>({
  width: 38,
  height: 38,
  fontSize: '1.125rem',
})

const Notification: NextPage = () => {
  const router = useRouter()
  const [notification, setNotification] = useState<NotificationsType | null>(
    null,
  )
  const { notifications } = useAuth()
  useEffect(() => {
    if (router.isReady) {
      const queryId = router.query.id
      const response = notifications?.filter((item) => item.id === queryId)
      if (response && response.length > 0) {
        setNotification(response[0])
      } else {
        setNotification(null)
      }
    }
  }, [router.isReady, router.query, notifications])

  const RenderAvatar = ({
    notification,
  }: {
    notification: NotificationsType
  }) => {
    const { avatarAlt, avatarImg } = notification

    if (avatarImg) {
      return <Avatar alt={avatarAlt} src={avatarImg} />
    } else {
      return (
        <Avatar skin='light' color='secondary'>
          {getInitials(avatarAlt as string)}
        </Avatar>
      )
    }
  }

  return (
    <>
      {notification ? (
        <Box>
          <MenuItem
            sx={{
              cursor: 'auto',
              '&:hover': { backgroundColor: 'transparent' },
            }}
          >
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              <RenderAvatar notification={notification} />
              <Box
                sx={{
                  mx: 4,
                  flex: '1 1',
                  display: 'flex',
                  overflow: 'hidden',
                  flexDirection: 'column',
                }}
              >
                <Typography variant='h6'>{notification.title}</Typography>
                <Typography variant='body2'>{notification.subtitle}</Typography>
              </Box>
              <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                {notification.meta}
              </Typography>
            </Box>
            <Badge
              color='success'
              variant='dot'
              invisible={!notification.status}
              sx={{
                position: 'absolute',
                top: '3px',
                right: '3px',
                '& .MuiBadge-badge': {
                  top: 4,
                  right: 4,
                  boxShadow: (theme) =>
                    `0 0 0 2px ${theme.palette.background.paper}`,
                },
              }}
            />
          </MenuItem>
          <p
            style={{
              paddingLeft: '20px',
            }}
          >
            {notification.content}
          </p>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </>
  )
}

export default Notification
