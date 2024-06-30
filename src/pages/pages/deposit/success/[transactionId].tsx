import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { updateDeposit } from 'src/pages/api/payment/updateDeposit'
import { SuccessPage } from 'src/views/pages/deposit/success'

const Success = () => {
  const router = useRouter()
  const { transactionId } = router.query

  useEffect(() => {
    if (transactionId) {
      updateDeposit(transactionId as string).then((response) => {
        console.log(response)
      })
    }
  }, [transactionId])

  return (
    <div>
      <h1>Session Page</h1>
      <p>Session ID: {transactionId}</p>
      <SuccessPage />
    </div>
  )
}

export default Success
