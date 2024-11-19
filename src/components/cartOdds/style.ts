import {
  Box,
  BoxProps,
  styled,
  Typography,
  TypographyProps,
} from '@mui/material'

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
  height: '70px',
  marginTop: ' 10px',
  backgroundColor: theme.palette.background.default,
  display: 'flex',
}))

export const TicketContainer = styled(Box)<BoxProps>(() => ({
  width: '100%',
  height: '90vh',
}))

export const FixtureOdd = styled(Box)<BoxProps>(() => ({
  width: '50%',
  height: '100%',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  position: 'relative',
}))

export const Team = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}))

export const InfoOdd = styled(Typography)<TypographyProps>(() => ({
  position: 'absolute',
  bottom: '2px',
  right: '5px',
}))

export const Odd = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: '0.7rem',
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
}))
