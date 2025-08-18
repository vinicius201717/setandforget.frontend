/* eslint-disable import/no-duplicates */
// app/notifications/page.tsx
'use client'

import {
  Typography,
  Badge,
  MenuItem,
  Box,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { NotificationsType } from 'src/context/types'
import { getAllNotifications } from '../api/notification/getAllNotifications'
import { getInitials } from 'src/@core/utils/get-initials'
import { deleteNotification } from '../api/notification/deleteNotification'
import toast from 'react-hot-toast'

type Props = {
  handleDropdownClose: () => void
}

const RenderAvatar = ({
  notification,
}: {
  notification: NotificationsType
}) => {
  const { avatarAlt, avatarImg, name } = notification

  return avatarImg ? (
    <Avatar alt={avatarAlt} src={avatarImg} sx={{ width: 48, height: 48 }} />
  ) : (
    <Avatar sx={{ width: 48, height: 48 }}>
      {getInitials(name as string)}
    </Avatar>
  )
}

const NotificationsDropdown = ({ handleDropdownClose }: Props) => {
  const [notifications, setNotifications] = useState<NotificationsType[]>([])
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedNotificationId, setSelectedNotificationId] = useState<
    string | null
  >(null)

  useEffect(() => {
    getAllNotifications().then((response) => {
      setNotifications(response?.notifications || [])
    })
  }, [])

  const handleDeleteClick = (id: string) => {
    setSelectedNotificationId(id)
    setOpenDialog(true)
  }

  const handleConfirmDelete = async () => {
    if (!selectedNotificationId) return
    try {
      const success = await deleteNotification(selectedNotificationId)
      if (success) {
        toast.success('Notification deleted.', { position: 'bottom-right' })
        setNotifications((prev) =>
          prev.filter((n) => n.id !== selectedNotificationId),
        )
      }
    } catch (error) {
      console.error('Error deleting notification:', error)
      toast.error('An unexpected error occurred.', { position: 'bottom-right' })
    } finally {
      setOpenDialog(false)
      setSelectedNotificationId(null)
    }
  }

  const handleCancelDelete = () => {
    setOpenDialog(false)
    setSelectedNotificationId(null)
  }

  if (!notifications.length) {
    return (
      <Typography variant='body2' color='text.secondary' sx={{ p: 2 }}>
        No notifications available
      </Typography>
    )
  }

  return (
    <>
      {notifications.map((notification: NotificationsType) => (
        <Link
          key={notification.id}
          href={`/notification/${notification.id}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
          onClick={handleDropdownClose}
        >
          <MenuItem
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 2,
              px: 2,
              py: 1.5,
              position: 'relative',
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            <RenderAvatar notification={notification} />

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant='subtitle2' fontWeight={600} noWrap>
                {notification.name}
              </Typography>
              <Typography
                variant='subtitle1'
                fontWeight={500}
                color='text.primary'
                noWrap
              >
                {notification.title}
              </Typography>
              <Typography
                variant='caption'
                color='text.disabled'
                sx={{
                  position: 'absolute',
                  bottom: 8,
                  right: 16,
                  fontStyle: 'italic',
                }}
              >
                {notification.createdAt
                  ? formatDistanceToNow(new Date(notification.createdAt), {
                      addSuffix: true,
                      locale: ptBR,
                    })
                  : 'tempo desconhecido'}
              </Typography>
            </Box>

            {!notification.read ? (
              <Badge
                color='primary'
                variant='dot'
                invisible={notification.read}
                sx={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  '& .MuiBadge-badge': {
                    width: 10,
                    height: 10,
                    minWidth: 0,
                    borderRadius: '50%',
                    boxShadow: (theme) =>
                      `0 0 0 2px ${theme.palette.background.paper}`,
                  },
                }}
              />
            ) : (
              <IconButton
                aria-label='delete'
                size='small'
                sx={{ position: 'absolute', top: 12, right: 12 }}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleDeleteClick(notification.id)
                }}
              >
                <DeleteOutlineIcon fontSize='small' />
              </IconButton>
            )}
          </MenuItem>
        </Link>
      ))}

      {/* Modal de confirmação */}
      <Dialog open={openDialog} onClose={handleCancelDelete}>
        <DialogTitle>Confirmar exclusão</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza que deseja deletar esta notificação?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color='primary'>
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color='error'>
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default NotificationsDropdown
