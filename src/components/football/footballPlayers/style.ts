import {
  styled,
  Card,
  Box,
  BoxProps,
  CardMedia,
  Modal,
  ModalProps,
  Tabs,
  TabsProps,
  TableCell,
  tableCellClasses,
  TableRow,
} from '@mui/material'
import Image, { ImageProps } from 'next/image'

export const ContainerProgress = styled(Box)<BoxProps>(() => ({
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingBottom: '300px',
}))

export const StyledCard = styled(Card)(() => ({
  borderRadius: '8px',
  overflow: 'hidden',
}))

export const StyledCardMedia = styled(CardMedia)(() => ({
  objectFit: 'cover',
  width: '100%',
  height: 'auto',
}))

export const ModalContainer = styled(Modal)<ModalProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

export const TabsContainer = styled(Tabs)<TabsProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  position: 'absolute',
  top: '10px',
  left: '10px',
}))

export const StyledModalBox = styled(Box)(({ theme }) => ({
  padding: '1rem',
  paddingTop: '4rem',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  width: '70%',
  maxWidth: '80vw',
  minHeight: '600px',
  position: 'relative',
  boxShadow: theme.shadows[10],
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  maxHeight: '90vh',
}))

export const BoxStatistics = styled(Box)<BoxProps>(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
}))

export const PlayerPhoto = styled(Image)<ImageProps>(() => ({
  width: '80px',
  height: '80px',
  objectFit: 'contain',
  marginRight: '6px',
  borderRadius: '50%',
  zIndex: '100',
}))

export const LeagueLogo = styled(Image)<ImageProps>(() => ({
  width: '80px',
  height: '80px',
  objectFit: 'contain',
  transform: 'translateX(-40px)',
}))

export const TeamLogo = styled(Image)<ImageProps>(() => ({
  width: '80px',
  height: '80px',
  objectFit: 'contain',
  marginRight: '6px',
  transform: 'translateX(40px)',
}))

export const TopTeamPlayer = styled(Box)<BoxProps>(() => ({
  width: '100%',
  height: '100px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
}))

export const BoxStatisticsInfo = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  overflowY: 'auto',
  maxHeight: '90vh',

  '::-webkit-scrollbar': {
    width: '8px',
  },
  '::-webkit-scrollbar-track': {
    backgroundColor: '#f1f1f1',
    borderRadius: '10px',
  },
  '::-webkit-scrollbar-thumb': {
    backgroundColor: '#888',
    borderRadius: '10px',
  },
  '::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '#555',
  },
}))

export const StyledContainerProgress = styled(Box)<BoxProps>(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
}))

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },

  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))
