/* eslint-disable no-unused-vars */
import toast from 'react-hot-toast'
import { chessChallengeCancel } from 'src/pages/api/chess-challenge/chessChallengeCancel'

interface CancelProps {
  toastId: any
  amount: number
  updateAccountAmount: (amount: number, action: string) => void
}

export const CancelableToastContent = ({
  toastId,
  amount,
  updateAccountAmount,
}: CancelProps) => {
  const cancelToast = () => {
    const challengeId = window.localStorage.getItem('chess-challenge-id')
    const roomId = window.localStorage.getItem('chess-room-id')
    if (challengeId && roomId) {
      chessChallengeCancel(challengeId, roomId, JSON.stringify(amount))
        .then(() => {
          window.localStorage.removeItem('chess-challenge-id')
          window.localStorage.removeItem('chess-room-id')
          updateAccountAmount(amount, 'plus')
          toast.dismiss(toastId)
          toast.success('Cancellation successful.', {
            position: 'bottom-right',
          })
        })
        .catch((error) => {
          console.error('Error during deletion:', error)
          toast.error('Failed to cancel the request.', {
            position: 'bottom-right',
          })
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
      <span>Looking for player...</span>
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
