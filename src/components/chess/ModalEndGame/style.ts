import { Box, Card, IconButton, styled } from '@mui/material'

export const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.primary.contrastText,
  borderRadius: '10px',
  textAlign: 'center',
  padding: '20px',
  position: 'relative',
}))

export const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '10px',
  right: '10px',
  color: theme.palette.primary.contrastText,
}))

export const DataGame = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}))
