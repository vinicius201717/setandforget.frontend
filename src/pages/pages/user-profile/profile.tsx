import { useContext } from 'react'
import { AuthContext } from 'src/context/AuthContext'
import { UserDataType } from 'src/context/types'
import UserProfile from 'src/views/pages/user-profile/UserProfile'

const UserProfileTab = () => {
  const { user } = useContext(AuthContext)

  return <UserProfile userData={user as UserDataType} />
}

export default UserProfileTab
