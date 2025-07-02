import { Avatar, Box, Button, IconButton, styled } from '@mui/material'

export const StyledCard = styled('div')(({ theme }) => ({
  width: 360,
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 4,
  padding: '24px 20px',
  position: 'relative',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
}))

export const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '10px',
  right: '10px',
  color: theme.palette.primary.contrastText,
}))

export const AvatarContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '10px',
}))

export const AvatarStyled = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  marginRight: '10px',
}))

export const PlayButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  fontWeight: 'bold',
  marginTop: '20px',
  width: '100%',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}))
