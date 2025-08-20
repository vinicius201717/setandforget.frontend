/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ActionTypeEnum } from 'src/context/types'
import { Box, Button } from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'
import toast from 'react-hot-toast'
import { chessChallengeGet } from 'src/pages/api/chess-challenge/chessChallengeGet'
import { connectSocket } from 'src/pages/api/chess-room/chess-challenge-websocket'
import { GetChallengeInterface } from 'src/types/apps/chessTypes'
import { deleteNotification } from 'src/pages/api/notification/deleteNotification'
import { updateNotificationStatus } from 'src/pages/api/notification/updateNotificationStatus'

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
}: ChessChallengeNotificationProps) => {
  const { updateNotificationAction, user } = useAuth()

  const handleAction = async (status: 'ACCEPTED' | 'DECLINED' | 'PENDING') => {
    try {
      await updateNotificationStatus(notificationId, status)

      updateNotificationAction(notificationId, status)
      const response: GetChallengeInterface = await chessChallengeGet(
        challengeId,
        true,
      )
      if (status === 'ACCEPTED') {
        if (!response) {
          toast.error('Challenge canceled', { position: 'bottom-right' })
          return
        }

        if (
          user?.Account.amount &&
          user.Account.amount >= response.amount * 100
        ) {
          window.localStorage.setItem('chess-room-id', response.Room.id)

          connectSocket(
            challengeId,
            response.Room.id,
            response.userId,
            user.id,
            response.amount.toString(),
            'true',
            null,
            null,
            null,
            null,
            null,
          )
        } else {
          toast.error('Insufficient saldo', { position: 'bottom-right' })
          deleteNotification(notificationId)
          return
        }
      } else {
        // TENTAR LOGAR NO WEBSOCKET PRA TENTAR NOTIFICAR O USUARIO QUE EU CANCELEI O DESAFIO
        // VERIFICAR COM IA SE TEM OUTRA FORMA DE FAZER ISSO
        connectSocket(
          challengeId,
          response.Room.id,
          response.userId,
          'undefined',
          response.amount.toString(),
          'true',
          null,
          null,
          null,
          null,
          null,
        )
        updateNotificationAction(notificationId, status)
      }

      toast.success(`Chess challenge ${status.toLowerCase()}`, {
        position: 'bottom-right',
      })
    } catch (error) {
      console.error('Failed to update chess challenge status:', error)
      toast.error('Something went wrong', { position: 'bottom-right' })
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
