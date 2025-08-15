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
import { deleteNotification } from '../api/notification/deleteNotification'
import toast from 'react-hot-toast'
import { getNotification } from '../api/notification/getNotification'
import FriendshipAction from 'src/components/notification/friendshipAction'
import ChessChallengeAction from 'src/components/notification/chessChallengeAction'

// Tipos discriminados para meta (union type para diferentes contextos)
type FriendRequestMeta = {
  type: 'FRIEND_REQUEST'
  requesterId: string
  friendshipId: string
  status: string
}

type ChessChallengeMeta = {
  type: 'CHESS_CHALLENGE'
  challengerId: string
  challengeId: string
  status: string
  // Adicione campos específicos para desafio de xadrez, ex: gameSettings, etc.
}

// Union type para suportar múltiplos tipos de notificações
type NotificationMeta = FriendRequestMeta | ChessChallengeMeta // Adicione mais tipos conforme necessário, ex: | OtherMeta

const Avatar = styled(CustomAvatar)<CustomAvatarProps>({
  width: 48,
  height: 48,
  fontSize: '1.25rem',
})

const Notification: NextPage = () => {
  const router = useRouter()
  const [notification, setNotification] = useState<
    NotificationsType | null | undefined
  >(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [meta, setMeta] = useState<NotificationMeta | null>(null)
  const { notifications, removeNotification } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      if (!router.isReady) return

      try {
        const notificationId = router.query.id as string
        const response = await getNotification(notificationId)

        if (!response || !response.notification) {
          setNotification(null)
          return
        }

        const { notification } = response
        // Tenta parsear o meta
        if (notification.meta) {
          try {
            setMeta(JSON.parse(notification.meta) as NotificationMeta)
          } catch (e) {
            console.error('Erro ao fazer parse do meta:', e)
          }
        }

        setNotification(notification)

        // Marca como lida, se ainda não estiver
        if (!notification.read) {
          readNotification(notification.id)
        }
      } catch (error) {
        console.error('Erro ao buscar notificação:', error)
        setNotification(null)
      }
    }

    fetchData()
  }, [router.isReady, router.query.id, notifications])

  const RenderAvatar = ({
    notification,
  }: {
    notification: NotificationsType
  }) => {
    const { avatarAlt, avatarImg, name } = notification
    return avatarImg && avatarImg.trim() ? (
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

  // Função para renderizar ações baseadas no tipo de meta
  const renderActions = () => {
    if (!meta || !notification?.action) return null

    switch (meta.type) {
      case 'FRIEND_REQUEST':
        if (meta.status === 'PENDING') {
          return (
            <FriendshipAction
              friendshipId={meta.friendshipId}
              status={'ACCEPTED'}
              action={
                notification.subtitle.toLocaleUpperCase() as ActionTypeEnum
              }
              notificationId={notification.id}
            />
          )
        }
        break
      case 'CHESS_CHALLENGE':
        if (meta.status === 'PENDING') {
          return (
            <ChessChallengeAction
              challengeId={meta.challengeId}
              status={'ACCEPTED'}
              action={
                notification.subtitle.toLocaleUpperCase() as ActionTypeEnum
              }
              notificationId={notification.id}
            />
          )
        }
        break
      default:
        return null
    }
  }

  const renderStatusMessage = () => {
    if (!meta) return null

    switch (meta.type) {
      case 'FRIEND_REQUEST':
        if (meta.status !== 'PENDING') {
          return (
            <Typography
              variant='body2'
              sx={{ mt: 2 }}
              color={meta.status === 'DECLINED' ? 'error.main' : 'success.main'}
            >
              {meta.status === 'DECLINED'
                ? 'Solicitação de amizade recusada.'
                : 'Agora vocês são amigos.'}
            </Typography>
          )
        }
        break
      case 'CHESS_CHALLENGE':
        if (meta.status !== 'PENDING') {
          return (
            <Typography
              variant='body2'
              sx={{ mt: 2 }}
              color={meta.status === 'DECLINED' ? 'error.main' : 'success.main'}
            >
              {meta.status === 'DECLINED'
                ? 'Desafio de xadrez recusado.'
                : 'Desafio de xadrez aceito. Partida iniciada!'}
            </Typography>
          )
        }
        break
      // Adicione mais cases para outros tipos
      default:
        return null
    }
  }

  // Lógica para desabilitar delete: pode ser customizada por tipo
  const isDeleteDisabled = () => {
    if (!meta) return false
    switch (meta.type) {
      case 'FRIEND_REQUEST':
      case 'CHESS_CHALLENGE':
        return meta.status === 'PENDING'
      default:
        return false
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
            disabled={isDeleteDisabled()}
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

          {renderActions()}
          {renderStatusMessage()}

          <br />

          <Typography variant='caption' color='text.disabled'>
            {notification?.createdAt
              ? formatDistanceToNow(new Date(notification.createdAt), {
                  addSuffix: true,
                })
              : 'Date unavailable'}
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
