import { Box, BoxProps, styled } from '@mui/material'

export const RadioOpcionContainer = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  padding: '10px',
  margin: '2px 0',
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,

  display: 'flex',
  alignItems: 'center',
}))

export const RadioBox = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
}))

export const RadioSpan = styled(Box)<BoxProps>(() => ({
  fontSize: '12px',
  color: 'grey',
}))
