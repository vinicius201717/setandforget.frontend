import {
  styled,
  Box,
  BoxProps,
  Typography,
  TypographyProps,
  Button,
  ButtonProps,
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
    flexBasis: '30%',
    minWidth: '300px',
    maxWidth: '100%',
    flexGrow: 0,
    flexShrink: 0,
  }),
)

export const FixtureContainerLive = styled(Box)<FixtureContainerProps>(
  ({ theme, prediction }) => ({
    padding: !prediction ? theme.spacing(2) : theme.spacing(1),
    width: '30%',
    minWidth: '300px',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing(9),
    position: 'relative',
    flexBasis: '33%',
    flexGrow: 0,
    flexShrink: 0,
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

export const ContainerTimerAndResultsInfo = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}))

export const LDateContainerDate = styled(Typography)<TypographyProps>(() => ({
  color: 'green',
  fontSize: '1rem',
}))

export const Vs = styled(Typography)<TypographyProps>(() => ({
  fontSize: '0.29rem',
}))

export const TypographyTeamName = styled(Typography)<TypographyProps>(() => ({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '120px',
}))

export const ContainerResult = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '50px',
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1),
}))

export const ItemResult = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1),
}))

export const OddsValues = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1),
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

export const LinkButtom = styled(Link)<LinkProps>(({ theme }) => ({
  cursor: 'pointer',
  textDecoration: 'none',
  fontSize: '0.7rem',
  color: theme.palette.getContrastText(theme.palette.background.default),
}))

export const OddsContainer = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,
}))

export const ButtonOdds = styled(Button)<ButtonProps>(({ theme }) => ({
  width: '100%',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.getContrastText(theme.palette.background.default),
  fontSize: '0.8rem',
  backgroundColor: theme.palette.background.default,
}))

export const OddValue = styled(Box)<BoxProps>(() => ({
  width: '33%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
}))
