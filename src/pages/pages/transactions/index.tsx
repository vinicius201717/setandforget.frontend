/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'
import { useEffect, useState } from 'react'
import { Deposit, Withdraw } from 'src/context/types'
import TableCustomizedDeposit from 'src/views/pages/transaction/TableCustomizedDeposit'
import TableCustomizedWithdraw from 'src/views/pages/transaction/TableCustomizedWithdraw'
import CircularProgress from '@mui/material/CircularProgress'
import { AlterButton, HeaderContainer, HeaderContainerBottom } from './style'
import SwapVertIcon from '@mui/icons-material/SwapVert'
import { getDeposit } from 'src/pages/api/transaction/getDepositTransaction'
import { getWithdraw } from 'src/pages/api/transaction/getWithdrawTransaction'

const Transactions = () => {
  const [deposit, setDeposit] = useState<Deposit[]>([])
  const [pageDeposit, setPageDeposit] = useState<number>(1)

  const [withdraw, setWithdraw] = useState<Withdraw[]>([])
  const [alter, setAlter] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)

  const handleAlter: React.MouseEventHandler<HTMLButtonElement> = () => {
    setAlter(!alter)
  }

  const handlePageDeposit = (page: number) => {
    setPageDeposit(page)
  }

  useEffect(() => {
    if (!alter) {
      setLoading(true)
      getWithdraw()
        .then((response: Withdraw[] | null) => {
          if (response !== null) {
            setWithdraw(response)
          } else {
            setWithdraw([])
          }
        })
        .catch((error: any) => {
          console.error('Failed to fetch transfers:', error)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [alter])

  useEffect(() => {
    getDeposit(1)
      .then((response: Deposit[] | null) => {
        if (response !== null) {
          setDeposit(response)
        } else {
          setDeposit([])
        }
      })
      .catch((error) => {
        console.error('Failed to fetch transfers:', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    getDeposit(pageDeposit)
      .then((response: Deposit[] | null) => {
        if (response !== null) {
          setDeposit(response)
        } else {
          setDeposit([])
        }
      })
      .catch((error) => {
        console.error('Failed to fetch transfers:', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [pageDeposit])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <HeaderContainer>
          <PageHeader
            title={<Typography variant='h5'>Transactions</Typography>}
            subtitle={
              <Typography variant='body2'>
                Deposit and withdraw transactions
              </Typography>
            }
          />
          <HeaderContainerBottom>
            <AlterButton onClick={handleAlter}>
              <SwapVertIcon />
            </AlterButton>
          </HeaderContainerBottom>
        </HeaderContainer>
      </Grid>
      <Grid item xs={12}>
        <Card>
          {alter ? (
            loading ? (
              <CircularProgress />
            ) : (
              <TableCustomizedDeposit
                deposit={deposit}
                handlePageDeposit={handlePageDeposit}
                currentPage={pageDeposit}
              />
            )
          ) : loading ? (
            <CircularProgress />
          ) : (
            <TableCustomizedWithdraw withdraw={withdraw} />
          )}
        </Card>
      </Grid>
    </Grid>
  )
}

export default Transactions
