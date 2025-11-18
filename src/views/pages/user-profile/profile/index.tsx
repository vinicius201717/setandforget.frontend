// Importe os tipos necessários, ajustando conforme necessário
import Grid from '@mui/material/Grid'
import { UserDataType } from 'src/context/types'
import AboutOverivew from './AboutOverivew'

interface ProfileTabProps {
  userData: UserDataType
}

const ProfileTab: React.FC<ProfileTabProps> = ({ userData }) => {
  // teste
  return (
    <Grid container spacing={6}>
      <Grid item lg={12} md={12} xs={12}>
        <AboutOverivew user={userData} />
      </Grid>
    </Grid>
  )
}

export default ProfileTab
