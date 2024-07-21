/* eslint-disable no-unused-vars */
import { UserDataType } from 'src/context/types'

type ReturnAmountToAcceptDrawType = {
  user: UserDataType
  setUser: (value: UserDataType) => void
  amount: number
}

export const returnAmountToAcceptDraw = ({
  user,
  setUser,
  amount,
}: ReturnAmountToAcceptDrawType) => {
  if (!user || !user.Account || typeof user.Account.amount !== 'number') {
    throw new Error('Invalid user or account data')
  }

  if (typeof amount !== 'number' || amount <= 0) {
    throw new Error('Invalid bet amount')
  }

  const newAmount = user.Account.amount + amount * 100

  const updatedUser = {
    ...user,
    Account: {
      ...user.Account,
      amount: newAmount,
    },
  }

  setUser(updatedUser)
}
