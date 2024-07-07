import { Box, BoxProps, Button, ButtonProps, styled } from '@mui/material'
import Image, { ImageProps } from 'next/image'

export const Container = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}))

export const ContainerClockBoxPiece = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  alignItems: 'center',
}))

export const BoxPieces = styled(Box)<BoxProps>(({ theme }) => ({
  flex: '1',
  height: '50px',
  borderRadius: theme.shape.borderRadius,
  marginLeft: '20px',
  backgroundColor: theme.palette.background.paper,
}))

export const ProfileContainer = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    justifyContent: 'space-between',
  },
}))

export const ActionButton = styled(Button)<ButtonProps>(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.getContrastText(theme.palette.background.paper),
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  marginLeft: '10px',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark),
  },
  '&:disabled': {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled,
  },
}))
export const BoxButtons = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  right: '10px',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    justifyContent: 'space-between',
  },
}))

export const ProfileImg = styled(Image)<ImageProps>(() => ({
  borderRadius: '50%',
  boxShadow: '0px 0px 8px 0px rgba(0,0,0,0.25)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}))

export const NameRagingContainer = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  flexDirection: 'column',
  fontWeight: 800,
  marginLeft: '10px',
  marginRight: '30px',
}))
