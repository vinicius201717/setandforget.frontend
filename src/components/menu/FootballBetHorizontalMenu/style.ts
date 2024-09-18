import {
  styled,
  Box,
  BoxProps,
  Paper,
  PaperProps,
  Button,
  ButtonProps,
} from '@mui/material'
import Image, { ImageProps } from 'next/image'

export const AppBarContainer = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  maxHeight: '400px',
  padding: theme.spacing(5),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-end',
  position: 'relative',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
}))

export const FixtureContainer = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '40px',
  gap: theme.spacing(10),
}))

export const FixtureTeamContainer = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: theme.spacing(1),
}))

export const AppBoxContainer = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  overflowX: 'auto',
  width: '100%',
  padding: '10px 0',
  whiteSpace: 'nowrap',
  gap: theme.spacing(2),
  '&::-webkit-scrollbar': {
    height: '8px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: theme.palette.grey[300],
    borderRadius: '4px',
  },
}))

export const TeamLogo = styled(Image)<ImageProps>(({ theme }) => ({
  width: '50px',
  height: '50px',
  objectFit: 'contain',
  margin: theme.spacing(3),
}))

export const ButtonLink = styled(Button)<ButtonProps>(({ theme }) => ({
  marginRight: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,
  color: theme.palette.getContrastText(theme.palette.background.default),
  minWidth: '150px',
  flexShrink: 0,
  textAlign: 'center',
}))

export const Search = styled(Paper)<PaperProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  maxWidth: '100%',
  height: '40px',
  padding: theme.spacing(1),
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  my: 2,
  backgroundColor: theme.palette.background.default,
  borderRadius: '4px',
}))

export const SearchContainer = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
}))

export const ModalContentContainer = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  height: '70%',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  outline: 'none',
  overflowY: 'auto',

  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: theme.palette.grey[300],
    borderRadius: '4px',
  },
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

export const ModalButtonContainer = styled(Box)<BoxProps>(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  gap: '15px',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '20px',
}))
