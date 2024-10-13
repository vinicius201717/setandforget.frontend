import {
  styled,
  Box,
  BoxProps,
  Button,
  ButtonProps,
  ListItem,
  ListItemProps,
  Popover,
  PopoverProps,
} from '@mui/material'
import Image, { ImageProps } from 'next/image'
import Link, { LinkProps } from 'next/link'

export const AppBarContainer = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(5),
  display: 'flex',
  justifyContent: 'flex-start',
  borderRadius: theme.shape.borderRadius,
}))

export const ToolbarContainer = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  paddingLeft: theme.spacing(2),
  position: 'relative',
}))

export const ButtonLink = styled(Link)<LinkProps & { isSelected?: boolean }>(
  ({ theme, isSelected }) => ({
    textDecoration: 'none',
    marginRight: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(2),
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: isSelected
      ? theme.palette.primary.main
      : theme.palette.background.paper,
    color: isSelected
      ? theme.palette.getContrastText(theme.palette.primary.main)
      : theme.palette.getContrastText(theme.palette.background.paper),
  }),
)

export const ButtonBack = styled(Button)<ButtonProps>(({ theme }) => ({
  textDecoration: 'none',
  marginRight: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.getContrastText(theme.palette.background.paper),
  position: 'absolute',
  right: '10px',
}))

export const LeagueImage = styled(Image)<ImageProps>(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  maxWidth: '100%',
  width: '30px',
  height: '30px',
  objectFit: 'contain',
}))

export const ListItemMenu = styled(ListItem)<ListItemProps>(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  transition: 'background-color 0.3s ease',
  position: 'relative',
  backgroundColor: theme.palette.background.paper,
  cursor: 'pointer',
}))

export const BoxContainer = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  width: 70,
  height: 30,
}))

export const PopoverComponent = styled(Popover)<PopoverProps>(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  transition: 'background-color 0.3s ease',
  marginTop: '10px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2) !important',
}))
