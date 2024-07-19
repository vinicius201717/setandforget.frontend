/* eslint-disable no-unused-vars */
import { UserDataType } from 'src/context/types'

type ReturnTheWinnerIsWinnengsInCaseOfWithdrawalType = {
  user: UserDataType
  setUser: (value: UserDataType) => void
  amount: number
}

export const returnTheWinnerIsWinnengsInCaseOfWithdrawal = ({
  user,
  setUser,
  amount,
}: ReturnTheWinnerIsWinnengsInCaseOfWithdrawalType) => {
  if (!user || !user.Account || typeof user.Account.amount !== 'number') {
    throw new Error('Invalid user or account data')
  }

  if (typeof amount !== 'number' || amount <= 0) {
    throw new Error('Invalid bet amount')
  }

  const totalBet = amount * 2
  const winnings = totalBet * 0.9
  const newAmount = user.Account.amount + winnings * 100

  const updatedUser = {
    ...user,
    Account: {
      ...user.Account,
      amount: newAmount,
    },
  }

  setUser(updatedUser)
}
