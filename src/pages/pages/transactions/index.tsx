// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'
import TableCustomized from 'src/views/pages/transaction/TableCustomized'
import { useEffect, useState } from 'react'
import { getTransaction } from 'src/pages/api/transaction/getTransaction'
import { Transaction } from 'src/context/types'

// Vamos estilizar um componente interno para Link
const StyledAnchor = styled('a')(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main,
}))

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    getTransaction().then((response: Transaction[] | null) => {
      if (response !== null) {
        setTransactions(response)
      } else {
        setTransactions([])
      }
    })
  }, [])

  return (
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography variant='h5'>
            <StyledAnchor target='_blank'>Transactions</StyledAnchor>
          </Typography>
        }
        subtitle={
          <Typography variant='body2'>
            Deposit and withdraw transactions
          </Typography>
        }
      />
      <Grid item xs={12}>
        <Card>
          <TableCustomized transactions={transactions} />
        </Card>
      </Grid>
    </Grid>
  )
}

export default Transactions
