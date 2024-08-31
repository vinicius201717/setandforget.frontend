import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useState } from 'react'
import FootballLeagueHorizontalMenu from 'src/components/menu/FootballLeagueHorizontalMenu'
import { LeagueProvider } from 'src/context/LeagueContext'
import LeagueLayout from 'src/layouts/components/leagueLayout'
import { getLeagueDetails } from 'src/pages/api/football/league/getLeagueDetails'
import { LeagueResponse } from 'src/types/apps/footballType'
import { ContainerProgress, ContentUnavailable } from '../style'
import {
  CircularProgress,
  Card,
  CardContent,
  Typography,
  useTheme,
} from '@mui/material'
import FootballLayout from 'src/layouts/components/footballLayout'
import LeagueStandings from 'src/components/football/footballLeague/Standings'
import LeaguePlayers from 'src/components/football/footballLeague/Players'
import LeagueTopScorers from 'src/components/football/footballLeague/TopScorers'
import LeagueTopAssists from 'src/components/football/footballLeague/TopAssists'
import LeagueTopCard from 'src/components/football/footballLeague/TopCard'
import LeagueInjuries from 'src/components/football/footballLeague/Injuries'
import LeagueFixtureComponent from 'src/components/football/footballLeague/Predictions'
import Image from 'next/image'

import noContent from 'public/images/pages/tree.png'

export default function DetailsPage() {
  const [tabValue, setTabValue] = useState<number>(0)
  const [options, setOptions] = useState<string[]>([])
  const { query } = useRouter()
  const leagueId = query.leagueId
    ? parseInt(query.leagueId as string, 10)
    : undefined
  const season = query.season ? parseInt(query.season as string, 10) : undefined

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleOptions = (options: string[]) => {
    setOptions(options)
  }

  const { data: league, isLoading } = useQuery<LeagueResponse[]>({
    queryKey: ['leaguePlayers', leagueId, season],
    queryFn: () => getLeagueDetails(leagueId as number, season as number),
    enabled: !!leagueId && !!season,
  })

  const theme = useTheme()

  const componentMap: { [key: string]: JSX.Element } = {
    STANDINGS: (
      <Card>
        <CardContent sx={{ padding: 0 }}>
          <LeagueStandings />
        </CardContent>
      </Card>
    ),
    PLAYERS: (
      <Card>
        <CardContent sx={{ padding: 0 }}>
          <LeaguePlayers />
        </CardContent>
      </Card>
    ),
    TOP_SCORERS: (
      <Card>
        <CardContent sx={{ padding: 0 }}>
          <LeagueTopScorers />
        </CardContent>
      </Card>
    ),
    TOP_ASSISTS: (
      <Card>
        <CardContent sx={{ padding: 0 }}>
          <LeagueTopAssists />
        </CardContent>
      </Card>
    ),
    INJURIES: (
      <Card>
        <CardContent sx={{ padding: 0 }}>
          <LeagueInjuries />
        </CardContent>
      </Card>
    ),
    ODDS: (
      <Card>
        <CardContent sx={{ padding: 0 }}>
          <Typography variant='h6'>Odds</Typography>
          <Typography>Exibe informações sobre probabilidades.</Typography>
        </CardContent>
      </Card>
    ),
    PREDICTIONS: (
      <Card
        sx={{
          backgroundColor: theme.palette.background.default,
          marginTop: '10px',
        }}
      >
        <CardContent
          sx={{ padding: 0, backgroundColor: theme.palette.background.default }}
        >
          <LeagueFixtureComponent />
        </CardContent>
      </Card>
    ),

    TOP_CARDS: (
      <Card>
        <CardContent sx={{ padding: 0 }}>
          <LeagueTopCard />
        </CardContent>
      </Card>
    ),
  }

  const renderContent = () => {
    return (
      componentMap[options[tabValue]] || (
        <Card>
          <ContentUnavailable>
            <Image
              src={noContent}
              alt='The content is unavailable.'
              width={150}
              height={150}
            />
            <Typography variant='h6'>The content is unavailable.</Typography>
          </ContentUnavailable>
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
                  handleOptions={handleOptions}
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
