import { Box, Button } from '@mui/material'
import toast from 'react-hot-toast'
import { updateFriendshipStatus } from 'src/pages/api/friendship/updateFriend'

type FriendShipNotificationProps = {
  friendshipId: string
}

const FriendShipNotification = ({
  friendshipId,
}: FriendShipNotificationProps) => {
  const handleAction = async (status: 'ACCEPTED' | 'DECLINED') => {
    try {
      await updateFriendshipStatus(friendshipId, status)
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

export default FriendShipNotification
