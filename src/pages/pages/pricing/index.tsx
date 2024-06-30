// ** React Imports
import { useState, ChangeEvent, useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import MuiCardContent, { CardContentProps } from '@mui/material/CardContent'

// ** Third Party Imports
import { api } from 'src/lib/axios'

// ** Types
import { PricingDataType } from 'src/@core/components/plan-details/types'

// ** Demo Imports
import PricingCTA from 'src/views/pages/pricing/PricingCTA'
import PricingTable from 'src/views/pages/pricing/PricingTable'
import PricingPlans from 'src/views/pages/pricing/PricingPlans'
import PricingHeader from 'src/views/pages/pricing/PricingHeader'
import PricingFooter from 'src/views/pages/pricing/PricingFooter'
import { pricingData } from './data'

// ** Styled Components
const CardContent = styled(MuiCardContent)<CardContentProps>(({ theme }) => ({
  padding: `${theme.spacing(20, 36)} !important`,
  [theme.breakpoints.down('xl')]: {
    padding: `${theme.spacing(20)} !important`,
  },
  [theme.breakpoints.down('sm')]: {
    padding: `${theme.spacing(10, 5)} !important`,
  },
}))

const Pricing = () => {
  const [plan, setPlan] = useState<'monthly' | 'annually'>('annually')
  const [data, setData] = useState<PricingDataType | null>(pricingData)

  useEffect(() => {
    let isMounted = true
    const fetchData = async () => {
      try {
        const res = await api.get('/pricing/plans')
        const apiData: PricingDataType = res.data
        if (isMounted) {
          setData(apiData)
        }
      } catch (error) {
        console.error('Erro na chamada Axios:', error)
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [])

  const handleChange = (e: ChangeEvent<{ checked: boolean }>) => {
    if (e.target.checked) {
      setPlan('annually')
    } else {
      setPlan('monthly')
    }
  }

  // Verifica se data é nulo antes de acessar suas propriedades
  const pricingPlans = data?.pricingPlans || []

  return (
    <Card>
      <CardContent>
        <PricingHeader plan={plan} handleChange={handleChange} />
        <PricingPlans plan={plan} data={pricingPlans} />
      </CardContent>
      <PricingCTA />
      <CardContent>
        <PricingTable data={data} />
      </CardContent>
      <CardContent sx={{ backgroundColor: 'action.hover' }}>
        <PricingFooter data={data} />
      </CardContent>
    </Card>
  )
}

export default Pricing
