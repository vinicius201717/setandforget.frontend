import { formatMoney } from 'src/utils/format-money'
import { InitialNameAvatar, Profile } from './style'
import { InitialLetterName } from 'src/utils/initialFormatNameIcon'
import { formatTime } from 'src/utils/format-timer'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material'

interface DataProps {
  name: string
  duration: number
  amount: number
  avatar: string
}

export function GlobalPlayerProfile({
  name,
  duration,
  amount,
  avatar,
}: DataProps) {
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 500, cursor: 'pointer' }}
        aria-label='custom pagination table'
      >
        <TableBody>
          <TableRow>
            <TableCell component='th' scope='row'>
              {avatar ? (
                <Profile src={avatar} alt={name} />
              ) : (
                <InitialNameAvatar>{InitialLetterName(name)}</InitialNameAvatar>
              )}
            </TableCell>
            <TableCell style={{ width: 260 }} align='left'>
              {name}
            </TableCell>
            <TableCell style={{ width: 160 }} align='right'>
              {formatTime(duration)}
            </TableCell>
            <TableCell style={{ width: 160 }} align='right'>
              {formatMoney(amount)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
