// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components
import CurrentPlanCard from 'src/views/pages/account-settings/billing/CurrentPlanCard'
import PaymentMethodCard from 'src/views/pages/account-settings/billing/PaymentMethodCard'
import BillingAddressCard from './billing/BillingAddressCard'
import { useRef, useState } from 'react'
import { PostAddressResponseType } from 'src/types/apps/addressType'
import AddressList from './billing/AddressList'

const TabBilling = () => {
  const [address, setAddress] = useState<
    PostAddressResponseType | null | undefined
  >(null)

  const billingAddressRef = useRef<HTMLDivElement | null>(null)

  const scrollToBillingAddress = () => {
    if (billingAddressRef.current) {
      billingAddressRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <CurrentPlanCard />
      </Grid>

      <Grid item xs={12}>
        <PaymentMethodCard
          address={address}
          scrollToBillingAddress={scrollToBillingAddress}
        />
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
