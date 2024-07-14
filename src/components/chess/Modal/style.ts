import { Avatar, Box, Button, Card, IconButton, styled } from '@mui/material'

export const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
  color: theme.palette.primary.contrastText,
  borderRadius: '10px',
  width: '300px',
  padding: '20px',
  position: 'relative',
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
