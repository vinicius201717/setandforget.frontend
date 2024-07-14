import { Paper, TableRow, styled } from '@mui/material'

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}))

export const ScrollableTableContainer = styled(Paper)(({ theme }) => ({
  height: '300px',
  maxHeight: '400px',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: theme.palette.background.default,
  },
}))
