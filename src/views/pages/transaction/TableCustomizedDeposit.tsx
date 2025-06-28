/* eslint-disable no-unused-vars */
// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { format } from 'date-fns'
import { StyledTableCell, StyledTableRow } from './style'
import { Badge, Box } from '@mui/material'
import { Deposit } from 'src/context/types'
import { formatMoney } from 'src/utils/format-money'
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
  const itemsPerPage = 10

  const mappedTransactions =
    deposit?.map((row) => ({
      id: row.id || 'N/A',
      amount: row.amount || 0,
      paymentType: row.paymentType || 'Unknown',
      status: row.status || 'PENDING',
      createdAt: row.createdAt || new Date().toISOString(),
    })) || []

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
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell align='left'>Payment Type</StyledTableCell>
            <StyledTableCell align='left'>Amount</StyledTableCell>
            <StyledTableCell align='left'>Date</StyledTableCell>
          </TableRow>
          <TableBody>
            {mappedTransactions.length > 0 ? (
              mappedTransactions.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align='left'>{row.id}</StyledTableCell>
                  <StyledTableCell
                    component='td'
                    scope='row'
                    sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}
                  >
                    {TableRowStatus(
                      row.status as 'PENDING' | 'COMPLETED' | 'FAILED',
                    )}
                    {row.status}
                  </StyledTableCell>
                  <StyledTableCell align='left'>
                    {row.paymentType.toUpperCase()}
                  </StyledTableCell>
                  <StyledTableCell align='left'>
                    {formatMoney(row.amount / 100)}
                  </StyledTableCell>
                  <StyledTableCell align='left'>
                    {row.createdAt
                      ? format(new Date(row.createdAt), 'dd/MM/yyyy HH:mm:ss')
                      : 'No data available'}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={5} align='center'>
                  No deposit transactions available.
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Controles de Paginação */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center', // centraliza os botões e texto
          alignItems: 'center',
          marginTop: '16px',
          gap: '16px', // espaço entre botões e texto
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
          sx={{ mb: 2 }} // margem horizontal
        >
          Next
        </Button>
      </Box>
    </div>
  )
}

export default TableCustomizedDeposit
