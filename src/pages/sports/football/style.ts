import {
  Box,
  BoxProps,
  Card,
  CardProps,
  styled,
  Typography,
  TypographyProps,
} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

export const StyledCard = styled(Card)<CardProps>(({ theme }) => ({
  height: '50px',
  margin: theme.spacing(2, 0),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
}))
export const Header = styled(Typography)<TypographyProps>(({ theme }) => ({
  textAlign: 'center',
  marginTop: theme.spacing(2),
  fontSize: '2rem',
}))

export const LeagueImage = styled(Image)(({ theme }) => ({
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
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  paddingBottom: '200px',
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

export const ContainerFixture = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  height: '400px',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
}))
