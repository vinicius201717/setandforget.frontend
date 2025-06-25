import { Box, BoxProps, styled } from '@mui/material'

export const ContainerFixtureLive = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  gap: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
}))
