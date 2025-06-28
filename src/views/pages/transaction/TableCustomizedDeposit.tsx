/* eslint-disable no-unused-vars */
// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { differenceInSeconds, format } from 'date-fns'
import { StyledTableCell, StyledTableRow } from './style'
import { Badge, Box } from '@mui/material'
import { Deposit } from 'src/context/types'
import { formatMoney } from 'src/utils/format-money'
import { useState } from 'react'
interface TableCustomizedProps {
  deposit: Deposit[] | undefined
  handlePageDeposit: (page: number) => void
  currentPage: number
}
const TableRowStatus = (status: 'PENDING' | 'COMPLETED' | 'FAILED') => {
  switch (status) {
    case 'PENDING':
      return (
        <Badge
          color='warning'
          variant='dot'
          sx={{
            '& .MuiBadge-badge': {
              right: 4,
              boxShadow: (theme) =>
                `0 0 0 2px ${theme.palette.background.paper}`,
            },
          }}
        />
      )
    case 'COMPLETED':
      return (
        <Badge
          color='success'
          variant='dot'
          sx={{
            '& .MuiBadge-badge': {
              right: 4,
              boxShadow: (theme) =>
                `0 0 0 2px ${theme.palette.background.paper}`,
            },
          }}
        />
      )
    case 'FAILED':
      return (
        <Badge
          color='error'
          variant='dot'
          sx={{
            '& .MuiBadge-badge': {
              right: 4,
              boxShadow: (theme) =>
                `0 0 0 2px ${theme.palette.background.paper}`,
            },
          }}
        />
      )
    default:
      return null
  }
}

const TableCustomizedDeposit = ({
  deposit,
  handlePageDeposit,
  currentPage,
}: TableCustomizedProps) => {
  const [openModal, setOpenModal] = useState(false)
  const [selectedDeposit, setSelectedDeposit] = useState<Deposit | null>(null)

  const handleOpenModal = (deposit: Deposit) => {
    setSelectedDeposit(deposit)
    setOpenModal(true)
  }

  const actionButton = (row: Deposit) => {
    const secondsSinceUpdate = differenceInSeconds(
      new Date(),
      new Date(row.updatedAt),
    )
    const stillValid = secondsSinceUpdate <= 300 // 5 min

    if (stillValid && row.status === 'PENDING') {
      return (
        <Button variant='contained' onClick={() => handleOpenModal(row)}>
          Pagar
        </Button>
      )
    }
    return null
  }

  const itemsPerPage = 10

  const mappedTransactions = deposit || []

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageDeposit(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (mappedTransactions.length === itemsPerPage) {
      handlePageDeposit(currentPage + 1)
    }
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='Transactions'>
          <TableRow>
            <StyledTableCell>Deposit ID</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell align='left'>Payment Type</StyledTableCell>
            <StyledTableCell align='left'>Amount</StyledTableCell>
            <StyledTableCell align='left'>Date</StyledTableCell>
            <StyledTableCell align='center'>Action</StyledTableCell>
          </TableRow>
          <TableBody>
            {mappedTransactions.length > 0 ? (
              mappedTransactions.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align='left'>{row.id}</StyledTableCell>
                  <StyledTableCell align='left'>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                      }}
                    >
                      {TableRowStatus(
                        row.status as 'PENDING' | 'COMPLETED' | 'FAILED',
                      )}
                      {row.status}
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell align='left'>
                    {row.paymentType.toUpperCase()}
                  </StyledTableCell>
                  <StyledTableCell align='left'>
                    {formatMoney(row.amount)}
                  </StyledTableCell>
                  <StyledTableCell align='left'>
                    {row.createdAt
                      ? format(new Date(row.createdAt), 'dd/MM/yyyy HH:mm:ss')
                      : 'No data available'}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    {actionButton(row)}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={6} align='center'>
                  No deposit transactions available.
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '16px',
          gap: '16px',
          padding: '0 16px',
        }}
      >
        <Button
          variant='outlined'
          onClick={handlePrevious}
          disabled={currentPage === 1}
          sx={{ mb: 2 }}
        >
          Previous
        </Button>
        <Typography variant='body2'>
          Page {currentPage} ({mappedTransactions.length} items)
        </Typography>
        <Button
          variant='outlined'
          onClick={handleNext}
          disabled={mappedTransactions.length < itemsPerPage}
          sx={{ mb: 2 }}
        >
          Next
        </Button>
      </Box>
    </div>
  )
}

export default TableCustomizedDeposit
