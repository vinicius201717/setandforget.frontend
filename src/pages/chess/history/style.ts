import { styled } from '@mui/material'

export const StyledAnchor = styled('a')(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main,
}))
