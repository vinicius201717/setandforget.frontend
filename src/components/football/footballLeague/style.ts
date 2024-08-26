import {
  Box,
  BoxProps,
  Chip,
  ChipProps,
  styled,
  TableCell,
  TableCellProps,
} from '@mui/material'
import Image, { ImageProps } from 'next/image'

interface InfoItemProps extends BoxProps {
  result: string
  isLast: boolean
}

export const ContainerProgress = styled(Box)<BoxProps>(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  paddingBottom: '300px',
}))

export const TeamLogoContainer = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '2',
  margin: '20px',
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
  borderRadius: '10%',
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
