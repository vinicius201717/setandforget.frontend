import { Box, BoxProps, styled } from '@mui/material'
import Link from 'next/link'

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

export const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  '&:hover': {
    opacity: 0.9,
  },
}))

export const InfoContainer = styled(Box)({
  textAlign: 'left',
  marginTop: '20px',
})
