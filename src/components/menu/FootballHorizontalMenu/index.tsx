import React from 'react'
import HomeIcon from '@mui/icons-material/Home'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {
  AppBarContainer,
  ButtonBack,
  ButtonLink,
  ToolbarContainer,
} from './style'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { PlayerDataStatistics } from 'src/types/apps/footballType'
import { getFavoriteLeague } from 'src/pages/api/football/league/getFavoriteLeague'

const FootballHorizontalMenu = () => {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  const { data, error, isLoading } = useQuery<PlayerDataStatistics[]>({
    queryKey: ['userFavoriteLeague'],
    queryFn: () =>
      getFavoriteLeague(data.),
    enabled: !!leagueIdNumber && !!seasonNumber,
  })

  return (
    <AppBarContainer position='static'>
      <ToolbarContainer>
        <ButtonLink href={'/sports/football'}>
          <HomeIcon />
        </ButtonLink>
        <ButtonLink href={'/sports/football/leagues'}>League</ButtonLink>
        <ButtonLink href={'/sports/football/teams'}>Teams</ButtonLink>
        <ButtonBack onClick={handleBack}>
          <ArrowBackIcon />
        </ButtonBack>
      </ToolbarContainer>
    </AppBarContainer>
  )
}

export default FootballHorizontalMenu
