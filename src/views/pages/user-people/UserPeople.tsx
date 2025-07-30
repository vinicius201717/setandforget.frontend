import { Grid } from '@mui/material'
import { PeopleProfileResponse } from 'src/context/types'
import UserPeopleHeader from './UserPeopleHeader'
import ProfileTab from './profile'
import { onFriendAction } from 'src/pages/api/friendship/friendAction'

interface UserProfileProps {
  peopleData: PeopleProfileResponse
  peopleId: string
}

const UserPeople: React.FC<UserProfileProps> = ({ peopleData, peopleId }) => {
  const handleFriendActon = async (
    action: 'add' | 'remove' | 'accept' | 'decline' | 'cancel',
    myId: string,
    peapleId: string,
    friendshipId: string | null,
  ): Promise<void> => {
    await onFriendAction(action, myId, peapleId, friendshipId)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserPeopleHeader
          peopleData={peopleData}
          peopleId={peopleId}
          onFriendAction={handleFriendActon}
        />
      </Grid>
      <Grid item xs={12}>
        <ProfileTab peopleData={peopleData} />
      </Grid>
    </Grid>
  )
}

export default UserPeople
