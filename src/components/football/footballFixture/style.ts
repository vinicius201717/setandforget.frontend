import {
  styled,
  Box,
  BoxProps,
  Typography,
  TypographyProps,
} from '@mui/material'
import Image from 'next/image'
import Link, { LinkProps } from 'next/link'

interface FixtureContainerProps extends BoxProps {
  prediction: boolean
}

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

export const FixtureContainer = styled(Box)<FixtureContainerProps>(
  ({ theme, prediction }) => ({
    padding: !prediction ? theme.spacing(2) : theme.spacing(1),
    marginBottom: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing(9),
    position: 'relative',
  }),
)

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

export const DateContainerDate = styled(Typography)<TypographyProps>(() => ({
  position: 'absolute',
  left: '5px',
  top: '5px',
  fontSize: '0.8rem',
}))

export const LDateContainerDate = styled(Typography)<TypographyProps>(() => ({
  position: 'absolute',
  left: '5px',
  top: '5px',
  color: 'green',
  fontSize: '1rem',
}))

export const ViewContainer = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'absolute',
  right: '5px',
  top: '5px',
  fontSize: '0.8rem',
  transition: '0.3s',
  cursor: 'pointer',
  width: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 10,

  '& > :first-child': {
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },

  '& > :nth-child(2)': {
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.error.main,
    },
  },
}))

export const TeamImage = styled(Image)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  maxWidth: '100%',
  width: '30px',
  height: '30px',
  objectFit: 'contain',
}))

export const LinkButtom = styled(Link)<LinkProps>(() => ({
  cursor: 'pointer',
  textDecoration: 'none',
}))

export const OddsContainer = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  height: '40px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,
}))
