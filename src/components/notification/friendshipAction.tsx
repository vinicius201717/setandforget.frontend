/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ActionTypeEnum } from 'src/context/types'
import { Box, Button } from '@mui/material'
import { updateFriendshipStatus } from 'src/pages/api/friendship/updateFriend'
import { useAuth } from 'src/hooks/useAuth'
import toast from 'react-hot-toast'

type FriendshipActionProps = {
  action: ActionTypeEnum
  friendshipId: string
  notificationId: string
  status: 'ACCEPTED' | 'DECLINED' | 'PENDING'
}

type FriendShipNotificationProps = {
  status: 'ACCEPTED' | 'DECLINED' | 'PENDING'
  friendshipId: string
  notificationId: string
}

const FriendShipNotification = ({
  friendshipId,
  notificationId,
  status,
}: FriendShipNotificationProps) => {
  const { updateNotificationAction } = useAuth()

  const handleAction = async (status: 'ACCEPTED' | 'DECLINED' | 'PENDING') => {
    try {
      await updateFriendshipStatus(friendshipId, status, notificationId)

      updateNotificationAction(notificationId, status)

      toast.success(`Friend request ${status.toLowerCase()}`, {
        position: 'bottom-right',
      })
    } catch (error) {
      console.error('Failed to update friendship status:', error)
      toast.error('Something went wrong', {
        position: 'bottom-right',
      })
    }
  }

  return (
    <Box sx={{ display: 'flex', gap: 2, marginLeft: 0 }}>
      <Button
        variant='contained'
        color='primary'
        onClick={() => handleAction('ACCEPTED')}
        sx={{ borderRadius: '8px' }}
      >
        Accept
      </Button>

      <Button
        variant='outlined'
        color='secondary'
        onClick={() => handleAction('DECLINED')}
        sx={{ borderRadius: '8px' }}
      >
        Decline
      </Button>
    </Box>
  )
}

const FriendshipAction = ({
  action,
  friendshipId,
  notificationId,
  status,
}: FriendshipActionProps) => {
  const renderActionComponent = () => {
    switch (action) {
      case ActionTypeEnum.FRIENDSHIP:
        return (
          <FriendShipNotification
            friendshipId={friendshipId}
            notificationId={notificationId}
            status={status}
          />
        )
      case ActionTypeEnum.BLOCK:
        return <span>Blocked</span>
      default:
        return <span>Ação desconhecida</span>
    }
  }

  return <>{renderActionComponent()}</>
}

export default FriendshipAction
