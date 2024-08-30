import {
  Box,
  BoxProps,
  CardContent,
  CardContentProps,
  styled,
} from '@mui/material'
import Image, { ImageProps } from 'next/image'

interface BoxPropsWithPercent extends BoxProps {
  percent: string
  color: string
}

export const CardContentContainer = styled(CardContent)<CardContentProps>(
  ({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(3),
  }),
)

export const CardContentTeam = styled(CardContent)<CardContentProps>(() => ({
  display: 'flex',
  justifyContent: 'space-around',
}))

export const TeamsContent = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}))

export const BoxPercentContainer = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  borderRadius: 5,
  overflow: 'hidden',
}))

export const BoxPercent = styled(Box)<BoxPropsWithPercent>(
  ({ percent, color }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: percent,
    backgroundColor: color,
    padding: '10px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  }),
)

export const TeamLogo = styled(Image)<ImageProps>(() => ({
  width: '30px',
  height: '30px',
  objectFit: 'contain',
  marginRight: '6px',
}))
