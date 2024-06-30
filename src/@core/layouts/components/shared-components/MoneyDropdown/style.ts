import {
  MenuItemProps,
  MenuProps,
  styled,
  Typography,
  TypographyProps,
} from '@mui/material'
import { CustomAvatarProps } from 'src/@core/components/mui/avatar/types'
import MuiMenu from '@mui/material/Menu'
import MuiMenuItem from '@mui/material/MenuItem'

// ** Third Party Components
import PerfectScrollbarComponent from 'react-perfect-scrollbar'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Styled Menu component
export const Menu = styled(MuiMenu)<MenuProps>(({ theme }) => ({
  '& .MuiMenu-paper': {
    width: 380,
    overflow: 'hidden',
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  '& .MuiMenu-list': {
    padding: 0,
  },
}))

// ** Styled MenuItem component
export const MenuItem = styled(MuiMenuItem)<MenuItemProps>(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  '&:not(:last-of-type)': {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  display: 'flex',
  justifyContent: 'space-between',
  gap: 20,
}))

// ** Styled PerfectScrollbar component
export const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  maxHeight: 349,
})

// ** Styled Avatar component
export const Avatar = styled(CustomAvatar)<CustomAvatarProps>({
  width: 38,
  height: 38,
  fontSize: '1.125rem',
})

// ** Styled component for the title in MenuItems
export const MenuItemTitle = styled(Typography)<TypographyProps>(
  ({ theme }) => ({
    fontWeight: 600,
    flex: '1 1 100%',
    overflow: 'hidden',
    fontSize: '0.875rem',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    marginBottom: theme.spacing(0.75),
  }),
)

// ** Styled component for the subtitle in MenuItems
export const MenuItemSubtitle = styled(Typography)<TypographyProps>({
  flex: '1 1 100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
})
