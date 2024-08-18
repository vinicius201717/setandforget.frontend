import { Box, Card, styled } from '@mui/material'
import { BoxProps } from '@mui/system'
import Image, { ImageProps } from 'next/image'

export const LeagueCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}))

export const SeasonBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}))

export const BoxHeader = styled(Box)<BoxProps>(() => ({
  width: '100%',
  display: 'flex',
}))

export const BoxText = styled(Box)<BoxProps>(() => ({
  height: '100%',
  marginLeft: '20px',
}))

export const LeagueLogo = styled(Image)<ImageProps>(() => ({
  width: '100px',
  height: '100px',
  objectFit: 'contain',
}))

export const InfoItem = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}))
