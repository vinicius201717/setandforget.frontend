import { Box, BoxProps, Button, ButtonProps, styled } from '@mui/material'
import Link, { LinkProps } from 'next/link'
import React from 'react'

interface ButtonIconProps extends ButtonProps {
  isActive?: boolean
}

interface BoxChildrenProps extends BoxProps {
  isActive?: boolean
}

export const Container = styled(Box)<BoxProps>(({ theme }) => ({
  fontWeight: '900',
  color: theme.palette.primary.contrastText,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
}))

export const ContainerChildren = styled(Box)<BoxChildrenProps>(
  ({ theme, isActive }) => ({
    width: '45%',
    height: '200px',
    color: theme.palette.mode === 'dark' ? '#E7E3FCDE' : '#3A3541DE',

    [theme.breakpoints.down('md')]: {
      width: '100%',
      display: isActive ? 'block' : 'none',
    },
  }),
)

export const FormContainer = styled(Box)(() => ({
  width: '100%',
}))

export const ContainerRadio = styled(Box)<BoxProps>(() => ({
  width: '100%',
  flex: 1,
  display: 'flex',
  justifyContent: 'space-start',
  gap: '10px',
  flexWrap: 'wrap',
  marginBottom: '20px',
}))

export const ContainerGlobalPlayers = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  maxHeight: 'calc(100vh - 400px)',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '8px',
  padding: '10px',
  overflowY: 'auto',

  '&::-webkit-scrollbar': {
    width: '7px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '10px',
  },

  [theme.breakpoints.down('md')]: {},
}))

export const OptionButtonChange = styled(Box)<BoxProps>(({ theme }) => ({
  width: '180px',
  height: '80px',
  backgroundColor: theme.palette.background.paper,
  position: 'fixed',
  bottom: '100px',
  borderRadius: '50px',
  left: '50%',
  padding: '10px',
  transform: 'translateX(-50%)',

  display: 'none',
  justifyContent: 'space-around',
  alignItems: 'center',

  [theme.breakpoints.down('md')]: {
    display: 'flex',
  },
}))

export const ButtonIcon = React.memo(
  styled(Button)<ButtonIconProps>(({ theme, isActive }) => ({
    width: '30%',
    height: '100%',
    borderRadius: '45%',
    backgroundColor: isActive
      ? theme.palette.primary.main
      : theme.palette.background.default,
    color: '#FFF',
    '&:hover': {
      backgroundColor: isActive
        ? theme.palette.primary.dark
        : theme.palette.background.paper,
    },
  })),
)

export const HeaderGlobalOptions = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}))

export const LinkHistory = styled(Link)<LinkProps>(({ theme }) => ({
  color: theme.palette.getContrastText(theme.palette.background.default),
  textDecoration: 'none',
  margin: '5px',
}))
