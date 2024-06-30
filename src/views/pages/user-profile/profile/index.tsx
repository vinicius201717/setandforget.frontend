// Importe os tipos necessários, ajustando conforme necessário
import Grid from '@mui/material/Grid'
import { UserDataType } from 'src/context/types'
import AboutOverivew from './AboutOverivew'
import ActivityTimeline from './ActivityTimeline'
import Subscription from '../Subscription'

interface ProfileTabProps {
  userData: UserDataType
}

const ProfileTab: React.FC<ProfileTabProps> = ({ userData }) => {
  // teste
  return (
    <Grid container spacing={6}>
      <Grid item lg={4} md={5} xs={12}>
        <AboutOverivew user={userData} />
      </Grid>
      <Grid item lg={8} md={7} xs={12}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <ActivityTimeline user={userData} />
            <Subscription user={userData} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ProfileTab
