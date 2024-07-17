import { Box, styled, TableContainer, TableContainerProps } from '@mui/material'

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

export const StyledTableContainer = styled(TableContainer)<TableContainerProps>(
  ({ theme }) => ({
    '&::-webkit-scrollbar': {
      height: '8px',
      backgroundColor: theme.palette.divider,
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '20px',
      backgroundColor: theme.palette.primary.main,
      border: `2px solid ${theme.palette.background.paper}`,
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '10px',
      backgroundColor: theme.palette.background.paper,
    },
  }),
)
