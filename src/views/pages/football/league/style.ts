import { Box, styled } from '@mui/material'
import Image from 'next/image'

export const LeagueImage = styled(Image)(({ theme }) => ({
  height: 'auto',
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(2),
}))

export const InfoBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1, 0),
}))
