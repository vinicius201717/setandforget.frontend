import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { format } from 'date-fns'
import { Badge, useTheme, Pagination, TableContainer } from '@mui/material'
import Link from 'next/link'
import { StyledTableCell, StyledTableRow } from './style'
import { Result } from 'src/types/apps/chessTypes'
import { useAuth } from 'src/hooks/useAuth'
import { getChessResults } from 'src/pages/api/chess-result/chessResultGet'
import { formatMoney } from 'src/utils/format-money'
import { formatTime } from 'src/utils/format-timer'

const TableRowStatus = (resultType: string) => {
  if (resultType.includes('Draw')) {
    return (
      <>
        <Badge
          color='default'
          variant='dot'
          sx={{
            marginRight: '10px',
            '& .MuiBadge-badge': {
              right: 4,
              boxShadow: (theme) =>
                `0 0 0 2px ${theme.palette.background.paper}`,
              backgroundColor: '#808080',
            },
          }}
        />
        {'Draw'}
      </>
    )
  } else if (resultType === 'Checkmate') {
    return (
      <>
        <Badge
          color='success'
          variant='dot'
          sx={{
            marginRight: '10px',
            '& .MuiBadge-badge': {
              right: 4,
              boxShadow: (theme) =>
                `0 0 0 2px ${theme.palette.background.paper}`,
            },
          }}
        />
        {'Winner'}
      </>
    )
  } else if (resultType === 'Give up') {
    return (
      <>
        <Badge
          color='error'
          variant='dot'
          sx={{
            marginRight: '10px',
            '& .MuiBadge-badge': {
              right: 4,
              boxShadow: (theme) =>
                `0 0 0 2px ${theme.palette.background.paper}`,
            },
          }}
        />
        {'Loser'}
      </>
    )
  }
  return null
}

const ChessHistoryTableCustomized = () => {
  const theme = useTheme()
  const { user } = useAuth()

  const [page, setPage] = useState(1)
  const [chessResults, setChessResults] = useState<Result[]>([])
  const [totalCount, setTotalCount] = useState(0)

  const rowsPerPage = 10

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number,
  ) => {
    setPage(newPage)
  }

  useEffect(() => {
    getChessResults(page, rowsPerPage).then((response) => {
      if (response) {
        setChessResults(response.results)
        setTotalCount(response.totalCount)
      } else {
        setChessResults([])
        setTotalCount(0)
      }
    })
  }, [page])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label='Chess play'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Result</StyledTableCell>
            <StyledTableCell align='left'>Opponent</StyledTableCell>
            <StyledTableCell align='left'>Amount</StyledTableCell>
            <StyledTableCell align='left'>Duration</StyledTableCell>{' '}
            {/* Nova coluna */}
            <StyledTableCell align='left'>Result type</StyledTableCell>
            <StyledTableCell align='left'>Date</StyledTableCell>
            <StyledTableCell align='right'>Action</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {chessResults.length > 0 ? (
            chessResults.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell
                  component='td'
                  scope='row'
                  sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}
                >
                  {TableRowStatus(row.resultType)}
                </StyledTableCell>
                <StyledTableCell align='left'>
                  {user?.id === row.winnerId ? row.loser.name : row.winner.name}
                </StyledTableCell>
                <StyledTableCell align='left'>
                  {formatMoney(row.room.challenge.amount)}
                </StyledTableCell>
                <StyledTableCell align='left'>
                  {' '}
                  {formatTime(row.room.challenge.duration)}
                </StyledTableCell>
                <StyledTableCell align='left'>{row.resultType}</StyledTableCell>
                <StyledTableCell align='left'>
                  {row.created_at
                    ? format(new Date(row.created_at), 'dd/MM/yyyy HH:mm:ss')
                    : 'Date not available'}
                </StyledTableCell>
                <StyledTableCell align='right'>
                  <Link
                    href={`/chess/play/${row.room.id}`}
                    rel='noopener noreferrer'
                    style={{
                      textDecoration: 'none',
                      color: theme.palette.text.primary,
                      opacity: 0.5,
                    }}
                  >
                    <VisibilityIcon />
                  </Link>
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <StyledTableRow>
              <StyledTableCell colSpan={7} align='center'>
                {' '}
                {/* Agora colSpan é 7 */}
                No results found
              </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
      {totalCount > rowsPerPage && (
        <Pagination
          count={Math.ceil(totalCount / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          sx={{ padding: '16px' }}
        />
      )}
    </TableContainer>
  )
}

export default ChessHistoryTableCustomized
