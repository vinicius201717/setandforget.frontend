import { Box, BoxProps, styled } from '@mui/material'

export const BoxContainer = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'absolute',
  right: '0',
  top: '0',
  height: '100vh',
  width: '400px',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[24],
  padding: theme.spacing(2),
  pointerEvents: 'none',
  display: 'flex',
  flexDirection: 'column',
}))

export const BoxTicket = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  height: '50px',
  marginTop: ' 10px',
  backgroundColor: theme.palette.background.default,
}))

export const TicketContainer = styled(Box)<BoxProps>(() => ({
  width: '100%',
  height: '90vh',
}))

export const FixtureOddTeams = styled(Box)<BoxProps>(() => ({
  width: '50%',
  height: '100%',
  display: 'flex',
  justifyContent: 'space-around',
}))

export const Teams = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  justifyContent: 'space-around',
}))
