import {
  Box,
  BoxProps,
  CardContent,
  CardContentProps,
  Grid,
  GridProps,
  styled,
} from '@mui/material'
import Image, { ImageProps } from 'next/image'

export const LastResultsContainer = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  overflowX: 'auto',
  whiteSpace: 'nowrap',
  '&::-webkit-scrollbar': {
    height: '8px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: theme.palette.primary.main,
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: theme.palette.background.default,
    borderRadius: '4px',
  },
}))

export const TeamLogo = styled(Image)<ImageProps>(() => ({
  width: '30px',
  height: '30px',
  objectFit: 'contain',
  marginRight: '6px',
}))

export const GridContainer = styled(Grid)<GridProps>(() => ({
  width: '100vw',
  alignItems: 'center',
  justifyContent: 'center',
}))

export const CardContainer = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  border: 'none',
}))

export const CardContentStyle = styled(CardContent)<CardContentProps>(
  ({ theme }) => ({
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
  }),
)

export const BoxContainer = styled(Box)<BoxProps>(() => ({
  position: 'absolute',
  top: 20,
  left: 20,
}))
