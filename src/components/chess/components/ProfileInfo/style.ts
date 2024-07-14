import { Box, BoxProps, Button, ButtonProps, styled } from '@mui/material'
import Image, { ImageProps } from 'next/image'

export const Container = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('lg')]: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100px',
  },
}))

export const ContainerClockBoxPiece = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.down('lg')]: {},
}))

export const BoxPieces = styled(Box)<BoxProps>(({ theme }) => ({
  width: 'auto',
  flex: '1',
  height: '50px',
  borderRadius: theme.shape.borderRadius,
  marginLeft: '20px',
  backgroundColor: theme.palette.background.paper,
  overflowX: 'auto',
  display: 'flex',

  '&::-webkit-scrollbar': {
    height: '8px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: theme.palette.background.default,
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  scrollbarWidth: 'thin',
  scrollbarColor: `${theme.palette.primary.main} ${theme.palette.background.default}`,
}))

export const ProfileContainer = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  [theme.breakpoints.down('lg')]: {
    marginTop: '-10px',
  },
}))

interface ActionButtonProps extends ButtonProps {
  isMobile?: boolean
}

export const ActionButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isMobile',
})<ActionButtonProps>(({ theme, isMobile }) => ({
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

  [theme.breakpoints.down('lg')]: {
    display: isMobile ? 'none' : 'block',
  },
}))

export const BoxButtons = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  right: '10px',
  [theme.breakpoints.down('lg')]: {
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
