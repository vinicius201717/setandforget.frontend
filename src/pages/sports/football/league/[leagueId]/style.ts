import {
  Box,
  Card,
  CardContent,
  CardContentProps,
  Chip,
  ChipProps,
  styled,
  TableCell,
  TableCellProps,
} from '@mui/material'
import { BoxProps } from '@mui/system'
import Image, { ImageProps } from 'next/image'
import Link, { LinkProps } from 'next/link'

interface InfoItemProps extends BoxProps {
  result: string
  isLast: boolean
}

export const LeagueCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}))

export const ContentUnavailable = styled(CardContent)<CardContentProps>(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '30px',
}))

export const SeasonBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}))

export const ContainerProgress = styled(Box)<BoxProps>(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  paddingBottom: '300px',
}))

export const BoxHeader = styled(Box)<BoxProps>(() => ({
  width: '100%',
  display: 'flex',
}))

export const BoxText = styled(Box)<BoxProps>(() => ({
  height: '100%',
  marginLeft: '20px',
}))

export const LeagueLogo = styled(Image)<ImageProps>(() => ({
  width: '100px',
  height: '100px',
  objectFit: 'contain',
}))

export const TeamLogo = styled(Image)<ImageProps>(() => ({
  width: '30px',
  height: '30px',
  objectFit: 'contain',
  marginRight: '6px',
}))

export const PlayerPhoto = styled(Image)<ImageProps>(() => ({
  width: '30px',
  height: '30px',
  objectFit: 'contain',
  marginRight: '6px',
}))

export const TeamCellClube = styled(TableCell)<TableCellProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}))

export const BoxForm = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: theme.spacing(1),
}))

export const ChipIcon = styled(Chip)<ChipProps>(() => ({
  width: 24,
  height: 24,
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 0,
  '.MuiChip-icon': {
    margin: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

export const GetIcon = styled(Box)<InfoItemProps>(
  ({ theme, result, isLast }) => ({
    width: isLast ? 22 : 18,
    height: isLast ? 22 : 18,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    backgroundColor:
      result === 'W'
        ? theme.palette.success.main
        : result === 'L'
          ? theme.palette.error.main
          : theme.palette.grey[500],
    border: isLast ? `2px solid white` : 'none',
    fontSize: '1.2rem',
  }),
)

export const InfoItem = styled(Box)<BoxProps>(({ theme }) => ({
  marginBottom: theme.spacing(1),
}))

export const LinkNext = styled(Link)<LinkProps>(() => ({
  textDecoration: 'none',
}))
