/* eslint-disable no-unused-vars */
import { UserDataType } from 'src/context/types'

export const updateAccountAmount = (
  amount: number,
  action: string,
  user: UserDataType,
  setUser: (user: UserDataType) => void,
) => {
  if (user && user.Account) {
    let newAmount: number
    switch (action) {
      case 'subtraction':
        newAmount = (user.Account.amount / 100 - amount) * 100
        break

      case 'plus':
        newAmount = user.Account.amount
        break
      default:
        newAmount = user.Account.amount
        break
    }

    const updatedUser = {
      ...user,
      Account: {
        ...user.Account,
        amount: newAmount,
      },
    }
    setUser(updatedUser)
  }
}
