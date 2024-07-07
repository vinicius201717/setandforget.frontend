import { Box, styled } from '@mui/material'
import { BoxProps } from '@mui/system'

export const Container = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.down('md')]: {
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
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}))

export const ContainerMobileChess = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
})

export const ContainerMobileChessDisplay = styled(Box)<BoxProps>(
  ({ theme }) => ({
    display: 'none',

    [theme.breakpoints.down('md')]: {
      display: 'flex',
    },
  }),
)

export const ContainerMobile = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
}))
