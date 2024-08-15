/* eslint-disable react-hooks/exhaustive-deps */
// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'
import { useEffect, useState } from 'react'
import { Transaction, TransfersTransaction } from 'src/context/types'
import TableCustomizedDeposit from 'src/views/pages/transaction/TableCustomizedDeposit'
import TableCustomizedWithdraw from 'src/views/pages/transaction/TableCustomizedWithdraw'
import {
  AlterButton,
  HeaderContainer,
  HeaderContainerBottom,
  StyledAnchor,
} from './style'
import { GridArrowDownwardIcon, GridArrowUpwardIcon } from '@mui/x-data-grid'
import { getTransfersTransaction } from 'src/pages/api/transaction/getWithdrawTransaction'
import { useAuth } from 'src/hooks/useAuth'

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [transfersTransactions, setTransfersTransactions] = useState<
    TransfersTransaction[]
  >([])
  const [alter, setAlter] = useState<boolean>(true)

  const { setLoading } = useAuth()

  const handleAlter: React.MouseEventHandler<HTMLButtonElement> = () => {
    setAlter(!alter)
  }

  useEffect(() => {
    if (!alter) {
      setLoading(true)
      getTransfersTransaction()
        .then((response: TransfersTransaction[] | null) => {
          if (response !== null) {
            setTransfersTransactions(response)
          } else {
            setTransfersTransactions([])
          }
        })
        .catch((error) => {
          console.error('Failed to fetch transfers:', error)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [alter])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <HeaderContainer>
          <PageHeader
            title={
              <Typography variant='h5'>
                <StyledAnchor href={'/transaction'} target='_blank'>
                  Transactions
                </StyledAnchor>
              </Typography>
            }
            subtitle={
              <Typography variant='body2'>
                Deposit and withdraw transactions
              </Typography>
            }
          />
          <HeaderContainerBottom>
            <AlterButton onClick={handleAlter}>
              <GridArrowUpwardIcon />
            </AlterButton>
            <AlterButton onClick={handleAlter}>
              <GridArrowDownwardIcon />
            </AlterButton>
          </HeaderContainerBottom>
        </HeaderContainer>
      </Grid>
      <Grid item xs={12}>
        <Card>
          {alter ? (
            <TableCustomizedDeposit transactions={transactions} />
          ) : (
            <TableCustomizedWithdraw
              transfersTransactions={transfersTransactions}
            />
          )}
        </Card>
      </Grid>
    </Grid>
  )
}

export default Transactions
