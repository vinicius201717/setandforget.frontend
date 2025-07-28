// Importe os tipos necessários, ajustando conforme necessário
import Grid from '@mui/material/Grid'
import { PeopleProfileResponse } from 'src/context/types'
import AboutOverivew from './AboutOverivew'

interface ProfileTabProps {
  peopleData: PeopleProfileResponse
}

const ProfileTab: React.FC<ProfileTabProps> = ({ peopleData }) => {
  return (
    <Grid container spacing={6}>
      <Grid item lg={4} md={5} xs={12}>
        <AboutOverivew peopleData={peopleData} />
      </Grid>
      <Grid item lg={8} md={7} xs={12}>
        <Grid container spacing={6}>
          <Grid item xs={12}></Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ProfileTab
