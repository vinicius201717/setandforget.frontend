import {
  styled,
  Box,
  BoxProps,
  Typography,
  TypographyProps,
} from '@mui/material'
import Image from 'next/image'
import Link, { LinkProps } from 'next/link'

export const LeagueFixtureContainer = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  margin: theme.spacing(5),
  display: 'flex',
  flexDirection: 'column',
}))

export const LeagueFixtureContent = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  gap: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}))

export const FixtureContainer = styled(Box)<BoxProps>(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  paddingTop: theme.spacing(9),
  position: 'relative',
}))

export const FixtureTeamsContainer = styled(Box)<BoxProps>(({ theme }) => ({
  flex: '0 0 350px',
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
}))

export const BottomLink = styled(Link)<LinkProps>(({ theme }) => ({
  textDecoration: 'none',
  marginRight: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.getContrastText(theme.palette.background.paper),
}))

export const LogoNameContainer = styled(Box)<BoxProps>(() => ({
  width: '175px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}))

export const DateContainer = styled(Typography)<TypographyProps>(() => ({
  position: 'absolute',
  right: '5px',
  top: '5px',
  fontSize: '0.8rem',
}))

export const TeamImage = styled(Image)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  maxWidth: '100%',
  width: '30px',
  height: '30px',
  objectFit: 'contain',
}))

export const OddsContaier = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  height: '40px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,
}))
