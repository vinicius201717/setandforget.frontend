// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'

import { format } from 'date-fns'
import { StyledTableCell, StyledTableRow } from './style'
import { Badge } from '@mui/material'
import { formatMoney } from 'src/utils/format-money'
import { Withdraw } from 'src/context/types'

interface TableCustomizedProps {
  withdraw: Withdraw[] | undefined
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

const TableCustomizedWithdraw = ({ withdraw }: TableCustomizedProps) => {
  return (
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
          {withdraw && withdraw.length > 0 ? (
            withdraw.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align='left'>
                  {row.id || 'ID not available'}
                </StyledTableCell>
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
                    (row.status as 'PENDING' | 'PAID' | 'FAILED') || 'FAILED',
                  )}
                  {row.status || 'FAILED'}
                </StyledTableCell>
                <StyledTableCell align='left'>
                  {formatMoney(row.amount / 100)}
                </StyledTableCell>
                <StyledTableCell align='left'>
                  {row.pixKey || 'No pix key'}
                </StyledTableCell>
                <StyledTableCell align='left'>
                  {pixKeyTypeMap[row.pixKeyType] || 'No type'}
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
  )
}

export default TableCustomizedWithdraw
