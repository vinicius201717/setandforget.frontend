import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { ScrollableTableContainer, StyledTableRow } from './style'

interface Move {
  move: string
  response?: string
}

interface ChessMovesTableProps {
  moves: string[]
}

const transformMoves = (moves: string[]): Move[] => {
  const transformedMoves: Move[] = []
  if (moves) {
    for (let i = 0; i < moves.length; i += 2) {
      transformedMoves.push({
        move: moves[i],
        response: moves[i + 1] || '',
      })
    }
  }
  return transformedMoves
}

const ChessMovesTable: React.FC<ChessMovesTableProps> = ({ moves }) => {
  const transformedMoves = transformMoves(moves)

  return (
    <TableContainer component={ScrollableTableContainer}>
      {transformedMoves.length > 0 ? (
        <Table aria-label='chess moves table' stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Move</TableCell>
              <TableCell>Response</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transformedMoves.map((row: Move, index: number) => (
              <StyledTableRow key={index}>
                <TableCell component='th' scope='row'>
                  {row.move}
                </TableCell>
                <TableCell>{row.response}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        ' '
      )}
    </TableContainer>
  )
}

export default ChessMovesTable
