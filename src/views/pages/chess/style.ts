import {
  TableCell,
  TableCellProps,
  TableRow,
  TableRowProps,
  styled,
  tableCellClasses,
} from '@mui/material'

export const StyledTableCell = styled(TableCell)<TableCellProps>(
  ({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }),
)

export const StyledTableRow = styled(TableRow)<TableRowProps>(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },

  // hide last border
  '&:last-of-type td, &:last-of-type th': {
    border: 0,
  },
}))
