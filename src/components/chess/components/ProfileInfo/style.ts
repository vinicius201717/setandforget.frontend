import { Box, BoxProps, styled } from '@mui/material'
import Image, { ImageProps } from 'next/image'

export const Container = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}))

export const ProfileContainer = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',

  [theme.breakpoints.down('md')]: {
    width: '100%',
    justifyContent: 'space-between',
  },
}))

export const ProfileImg = styled(Image)<ImageProps>(() => ({
  borderRadius: '50%',
  boxShadow: '0px 0px 8px 0px rgba(0,0,0,0.25)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}))

export const NameRagingContainer = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  flexDirection: 'column',
  fontWeight: 800,
  marginLeft: '10px',
  marginRight: '30px',
}))
