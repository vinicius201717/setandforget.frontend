import { Box, BoxProps, Button, ButtonProps, styled } from '@mui/material'
import Link from 'next/link'

export const HeaderContainer = styled(Box)<BoxProps>(() => ({
  display: 'flex',
}))

export const HeaderContainerBottom = styled(Box)<BoxProps>(() => ({
  width: '100px',
  height: '50px',
  display: 'flex',
  marginRight: '20px',
  justifyContent: 'space-evenly',
  alignItems: 'center',
}))

export const AlterButton = styled(Button)<ButtonProps>(({ theme }) => ({
  width: '40px',
  height: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: theme.shape.borderRadius,
}))

export const StyledAnchor = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main,
}))
