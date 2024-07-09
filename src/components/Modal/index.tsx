import React from 'react'
import { CardActions, CardContent, Modal, Typography } from '@mui/material'
import {
  AvatarContainer,
  AvatarStyled,
  CloseButton,
  PlayButton,
  StyledCard,
} from './style'
import CloseIcon from '@mui/icons-material/Close'
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
        <CloseButton onClick={handleClose}>
          <CloseIcon />
        </CloseButton>
        <CardContent>
          <AvatarContainer>
            <AvatarStyled> {InitialLetterName(user.name)}</AvatarStyled>
            <Typography variant='h6'>{user.name}</Typography>
          </AvatarContainer>
          <Typography variant='h4'>
            {formatMoney(parseFloat(amount))}
          </Typography>
          <Typography variant='h6'>{duration / 60} minutos</Typography>
        </CardContent>
        <CardActions>
          <PlayButton onClick={() => onPlay()}>JOGAR</PlayButton>
        </CardActions>
      </StyledCard>
    </Modal>
  )
}

export default ConfirmModal
