// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import ReceiptIcon from '@mui/icons-material/Receipt'

import { format } from 'date-fns'
import { StyledTableCell, StyledTableRow } from './style'
import { Badge, useTheme } from '@mui/material'
import Link from 'next/link'
import { formatMoney } from 'src/utils/format-money'
import { TransfersTransaction } from 'src/context/types'

interface TableCustomizedProps {
  transfersTransactions: TransfersTransaction[] | undefined
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

const TableCustomizedWithdraw = ({
  transfersTransactions,
}: TableCustomizedProps) => {
  const theme = useTheme()
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label='Transactions'>
        <TableRow>
          <StyledTableCell>status</StyledTableCell>
          <StyledTableCell align='left'>Methods</StyledTableCell>
          <StyledTableCell align='left'>Amount</StyledTableCell>
          <StyledTableCell align='left'>Type</StyledTableCell>
          <StyledTableCell align='left'>Date</StyledTableCell>
          <StyledTableCell align='right'>Receipt</StyledTableCell>
        </TableRow>
        <TableBody>
          {transfersTransactions
            ? transfersTransactions.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell
                    component='td'
                    scope='row'
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '20px',
                    }}
                  >
                    {TableRowStatus(
                      row.status as 'PENDING' | 'COMPLETED' | 'FAILED',
                    )}{' '}
                    {row.status}
                  </StyledTableCell>
                  <StyledTableCell align='left'>{row.livemode}</StyledTableCell>
                  <StyledTableCell align='left'>
                    {formatMoney(row.amount / 100)}
                  </StyledTableCell>
                  <StyledTableCell align='left'>
                    {row.sourceType}
                  </StyledTableCell>
                  <StyledTableCell align='left'>
                    {' '}
                    {row.createdAt
                      ? format(new Date(row.createdAt), 'dd/MM/yyyy HH:mm:ss')
                      : 'Data não disponível'}
                  </StyledTableCell>
                  {row.reversalsUrl ? (
                    <StyledTableCell align='right'>
                      <Link
                        href={row.reversalsUrl as string}
                        target='_blank'
                        rel='noopener noreferrer'
                        style={{
                          textDecoration: 'none',
                          color: theme.palette.text.primary,
                          opacity: 0.5,
                        }}
                      >
                        <ReceiptIcon />
                      </Link>
                    </StyledTableCell>
                  ) : (
                    <StyledTableCell align='right'></StyledTableCell>
                  )}
                </StyledTableRow>
              ))
            : ''}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableCustomizedWithdraw
