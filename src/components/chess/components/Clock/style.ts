import { Box, BoxProps, styled } from '@mui/material'

export const Container = styled(Box)<BoxProps>(({ theme }) => ({
  maxWidth: '200px',
  width: 'fit-content',
  backgroundColor: theme.palette.secondary.dark,
  borderRadius: '4px',
  fontSize: '20px',
  fontWeight: '600',
  padding: '10px',
  marginTop: '20px',
  marginLeft: '10px',
  color: theme.palette.primary.contrastText,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',

  [theme.breakpoints.down('md')]: {
    margin: '0',
  },
}))
