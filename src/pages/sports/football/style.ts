import {
  Box,
  BoxProps,
  Card,
  CardProps,
  IconButton,
  IconButtonProps,
  styled,
  Typography,
  TypographyProps,
  Modal,
  ModalProps,
  alpha,
  FormControl,
  FormControlProps,
  ButtonProps,
  Button,
} from '@mui/material'
import Image, { ImageProps } from 'next/image'
import Link from 'next/link'

interface BetTeamContainerProps extends BoxProps {
  selected?: boolean
}

export const StyledCard = styled(Card)<CardProps>(({ theme }) => ({
  height: '50px',
  margin: theme.spacing(2, 0),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
}))

export const IconButtonStar = styled(IconButton)<IconButtonProps>(() => ({
  position: 'absolute',
  right: '10px',
}))

export const Header = styled(Typography)<TypographyProps>(({ theme }) => ({
  textAlign: 'center',
  marginTop: theme.spacing(2),
  fontSize: '2rem',
}))

export const LeagueImage = styled(Image)<ImageProps>(({ theme }) => ({
  marginLeft: '15px',
  borderRadius: theme.shape.borderRadius,
  maxWidth: '100%',
  width: '30px',
  height: '30px',
  objectFit: 'contain',
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

export const LinkLeague = styled(Link)(() => ({
  textDecoration: 'none',
}))

export const LeagueInfo = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(2),
}))

export const InfoLabel = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 'bold',
  marginRight: theme.spacing(1),
}))

export const ContainerFixture = styled(Box)<BoxProps>(() => ({
  width: '100%',
}))

export const TeamLogo = styled(Image)<ImageProps>(({ theme }) => ({
  width: '30px',
  height: '30px',
  objectFit: 'contain',
  margin: theme.spacing(3),
}))

export const BetTeamContainer = styled(Box)<BetTeamContainerProps>(
  ({ theme, selected }) => ({
    maxWidth: '400px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    backgroundColor: selected
      ? alpha(theme.palette.primary.main, 0.2)
      : theme.palette.background.default,
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',

    '&:hover': {
      backgroundColor: alpha(
        theme.palette.background.default,
        selected ? 0.8 : 0.5,
      ),
    },
  }),
)

export const ModalProdiction = styled(Modal)<ModalProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

export const ModalContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '90%',
  maxWidth: '1000px',
  height: '90vh',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[24],
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  outline: 'none',
  overflowY: 'auto',
  scrollbarWidth: 'thin',
  scrollbarColor: `${theme.palette.primary.main} ${theme.palette.background.default}`,
  '&::-webkit-scrollbar': {
    width: '7px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
  },
}))

export const FormControlStyle = styled(FormControl)<FormControlProps>(() => ({
  margin: 1,
  display: 'flex',
  flexDirection: 'row',
  maxWidth: '400px',
}))

export const BoxContainer = styled(Box)<BoxProps>(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  flexGrow: 1,
  marginRight: 10,
}))

export const ButtonCard = styled(Button)<ButtonProps>(() => ({
  padding: '0',
}))
