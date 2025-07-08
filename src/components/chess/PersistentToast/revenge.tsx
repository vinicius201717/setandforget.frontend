/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import toast from 'react-hot-toast'
import { revengeCancel } from 'src/pages/api/chess-room/chess-challenge-websocket'

interface CancelProps {
  userName: string
  toastId: any
  roomId: string
  userId: string
  status: boolean
}

export const CancelableToastContentRevenge = ({
  toastId,
  roomId,
  userName,
  userId,
  status,
}: CancelProps) => {
  const cancelToast = () => {
    revengeCancel(roomId, userId, userName, status)
    toast.dismiss(toastId)
    toast.success('Cancellation successful.', {
      position: 'bottom-right',
    })
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
      <span>Waiting for {userName}</span>
      <button
        onClick={() => cancelToast()}
        style={{
          background: 'none',
          border: 'none',
          color: '#007BFF',
          cursor: 'pointer',
        }}
      >
        Cancel
      </button>
    </div>
  )
}
