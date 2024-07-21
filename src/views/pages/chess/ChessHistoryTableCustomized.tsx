import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { format } from 'date-fns'
import { Badge, useTheme, Pagination } from '@mui/material'
import Link from 'next/link'
// import { formatMoney } from 'src/utils/format-money'
import { StyledTableCell, StyledTableRow } from './style'
import { RoomResultWithUserName } from 'src/types/apps/chessTypes'
import { useAuth } from 'src/hooks/useAuth'
import { getChessResults } from 'src/pages/api/chess-result/chessResultGet'

const TableRowStatus = (result: string) => {
  if (result.includes('Draw')) {
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
  } else if (result === 'Checkmate') {
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
  } else if (result === 'Give up') {
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
}

const ChessHistoryTableCustomized = () => {
  const theme = useTheme()
  const { user } = useAuth()

  const [page, setPage] = useState(1)
  const [chessResults, setChessResults] = useState<RoomResultWithUserName[]>()
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
      }
    })
  }, [page])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label='Chess play'>
        <TableRow>
          <StyledTableCell>Result</StyledTableCell>
          <StyledTableCell align='left'>Opponent</StyledTableCell>
          <StyledTableCell align='left'>Amount</StyledTableCell>
          <StyledTableCell align='left'>Result type</StyledTableCell>
          <StyledTableCell align='left'>Opponent</StyledTableCell>
          <StyledTableCell align='right'>Action</StyledTableCell>
        </TableRow>
        <TableBody>
          {chessResults && chessResults.length > 0 ? (
            chessResults.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell
                  component='td'
                  scope='row'
                  sx={{
                    alignItems: 'center',
                    gap: '20px',
                  }}
                >
                  {TableRowStatus(row.resultType)}
                </StyledTableCell>
                <StyledTableCell align='left'>
                  {user?.id === row.winnerId ? row.loser.name : row.winner.name}
                </StyledTableCell>
                <StyledTableCell align='left'>
                  {/* {formatMoney(row.amount / 100)} */}
                </StyledTableCell>
                <StyledTableCell align='left'>{row.resultType}</StyledTableCell>
                <StyledTableCell align='left'>
                  {row.created_at
                    ? format(new Date(row.created_at), 'dd/MM/yyyy HH:mm:ss')
                    : 'Data não disponível'}
                </StyledTableCell>
                <StyledTableCell align='right'>
                  <Link
                    href={`/chess/play/${row.id}`}
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
              <StyledTableCell colSpan={6} align='center'>
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
