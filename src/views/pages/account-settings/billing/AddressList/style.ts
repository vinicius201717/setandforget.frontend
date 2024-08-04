import { Box, BoxProps, styled, Typography } from '@mui/material'

export const AddressBox = styled(Box)<BoxProps>(({ theme }) => ({
  padding: '16px',
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  transition: 'box-shadow 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
}))

export const AddressTitle = styled(Typography)<BoxProps>(() => ({
  fontSize: '1.2rem',
  fontWeight: 'bold',
  marginBottom: '8px',
}))

export const AddressDetails = styled(Typography)<BoxProps>(() => ({
  fontSize: '1rem',
  color: '#8f8f8f',
  marginBottom: '4px',
}))
