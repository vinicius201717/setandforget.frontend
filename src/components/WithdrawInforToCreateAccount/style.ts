import { Box, styled } from '@mui/material'
import Link from 'next/link'

export const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  '&:hover': {
    opacity: 0.9,
  },
}))

export const InfoContainer = styled(Box)({
  textAlign: 'left',
  marginTop: '20px',
})
