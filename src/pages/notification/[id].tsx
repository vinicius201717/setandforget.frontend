import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import { ActionTypeEnum, NotificationsType } from 'src/context/types'
import { useAuth } from 'src/hooks/useAuth'
import {
  Box,
  CircularProgress,
  Typography,
  styled,
  Divider,
} from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import IconButton from '@mui/material/IconButton'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { getInitials } from 'src/@core/utils/get-initials'
import { CustomAvatarProps } from 'src/@core/components/mui/avatar/types'
import { formatDistanceToNow } from 'date-fns'
import { readNotification } from '../api/notification/updateNotificaton'
import NotificationActions from 'src/components/notification/actions'
import { deleteNotification } from '../api/notification/deleteNotification'
import toast from 'react-hot-toast'

const Avatar = styled(CustomAvatar)<CustomAvatarProps>({
  width: 48,
  height: 48,
  fontSize: '1.25rem',
})

interface NotificationMeta {
  type: 'FRIEND_REQUEST' | string
  requesterId: string
  friendshipId: string
  status: string
}

const Notification: NextPage = () => {
  const router = useRouter()
  const [notification, setNotification] = useState<
    NotificationsType | null | undefined
  >(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [meta, setMeta] = useState<NotificationMeta | null>(null)
  const { notifications, removeNotification } = useAuth()

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

  const handleDeleteNotification = async (id: string) => {
    try {
      const success = await deleteNotification(id)

      if (success) {
        toast.success('Notification deleted successfully.', {
          position: 'bottom-right',
        })
        removeNotification(id)
        setIsDeleting(true)
        setTimeout(() => {
          router.back()
        }, 400)
      } else {
        toast.error('Failed to delete notification.', {
          position: 'bottom-right',
        })
      }
    } catch (error) {
      console.error('Error deleting notification:', error)
      toast.error('An unexpected error occurred.', {
        position: 'bottom-right',
      })
    }
  }

  return (
    <>
      {notification ? (
        <Box
          sx={{
            position: 'relative',
            maxWidth: 600,
            mx: 'auto',
            mt: 8,
            p: 4,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: 'background.paper',
            transition: 'opacity 0.4s ease',
            opacity: isDeleting ? 0 : 1,
          }}
        >
          <IconButton
            aria-label='delete'
            color='error'
            disabled={meta?.status === 'PENDING'}
            sx={{ position: 'absolute', top: 8, right: 8 }}
            onClick={() => {
              handleDeleteNotification(notification.id)
            }}
          >
            <DeleteOutlineIcon />
          </IconButton>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <RenderAvatar notification={notification} />
            <Box sx={{ ml: 3 }}>
              <Typography variant='h6'>{notification.title}</Typography>
              <Typography variant='body2' color='text.secondary'>
                {notification.subtitle}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant='body1' sx={{ mb: 2 }}>
            {notification.content}
          </Typography>

          {notification.action && meta?.status === 'PENDING' && (
            <NotificationActions
              friendshipId={meta.friendshipId}
              status={'ACCEPTED'}
              action={
                notification.subtitle.toLocaleUpperCase() as ActionTypeEnum
              }
              notificationId={notification.id}
            />
          )}
          {meta?.status !== 'PENDING' && (
            <Typography
              variant='body2'
              sx={{ mt: 2 }}
              color={
                meta?.status === 'DECLINED' ? 'error.main' : 'success.main'
              }
            >
              {meta?.status === 'DECLINED'
                ? 'Solicitação de amizade recusada.'
                : 'Agora vocês são amigos.'}
            </Typography>
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
