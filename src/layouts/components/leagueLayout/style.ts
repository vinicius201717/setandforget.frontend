import { Box, BoxProps, styled } from '@mui/material'
import Image, { ImageProps } from 'next/image'

export const LeagueLogo = styled(Image)<ImageProps>(() => ({
  width: '100px',
  height: '100px',
  objectFit: 'contain',
}))

export const ContainerHeader = styled(Box)<BoxProps>(({ theme }) => ({
  marginBottom: 2,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(5),
}))

export const ContainerProgress = styled(Box)<BoxProps>(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  paddingBottom: '300px',
}))
