import React, { useState } from 'react'
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Divider,
} from '@mui/material'

import FootballLayout from 'src/layouts/components/footballLayout'
import { FormationPieChart } from 'src/components/football/footballTeam/Formation'
import PenaltyStats from 'src/components/football/footballTeam/Penalty'
import LastResults from 'src/components/football/footballTeam/LastResults'
import GoalsForGoalsAgainst from 'src/components/football/footballTeam/GoalsForGoalsAgainst'
import { CardDistribution } from 'src/components/football/footballTeam/CardDistribution'
import GoalsFormAgainst from 'src/components/football/footballTeam/GoalsForAgainst'
import { BiggestStreaks } from 'src/components/football/footballTeam/BiggestStreaks'
import { BiggestWins } from 'src/components/football/footballTeam/BiggestWins'
import { BiggestLoses } from 'src/components/football/footballTeam/BiggestLoses'
import { FaliedToScore } from 'src/components/football/footballTeam/FaliedToScore'
import { CleanSheets } from 'src/components/football/footballTeam/CleanSheets'
import { Fixture } from 'src/components/football/footballTeam/Fixtures'
import { GoalsDistributionByMinutes } from 'src/components/football/footballTeam/GoalsDistributionByMinute'

import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import {
  FootballTeamStatistics,
  TeamInformationInterface,
} from 'src/types/apps/footballType/teamType'
import { ContainerProgress } from 'src/components/football/footballLeague/style'
import {
  Chart,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  BarController,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js'
import { ButtonLink, TeamLogo } from '../../style'
import { getTeamStatistics } from 'src/pages/api/football/team/getTeamStatistic'
import { getTeamInformation } from 'src/pages/api/football/team/getTeamInformation'
import TeamCard from 'src/components/football/footballTeam/TeamInformation'
import { getPlayerSquad } from 'src/pages/api/football/player/getPlayersSquad'
import { PlayersResponse } from 'src/types/apps/footballType/playersType'
import PlayersList from 'src/components/football/footballPlayers'

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  ArcElement,
  PointElement,
  LineElement,
)

export default function TeamDetails() {
  const { query } = useRouter()

  const [enabledManualQuery, setEnabledManualQuery] = useState<boolean>(false)
  const [changePage, setChangePage] = useState<1 | 2 | 3>(1)
  const leagueId = parseInt(query.leagueId as string, 10)
  const season = parseInt(query.season as string, 10)
  const teamId = parseInt(query.teamId as string, 10)

  const { data, isLoading } = useQuery<FootballTeamStatistics>({
    queryKey: ['teamStatistic', leagueId, season, teamId],
    queryFn: () => getTeamStatistics(teamId, leagueId, season),
    enabled: !!leagueId && !!season && !!teamId,
  })

  const {
    data: playerSquad,
    isLoading: isPlayerSquadLoading,
    refetch: squadRefetch,
  } = useQuery<PlayersResponse[]>({
    queryKey: ['teamInformation', teamId],
    queryFn: () => getPlayerSquad(teamId),
    enabled: enabledManualQuery,
  })

  const {
    data: teamInformation,
    isLoading: isInformationLoading,
    refetch: informationRefetch,
  } = useQuery<TeamInformationInterface[]>({
    queryKey: ['teamInformation', leagueId, season, teamId],
    queryFn: () => getTeamInformation(teamId, leagueId, season),
    enabled: enabledManualQuery,
  })

  const handleTeamStatistics = () => {
    handleChangePage(1)
  }

  const handleTeamInformation = () => {
    setEnabledManualQuery(true)
    informationRefetch()
    handleChangePage(2)
  }

  const handleSquad = () => {
    setEnabledManualQuery(true)
    squadRefetch()
    handleChangePage(3)
  }

  const handleChangePage = (page: 1 | 2 | 3) => {
    setChangePage(page)
  }

  if (isLoading || !data) {
    return (
      <ContainerProgress>
        <CircularProgress />
      </ContainerProgress>
    )
  }

  return (
    <FootballLayout>
      <Container>
        <Grid container alignItems='center' spacing={2}>
          <Grid item>
            <TeamLogo
              src={data.team.logo}
              alt={data.team.name}
              width={100}
              height={100}
            />
          </Grid>
          <Grid item xs>
            <Typography variant='h6'>{data.team.name}</Typography>
            <Typography variant='body2'>
              {data.league.name} - {data.league.season}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs display={'flex'}>
          <ButtonLink bg={changePage === 1} onClick={handleTeamStatistics}>
            Statistics
          </ButtonLink>
          <ButtonLink bg={changePage === 2} onClick={handleTeamInformation}>
            Informations
          </ButtonLink>
          <ButtonLink bg={changePage === 3} onClick={handleSquad}>
            Squad
          </ButtonLink>
        </Grid>

        <Divider sx={{ marginBottom: 5, marginTop: 5 }} />

        {changePage === 1 && (
          <>
            <Grid item xs={12} md={6}>
              <LastResults form={data.form} />
            </Grid>
            <Grid container spacing={3} sx={{ marginTop: 2 }}>
              <Grid item xs={12} md={6}>
                <GoalsForGoalsAgainst data={data.goals} />
              </Grid>
              <Grid item xs={12} md={6}>
                <CardDistribution card={data.cards} />
              </Grid>
              <Grid container spacing={2} padding={3}>
                <GoalsFormAgainst biggest={data.biggest} />
                {data.biggest?.streak?.wins ||
                data.biggest?.streak?.loses ||
                data.biggest?.streak?.draws ? (
                  <Grid item xs={12} md={4}>
                    <BiggestStreaks biggest={data.biggest} />
                  </Grid>
                ) : null}
                {data.biggest?.wins?.home || data.biggest?.wins?.away ? (
                  <Grid item xs={12} md={4}>
                    <BiggestWins biggest={data.biggest} />
                  </Grid>
                ) : null}
                {data.biggest?.loses?.home || data.biggest?.loses?.away ? (
                  <Grid item xs={12} md={4}>
                    <BiggestLoses biggest={data.biggest} />
                    <FaliedToScore faliedToScore={data.failed_to_score} />
                  </Grid>
                ) : null}
                <Grid item xs={12} md={8}>
                  <CleanSheets cleanSheets={data.clean_sheet} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Fixture fixture={data.fixtures} />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  style={{ display: 'flex', flexDirection: 'column' }}
                >
                  <GoalsDistributionByMinutes
                    goalsDistributionByMinute={data.goals}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant='body2'>
                        Team Formation Utilization: Analyzing the Frequency of
                        Tactical Setups Across Matches
                      </Typography>
                      <Divider sx={{ marginBottom: 2 }} />
                      <FormationPieChart data={data.lineups} />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <PenaltyStats data={data.penalty} />
                </Grid>
              </Grid>
            </Grid>
          </>
        )}

        {changePage === 2 && (
          <>
            {isInformationLoading ? (
              <ContainerProgress>
                <CircularProgress />
              </ContainerProgress>
            ) : (
              teamInformation && (
                <Grid container alignItems='center' spacing={2}>
                  <TeamCard teamProps={teamInformation} />
                </Grid>
              )
            )}
          </>
        )}

        {changePage === 3 && (
          <>
            {isPlayerSquadLoading ? (
              <ContainerProgress>
                <CircularProgress />
              </ContainerProgress>
            ) : (
              playerSquad && (
                <Grid container alignItems='center' spacing={2}>
                  <PlayersList
                    season={season}
                    players={playerSquad[0].players}
                  />
                </Grid>
              )
            )}
          </>
        )}
      </Container>
    </FootballLayout>
  )
}
