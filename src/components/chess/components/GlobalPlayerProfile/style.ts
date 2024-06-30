import { Box, styled } from '@mui/material'

export const Profile = styled('img')({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
})

export const InitialNameAvatar = styled(Box)(({ theme }) => ({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))
