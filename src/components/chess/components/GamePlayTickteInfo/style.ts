import { Box, BoxProps, styled, Paper, TableRow } from '@mui/material'

export const ContainerTornEdges = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  padding: '10px',
  backgroundColor: theme.palette.background.paper,
  position: 'relative',
  overflow: 'hidden',
  '::before, ::after': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '10px',
    background: `repeating-linear-gradient(
        100deg,
        ${theme.palette.background.paper},
        ${theme.palette.background.paper} 10px,
        ${theme.palette.background.default} 10px,
        ${theme.palette.background.default} 20px
      )`,
  },
  '::before': {
    top: 0,
    transform: 'translateY(-50%) rotate(180deg)',
  },
  '::after': {
    bottom: 0,
    transform: 'translateY(50%)',
  },
}))

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}))
export const ScrollableTableContainer = styled(Paper)({
  maxHeight: '400px',
})
