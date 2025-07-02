import React from 'react'
import {
  Box,
  CardActions,
  CardContent,
  Divider,
  Modal,
  Typography,
} from '@mui/material'
import { AvatarStyled, PlayButton, StyledCard } from './style'
import { InitialLetterName } from 'src/utils/initialFormatNameIcon'
import { formatMoney } from 'src/utils/format-money'
import { useAuth } from 'src/hooks/useAuth'
import { connectSocket } from 'src/pages/api/chess-room/chess-challenge-websocket'
import toast from 'react-hot-toast'
type UserChallengeCreatorProps = {
  name: string
  id: string
  avatar: string
}

interface ConfirmModalProps {
  open: boolean
  challengeId: string
  roomId: string
  handleClose: () => void
  user: UserChallengeCreatorProps
  avatar: string
  amount: string
  duration: number
}

function ConfirmModal({
  open,
  challengeId,
  roomId,
  handleClose,
  user,
  amount,
  duration,
}: ConfirmModalProps) {
  const data = useAuth()

  const onPlay = () => {
    if (
      data.user?.Account.amount &&
      data.user?.Account.amount >= parseFloat(amount) * 100
    ) {
      window.localStorage.setItem('chess-room-id', roomId)
      connectSocket(
        challengeId,
        roomId,
        user.id,
        data?.user?.id as string,
        amount,
        null,
        null,
        null,
        null,
        null,
      )
    } else {
      toast.error('Insuficient sald', { position: 'bottom-right' })
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      aria-labelledby='modal-title'
      aria-describedby='modal-description'
      disableAutoFocus
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <StyledCard>
        <CardContent sx={{ p: 0 }}>
          <Typography
            variant='h6'
            sx={{ fontWeight: 600, mb: 2, textAlign: 'center' }}
          >
            Registration Confirmation
          </Typography>

          <Divider sx={{ my: 1 }} />

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <AvatarStyled>{InitialLetterName(user.name)}</AvatarStyled>
            <Box sx={{ ml: 2 }}>
              <Typography variant='subtitle2' color='text.secondary'>
                Challenger
              </Typography>
              <Typography variant='body1'>{user.name}</Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 1 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant='body2' color='text.secondary'>
              Amount
            </Typography>
            <Typography variant='body2'>
              {formatMoney(parseFloat(amount))}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant='body2' color='text.secondary'>
              Duration
            </Typography>
            <Typography variant='body2'>{duration / 60} minutes</Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant='body2' color='text.secondary'>
              Room ID
            </Typography>
            <Typography variant='body2'>{roomId.slice(0, 8)}...</Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography
            variant='caption'
            color='text.disabled'
            sx={{ fontStyle: 'italic' }}
          >
            By clicking PLAY, you confirm your participation and authorize the
            deduction of the entry amount.
          </Typography>
        </CardContent>

        <CardActions sx={{ justifyContent: 'center', mt: 3 }}>
          <PlayButton
            onClick={onPlay}
            sx={{
              width: '100%',
              fontWeight: 700,
              py: 1.2,
              borderRadius: 1,
            }}
          >
            PLAY
          </PlayButton>
        </CardActions>
      </StyledCard>
    </Modal>
  )
}

export default ConfirmModal
