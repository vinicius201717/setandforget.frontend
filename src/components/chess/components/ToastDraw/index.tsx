/* eslint-disable no-unused-vars */
import toast from 'react-hot-toast'
import { useAuth } from 'src/hooks/useAuth'
import {
  acceptDraw,
  refuseDraw,
} from 'src/pages/api/chess-room/chess-challenge-websocket'

interface DrawProps {
  toastId: any
  userId: string
  name: string
}

export const ToastDraw = ({ toastId, userId, name }: DrawProps) => {
  const { user } = useAuth()
  const acceptDrawToast = () => {
    const roomId = window.localStorage.getItem('chess-room-id')
    const userRefuseName = user?.name as string
    if (roomId) {
      acceptDraw(roomId, userId, userRefuseName)
      toast.dismiss(toastId)
    }
  }

  const refuseDrawToast = () => {
    const roomId = window.localStorage.getItem('chess-room-id')
    if (roomId) {
      const userRefuseName = user?.name as string
      refuseDraw(roomId, userId, userRefuseName)
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
      <span>{name} proposed a draw</span>
      <button
        onClick={() => acceptDrawToast()}
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
        onClick={() => refuseDrawToast()}
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
