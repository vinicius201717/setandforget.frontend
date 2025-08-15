/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ActionTypeEnum } from 'src/context/types'
import { Box, Button } from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'
import toast from 'react-hot-toast'

type ChessChallengeActionProps = {
  action: ActionTypeEnum
  challengeId: string
  notificationId: string
  status: 'ACCEPTED' | 'DECLINED' | 'PENDING'
}

type ChessChallengeNotificationProps = {
  status: 'ACCEPTED' | 'DECLINED' | 'PENDING'
  challengeId: string
  notificationId: string
}

const ChessChallengeNotification = ({
  challengeId,
  notificationId,
  status,
}: ChessChallengeNotificationProps) => {
  const { updateNotificationAction } = useAuth()

  const handleAction = async (status: 'ACCEPTED' | 'DECLINED' | 'PENDING') => {
    try {
      //   const data = useAuth()

      //   const onPlay = () => {
      //     if (
      //       data.user?.Account.amount &&
      //       data.user?.Account.amount >= parseFloat(amount) * 100
      //     ) {
      //       window.localStorage.setItem('chess-room-id', roomId)
      //       connectSocket(
      //         challengeId,
      //         roomId,
      //         user.id,
      //         data?.user?.id as string,
      //         amount,
      //         null,
      //         null,
      //         null,
      //         null,
      //         null,
      //       )
      //     } else {
      //       toast.error('Insuficient sald', { position: 'bottom-right' })
      //     }
      //   }
      // CODIGO PRA ACEITAR O DESAFIO E ENTRAR NA SALA.
      // PRECISO CONTINUAR DAQUI ATUALIZANDO AS OPCOES DE DESAFIO: ACEITAR, RECUSAR.
      // Atualiza o status do desafio de xadrez
      //   await updateChessChallengeStatus(challengeId, status, notificationId)

      updateNotificationAction(notificationId, status)

      toast.success(`Chess challenge ${status.toLowerCase()}`, {
        position: 'bottom-right',
      })
    } catch (error) {
      console.error('Failed to update chess challenge status:', error)
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
        Accept Challenge
      </Button>

      <Button
        variant='outlined'
        color='secondary'
        onClick={() => handleAction('DECLINED')}
        sx={{ borderRadius: '8px' }}
      >
        Decline Challenge
      </Button>
    </Box>
  )
}

const ChessChallengeAction = ({
  action,
  challengeId,
  notificationId,
  status,
}: ChessChallengeActionProps) => {
  const renderActionComponent = () => {
    switch (action) {
      case ActionTypeEnum.CHESS_CHALLENGE:
        return (
          <ChessChallengeNotification
            challengeId={challengeId}
            notificationId={notificationId}
            status={status}
          />
        )
      default:
        return <span>Ação desconhecida</span>
    }
  }

  return <>{renderActionComponent()}</>
}

export default ChessChallengeAction
