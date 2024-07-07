import React from 'react'
import { Table, TableBody, TableCell, TableContainer } from '@mui/material'
import {
  ContainerTornEdges,
  ScrollableTableContainer,
  StyledTableRow,
} from './style'
import { formatMoney } from 'src/utils/format-money'
import { formatMoneyWithPayout } from 'src/utils/formatMoneyAfterPayout'
import { formatClock } from 'src/utils/format-clock-ticket'

interface TicketInfo {
  ticketId: string
  clock: number
  value: number
  payout: number
}

export const GamePlayTicketInfo: React.FC<TicketInfo> = ({
  ticketId,
  clock,
  value,
  payout,
}) => {
  return (
    <ContainerTornEdges>
      <TableContainer component={ScrollableTableContainer}>
        <Table aria-label='chess moves table' stickyHeader>
          <TableBody>
            <StyledTableRow>
              <TableCell component='th' scope='row'>
                Ticket ID: {ticketId}
              </TableCell>
            </StyledTableRow>
            <StyledTableRow>
              <TableCell component='th' scope='row'>
                Time: {formatClock(clock)}
              </TableCell>
            </StyledTableRow>
            <StyledTableRow>
              <TableCell component='th' scope='row'>
                Value: {formatMoney(value * 2)}
              </TableCell>
            </StyledTableRow>
            <StyledTableRow>
              <TableCell component='th' scope='row'>
                Prize Payout Details:{' '}
                {formatMoneyWithPayout(value * 2, 100 - payout)}
              </TableCell>
            </StyledTableRow>
            <StyledTableRow>
              <TableCell component='th' scope='row'>
                Payout: {payout}
              </TableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </ContainerTornEdges>
  )
}
