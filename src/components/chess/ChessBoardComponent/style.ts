/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, styled } from '@mui/material'
import { BoxProps } from '@mui/system'

interface ContainerMobileChessDisplayProps extends BoxProps {
  me?: boolean
}

export const Container = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.down('lg')]: {
    height: 'auto',
    display: 'block',
  },
}))
export const ContainerProfile = styled(Box)<BoxProps>(({ theme }) => ({
  height: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  marginLeft: '20px',
  padding: '10px',
  borderRadius: theme.shape.borderRadius,

  boxShadow: theme.shadows[15],
  flex: 1,
  [theme.breakpoints.down('lg')]: {
    display: 'none',
  },
}))

export const ContainerMobileChessDisplay = styled(Box)<BoxProps>(
  ({ theme }) => ({
    display: 'none',
    [theme.breakpoints.down('lg')]: {
      height: '70px',
      borderRadius: theme.shape.borderRadius,
      display: 'flex',
      margin: '10px 0 40px 0',
    },
  }),
)

export const ContainerMobile = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('lg')]: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    justifyContent: 'center',
  },
}))

export const ContainerMobileChess = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('lg')]: {
    height: 'auto',
  },
}))
