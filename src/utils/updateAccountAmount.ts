import { UserDataType } from 'src/context/types'

interface UpdateInterface {
  amount: number
  user: UserDataType | null
  setUser: React.Dispatch<React.SetStateAction<UserDataType | null>>
}

export const updateAccountAmount = ({
  amount,
  user,
  setUser,
}: UpdateInterface) => {
  if (user && user.Account) {
    setUser((prevUser) => {
      if (prevUser) {
        return {
          ...prevUser,
          Account: {
            ...prevUser.Account,
            amount,
          },
        }
      }
      return prevUser
    })
  }
}
