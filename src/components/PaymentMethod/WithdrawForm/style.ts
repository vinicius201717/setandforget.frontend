import { Box, BoxProps, styled } from '@mui/material'

export const BoxInputFile = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  justifyContent: 'start-flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
}))

export const BottomInputFile = styled(Box)<BoxProps>(({ theme }) => ({
  marginRight: '20px',
  backgroundColor: theme.palette.primary.main,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  },
}))
