// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components
import CurrentPlanCard from 'src/views/pages/account-settings/billing/CurrentPlanCard'
import PaymentMethodCard from 'src/views/pages/account-settings/billing/PaymentMethodCard'
import BillingAddressCard from './billing/BillingAddressCard'
import { useState } from 'react'
import { PostAddressResponseType } from 'src/types/apps/addressType'
import AddressList from './billing/AddressList'

const TabBilling = () => {
  const [addresses, setAddresses] = useState<PostAddressResponseType[]>([])
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <CurrentPlanCard />
      </Grid>

      <Grid item xs={12}>
        <PaymentMethodCard />
      </Grid>

      <Grid item xs={12}>
        <BillingAddressCard setAddresses={setAddresses} />
      </Grid>

      <Grid item xs={12}>
        <AddressList addresses={addresses} setAddresses={setAddresses} />
      </Grid>
    </Grid>
  )
}

export default TabBilling
