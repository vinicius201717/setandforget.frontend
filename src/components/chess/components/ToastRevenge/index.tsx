/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import toast from 'react-hot-toast'
import { useAuth } from 'src/hooks/useAuth'
import {
  acceptRevenge,
  refuseRevenge,
} from 'src/pages/api/chess-room/chess-challenge-websocket'
import { chessChallengeCreate } from 'src/pages/api/chess-challenge/chessChallengeCreate'
import { CreateChallengeReturn } from 'src/types/apps/chessTypes'

interface RevengeProps {
  toastId: any
  userId: string
  name: string
  duration: number
  amount: number
}

type RevengeType = {
  amount: number
  duration: number
}

export const ToastRevenge = ({
  toastId,
  userId,
  name,
  duration,
  amount,
}: RevengeProps) => {
  const { user } = useAuth()

  // CONTINUAR DAQUI.

  const handleAcceptRevenge = (data: RevengeType) => {
    if (user?.Account.amount && user.Account.amount / 100 >= data.amount) {
      chessChallengeCreate(data)
        .then((response: CreateChallengeReturn) => {
          const roomId = window.localStorage.getItem('chess-room-id') as string

          const newRoomId = response.room.id
          window.localStorage.setItem('chess-room-id', newRoomId)

          acceptRevenge(
            roomId,
            user?.id as string,
            user?.name as string,
            response.challenge.duration,
            newRoomId,
            response.challenge.id,
          )
        })
        .catch(() => {
          toast.error('Failed to create the challenge: ', {
            position: 'bottom-right',
          })
        })
    }
  }

  const acceptRevengeToast = () => {
    const roomId = window.localStorage.getItem('chess-room-id')
    if (roomId) {
      handleAcceptRevenge({ amount, duration })
    }
  }

  const refuseRevengeToast = () => {
    const roomId = window.localStorage.getItem('chess-room-id')
    if (roomId) {
      const userRefuseName = user?.name as string
      refuseRevenge(roomId, userId, userRefuseName)
      toast.dismiss(toastId)

      toast(`You have declined the rematch request.`, {
        position: 'bottom-right',
        id: 'revenge-self-refuse-toast',
      })
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <span>{name} wants a rematch</span>
      <button
        onClick={() => acceptRevengeToast()}
        style={{
          background: 'none',
          border: 'none',
          color: '#007BFF',
          cursor: 'pointer',
        }}
      >
        To accept
      </button>
      <button
        onClick={() => refuseRevengeToast()}
        style={{
          background: 'none',
          border: 'none',
          color: '#007BFF',
          cursor: 'pointer',
        }}
      >
        Refuse
      </button>
    </div>
  )
}
