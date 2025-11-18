// components/about/AboutOverview.tsx

import Grid from '@mui/material/Grid'
import AboutSection from 'src/components/about/AboutSection'
import PaymentMethodsSection from 'src/components/about/PaymentMethodsSection'
import UserPostsGrid from 'src/components/about/UserPostsGrid'
import { UserDataType } from 'src/context/types'

interface Props {
  user: UserDataType
}

export default function AboutOverview({ user }: Props) {
  return (
    <Grid container spacing={6}>
      {/* COLUNA ESQUERDA */}
      <Grid item xs={12} md={4}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <AboutSection user={user} />
          </Grid>

          <Grid item xs={12}>
            <PaymentMethodsSection user={user} />
          </Grid>
        </Grid>
      </Grid>

      {/* COLUNA DIREITA */}
      <Grid item xs={12} md={8}>
        <UserPostsGrid user={user} />
      </Grid>
    </Grid>
  )
}
