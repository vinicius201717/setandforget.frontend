/* eslint-disable no-unused-vars */
// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Box, Badge } from '@mui/material'

import { format } from 'date-fns'
import { StyledTableCell, StyledTableRow } from './style'
import { formatMoney } from 'src/utils/format-money'
import { Withdraw } from 'src/context/types'

interface TableCustomizedProps {
  withdraw: Withdraw[] | undefined
  handlePageWithdraw: (page: number) => void
  currentPage: number
}

const pixKeyTypeMap: Record<string, string> = {
  '296': 'CPF',
  '297': 'Telefone',
  '298': 'Email',
  '299': 'CNPJ',
}

const TableRowStatus = (status: 'PENDING' | 'PAID' | 'FAILED') => {
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
    case 'PAID':
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

const TableCustomizedWithdraw = ({
  withdraw,
  handlePageWithdraw,
  currentPage,
}: TableCustomizedProps) => {
  const itemsPerPage = 10

  const mappedTransactions =
    withdraw?.map((row) => ({
      id: row.id || 'ID not available',
      amount: row.amount || 0,
      pixKey: row.pixKey || 'No pix key',
      pixKeyType: pixKeyTypeMap[row.pixKeyType] || 'No type',
      status: row.status || 'FAILED',
      createdAt: row.createdAt || new Date().toISOString(),
    })) || []

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageWithdraw(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (mappedTransactions.length === itemsPerPage) {
      handlePageWithdraw(currentPage + 1)
    }
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='Withdrawals'>
          <TableRow>
            <StyledTableCell>Withdraw ID</StyledTableCell>
            <StyledTableCell align='left'>Status</StyledTableCell>
            <StyledTableCell align='left'>Amount</StyledTableCell>
            <StyledTableCell align='left'>Pix Key</StyledTableCell>
            <StyledTableCell align='left'>Pix Key Type</StyledTableCell>
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
                      row.status as 'PENDING' | 'PAID' | 'FAILED',
                    )}
                    {row.status}
                  </StyledTableCell>
                  <StyledTableCell align='left'>
                    {formatMoney(row.amount / 100)}
                  </StyledTableCell>
                  <StyledTableCell align='left'>{row.pixKey}</StyledTableCell>
                  <StyledTableCell align='left'>
                    {row.pixKeyType}
                  </StyledTableCell>
                  <StyledTableCell align='left'>
                    {row.createdAt
                      ? format(new Date(row.createdAt), 'dd/MM/yyyy HH:mm:ss')
                      : 'No date available'}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={6} align='center'>
                  No available withdrawals
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

export default TableCustomizedWithdraw
