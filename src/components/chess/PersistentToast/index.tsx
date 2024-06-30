/* eslint-disable no-unused-vars */
import toast from 'react-hot-toast'
import { chessChallengeCancel } from 'src/pages/api/chess/chessChallengeCancel'

export const CancelableToastContent = ({ toastId }: any) => {
  const cancelToast = () => {
    const challengeId = window.localStorage.getItem('chess-challenge-id')
    if (challengeId) {
      chessChallengeCancel()
        .then(() => {
          window.localStorage.removeItem('chess-challenge-id')
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
