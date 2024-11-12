import { Button, ButtonProps, styled } from '@mui/material'

export const BoxContainer = styled(Button)<ButtonProps>(({ theme }) => ({
  position: 'absolute',
  right: '0',
  top: '0',
  height: '100vh',
  width: '400px',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[24],
  padding: theme.spacing(4),
  pointerEvents: 'none',
}))
