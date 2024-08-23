import { styled, Box, BoxProps, Button, ButtonProps } from '@mui/material'
import Link, { LinkProps } from 'next/link'

export const AppBarContainer = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(5),
  display: 'flex',
  justifyContent: 'flex-start',
  borderRadius: theme.shape.borderRadius,
}))

export const ToolbarContainer = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  paddingLeft: theme.spacing(2),
  position: 'relative',
}))

export const ButtonLink = styled(Link)<LinkProps>(({ theme }) => ({
  textDecoration: 'none',
  marginRight: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.getContrastText(theme.palette.background.paper),
}))

export const ButtonBack = styled(Button)<ButtonProps>(({ theme }) => ({
  textDecoration: 'none',
  marginRight: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.getContrastText(theme.palette.background.paper),
  position: 'absolute',
  right: '10px',
}))
