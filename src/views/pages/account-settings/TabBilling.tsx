// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components
import CurrentPlanCard from 'src/views/pages/account-settings/billing/CurrentPlanCard'
import BillingAddressCard from './billing/BillingAddressCard'
import { useRef, useState } from 'react'
import { PostAddressResponseType } from 'src/types/apps/addressType'
import AddressList from './billing/AddressList'

const TabBilling = () => {
  const [address, setAddress] = useState<
    PostAddressResponseType | null | undefined
  >(null)

  const billingAddressRef = useRef<HTMLDivElement | null>(null)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <CurrentPlanCard />
      </Grid>

      <Grid item xs={12}>
        <BillingAddressCard setAddress={setAddress} />
      </Grid>

      <Grid item xs={12} ref={billingAddressRef}>
        <AddressList address={address} setAddress={setAddress} />
      </Grid>
    </Grid>
  )
}

export default TabBilling
