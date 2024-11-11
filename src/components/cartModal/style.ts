import { Button, styled } from '@mui/material'

export const BoxContainer = styled(Button)(({ theme }) => ({
  position: 'absolute',
  bottom: '0',
  right: '0',
  height: '100vh',
  width: 400,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[24],
  padding: theme.spacing(4),
}))
