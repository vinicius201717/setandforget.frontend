import React from 'react'
import {
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Container,
} from '@mui/material'
import { ContainerHeader, ContainerProgress, LeagueLogo } from './style'
import FootballLeagueHorizontalMenu from 'src/components/menu/FootballLeagueHorizontalMenu'
import { useQuery } from '@tanstack/react-query'
import { getLeagueDetails } from 'src/pages/api/football/league/getLeagueDetails'
import { LeagueResponse } from 'src/types/apps/footballType'

interface LeagueLayoutProps {
  children: React.ReactNode
  season: number
  leagueId: number
}

export default function LeagueLayout({
  children,
  leagueId,
  season,
}: LeagueLayoutProps) {
  const {
    data: leagueDetails,
    error,
    isLoading,
  } = useQuery<LeagueResponse[]>({
    queryKey: ['leagueDetails', leagueId, season],
    queryFn: () => getLeagueDetails(leagueId, season),
    enabled: !!leagueId && !!season,
  })

  if (isLoading) {
    return (
      <ContainerProgress>
        <CircularProgress />
      </ContainerProgress>
    )
  }

  if (error) {
    console.error('Error fetching league data:', error)
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
      <FootballLeagueHorizontalMenu league={leagueDetails[0]} season={season} />
      <Card sx={{ marginBottom: 2, marginTop: 5 }}>
        <CardContent>{children}</CardContent>
      </Card>
    </Container>
  )
}
