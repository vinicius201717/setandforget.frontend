import React from 'react'
import { Typography, CircularProgress, Container } from '@mui/material'
import { ContainerHeader, ContainerProgress, LeagueLogo } from './style'
import { useLeagueContext } from 'src/context/LeagueContext'

interface LeagueLayoutProps {
  children: React.ReactNode
}

export default function LeagueLayout({ children }: LeagueLayoutProps) {
  const { leagueDetails, isLoading, error } = useLeagueContext()

  if (isLoading) {
    return (
      <ContainerProgress>
        <CircularProgress />
      </ContainerProgress>
    )
  }

  if (error) {
    return <div>Error loading league data</div>
  }

  if (!leagueDetails || leagueDetails.length === 0) {
    return <div>No data available</div>
  }

  return (
    <Container>
      <ContainerHeader sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
        <LeagueLogo
          src={leagueDetails[0].league.logo}
          alt='League Logo'
          width={80}
          height={80}
        />
        <Typography variant='h6'>{leagueDetails[0].league.name}</Typography>
      </ContainerHeader>
      {children}
    </Container>
  )
}
