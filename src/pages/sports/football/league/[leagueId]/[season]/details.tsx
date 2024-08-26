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
import LeagueStandings from 'src/components/football/footballLeague/Standings'
import LeaguePlayers from 'src/components/football/footballLeague/Players'
import LeagueTopScorers from 'src/components/football/footballLeague/TopScorers'

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

  const componentMap: { [key: string]: JSX.Element } = {
    STANDINGS: (
      <Card>
        <CardContent>
          <LeagueStandings />
        </CardContent>
      </Card>
    ),
    PLAYERS: (
      <Card>
        <CardContent>
          <LeaguePlayers />
        </CardContent>
      </Card>
    ),
    TOP_SCORERS: (
      <Card>
        <CardContent>
          <LeagueTopScorers />
        </CardContent>
      </Card>
    ),
    INJURIES: (
      <Card>
        <CardContent>
          <Typography variant='h6'>Injuries</Typography>
          <Typography>Exibe informações sobre lesões.</Typography>
        </CardContent>
      </Card>
    ),
    ODDS: (
      <Card>
        <CardContent>
          <Typography variant='h6'>Odds</Typography>
          <Typography>Exibe informações sobre probabilidades.</Typography>
        </CardContent>
      </Card>
    ),
    PREDICTIONS: (
      <Card>
        <CardContent>
          <Typography variant='h6'>Predictions</Typography>
          <Typography>Exibe previsões para os jogos.</Typography>
        </CardContent>
      </Card>
    ),
    TOP_ASSISTS: (
      <Card>
        <CardContent>
          <Typography variant='h6'>Top Assists</Typography>
          <Typography>Exibe os principais assistentes.</Typography>
        </CardContent>
      </Card>
    ),
    TOP_CARDS: (
      <Card>
        <CardContent>
          <Typography variant='h6'>Top Cards</Typography>
          <Typography>Exibe informações sobre cartões.</Typography>
        </CardContent>
      </Card>
    ),
  }

  const componentArray = Object.values(componentMap)

  const renderContent = () => {
    return (
      componentArray[tabValue] || (
        <Card>
          <CardContent>
            <Typography variant='h6'>Conteúdo Padrão</Typography>
            <Typography>Selecione uma aba para ver o conteúdo.</Typography>
          </CardContent>
        </Card>
      )
    )
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
