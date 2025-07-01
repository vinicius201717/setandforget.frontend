/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import toast from 'react-hot-toast'
import { useAuth } from 'src/hooks/useAuth'
import {
  acceptDraw,
  acceptRevenge,
  refuseDraw,
  refuseRevenge,
} from 'src/pages/api/chess-room/chess-challenge-websocket'

interface DrawProps {
  toastId: any
  userId: string
  name: string
}

export const ToastRevenge = ({ toastId, userId, name }: DrawProps) => {
  const { user } = useAuth()
  const acceptRevengeToast = () => {
    const roomId = window.localStorage.getItem('chess-room-id')
    const userRefuseName = user?.name as string
    if (roomId) {
      acceptRevenge(roomId, userId, userRefuseName)
      toast.dismiss(toastId)
    }
  }

  const refuseRevengeToast = () => {
    const roomId = window.localStorage.getItem('chess-room-id')
    if (roomId) {
      const userRefuseName = user?.name as string
      refuseRevenge(roomId, userId, userRefuseName)
      toast.dismiss(toastId)
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
