import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import { ActionTypeEnum, NotificationsType } from 'src/context/types'
import { useAuth } from 'src/hooks/useAuth'
import {
  Badge,
  Box,
  CircularProgress,
  Typography,
  styled,
  Divider,
} from '@mui/material'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { getInitials } from 'src/@core/utils/get-initials'
import { CustomAvatarProps } from 'src/@core/components/mui/avatar/types'
import { formatDistanceToNow } from 'date-fns'
import { readNotification } from '../api/notification/updateNotificaton'
import NotificationActions from 'src/components/notification/actions'

const Avatar = styled(CustomAvatar)<CustomAvatarProps>({
  width: 48,
  height: 48,
  fontSize: '1.25rem',
})

interface NotificationMeta {
  type: 'FRIEND_REQUEST' | string
  requesterId: string
  friendshipId: string
  // Se quiser, adicione mais campos possíveis aqui
}

const Notification: NextPage = () => {
  const router = useRouter()
  const [notification, setNotification] = useState<
    NotificationsType | null | undefined
  >(null)
  const [meta, setMeta] = useState<NotificationMeta | null>(null)
  const { notifications } = useAuth()

  useEffect(() => {
    if (router.isReady) {
      const queryId = router.query.id
      const response = notifications?.find((item) => item.id === queryId)
      try {
        if (response?.meta) {
          setMeta(JSON.parse(response.meta) as NotificationMeta)
        }
      } catch (e) {
        console.error('Erro ao fazer parse do meta:', e)
      }
      if (response) {
        setNotification(response)
        if (!response.read) readNotification(response.id)
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
    const { avatarAlt, avatarImg, name } = notification
    return avatarImg ? (
      <Avatar alt={avatarAlt} src={avatarImg} />
    ) : (
      <Avatar skin='light' color='secondary'>
        {getInitials(name)}
      </Avatar>
    )
  }

  return (
    <>
      {notification ? (
        <Box
          sx={{
            maxWidth: 600,
            mx: 'auto',
            mt: 8,
            p: 4,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: 'background.paper',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <RenderAvatar notification={notification} />
            <Box sx={{ ml: 3 }}>
              <Typography variant='h6'>{notification.title}</Typography>
              <Typography variant='body2' color='text.secondary'>
                {notification.subtitle}
              </Typography>
            </Box>
            <Badge
              color='success'
              variant='dot'
              invisible={!notification.read}
              sx={{
                ml: 'auto',
                '& .MuiBadge-badge': {
                  top: 4,
                  right: 4,
                  boxShadow: (theme) =>
                    `0 0 0 2px ${theme.palette.background.paper}`,
                },
              }}
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant='body1' sx={{ mb: 2 }}>
            {notification.content}
          </Typography>
          {notification.action && (
            <NotificationActions
              friendshipId={meta?.friendshipId as string}
              action={
                notification.subtitle.toLocaleUpperCase() as ActionTypeEnum
              }
            />
          )}
          <br />
          <Typography variant='caption' color='text.disabled'>
            {formatDistanceToNow(new Date(notification.createdAt), {
              addSuffix: true,
            })}
          </Typography>
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
