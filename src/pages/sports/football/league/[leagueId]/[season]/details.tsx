import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useState } from 'react'
import FootballLeagueHorizontalMenu from 'src/components/menu/FootballLeagueHorizontalMenu'
import { LeagueProvider } from 'src/context/LeagueContext'
import LeagueLayout from 'src/layouts/components/leagueLayout'
import { getLeagueDetails } from 'src/pages/api/football/league/getLeagueDetails'
import { LeagueResponse } from 'src/types/apps/footballType'
import { ContainerProgress } from '../style'
import { CircularProgress, Card, CardContent, Typography } from '@mui/material'
import FootballLayout from 'src/layouts/components/footballLayout'
import LeagueStandings from 'src/components/football/footballLeague/standings'
import LeaguePlayers from 'src/components/football/footballLeague/players'

export default function DetailsPage() {
  const [tabValue, setTabValue] = useState<number>(0)
  const { query } = useRouter()
  const leagueId = query.leagueId
    ? parseInt(query.leagueId as string, 10)
    : undefined
  const season = query.season ? parseInt(query.season as string, 10) : undefined

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const { data: league, isLoading } = useQuery<LeagueResponse[]>({
    queryKey: ['leaguePlayers', leagueId, season],
    queryFn: () => getLeagueDetails(leagueId as number, season as number),
    enabled: !!leagueId && !!season,
  })

  const renderContent = () => {
    switch (tabValue) {
      case 0:
        return (
          <Card>
            <CardContent>
              <LeagueStandings />
            </CardContent>
          </Card>
        )
      case 1:
        return (
          <Card>
            <CardContent>
              <LeaguePlayers />
            </CardContent>
          </Card>
        )
      case 2:
        return (
          <Card>
            <CardContent>
              <Typography variant='h6'>Conteúdo do Tab 3</Typography>
              <Typography>Exibe a tabela de classificação.</Typography>
            </CardContent>
          </Card>
        )
      default:
        return (
          <Card>
            <CardContent>
              <Typography variant='h6'>Conteúdo Padrão</Typography>
              <Typography>Selecione uma aba para ver o conteúdo.</Typography>
            </CardContent>
          </Card>
        )
    }
  }

  return (
    <FootballLayout>
      <LeagueProvider leagueId={leagueId as number} season={season as number}>
        <LeagueLayout>
          {isLoading && !league ? (
            <ContainerProgress>
              <CircularProgress />
            </ContainerProgress>
          ) : (
            league && (
              <>
                <FootballLeagueHorizontalMenu
                  handleChange={handleChange}
                  tabValue={tabValue}
                  league={league[0]}
                />
                {renderContent()}
              </>
            )
          )}
        </LeagueLayout>
      </LeagueProvider>
    </FootballLayout>
  )
}
