import { Box, BoxProps, styled } from '@mui/material'

export const Photo = styled(Box)<BoxProps>(() => ({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: 'white',
}))
