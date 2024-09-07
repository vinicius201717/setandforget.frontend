import {
  styled,
  Box,
  BoxProps,
  ListItem,
  ListItemProps,
  List,
  ListProps,
} from '@mui/material'
import Image, { ImageProps } from 'next/image'

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

export const LeagueImage = styled(Image)<ImageProps>(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  maxWidth: '100%',
  width: '30px',
  height: '30px',
  objectFit: 'contain',
}))

export const ListContainer = styled(List)<ListProps>(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  padding: 0,
  overflowX: 'auto',
  whiteSpace: 'nowrap',
  '::-webkit-scrollbar': {
    height: '8px',
  },
  '::-webkit-scrollbar-thumb': {
    backgroundColor: '#888',
    borderRadius: '10px',
  },
  '::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '#555',
  },
}))

export const ListItemContainer = styled(ListItem)<ListItemProps>(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '150px',
  padding: '1rem',
  cursor: 'pointer',
  flexShrink: 0,
}))
