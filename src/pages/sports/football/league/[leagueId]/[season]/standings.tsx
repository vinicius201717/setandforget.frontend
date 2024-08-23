import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import LeagueLayout from 'src/layouts/components/footballLayout/leagueLayout'
import { getLeagueStandings } from 'src/pages/api/football/league/getLeagueStandings'
import { League, LeagueStadings } from 'src/types/apps/footballType'
import { ContainerProgress, TeamLogo } from '../style'
import FootballLayout from 'src/layouts/components/footballLayout'

export default function LeagueStandings() {
  const router = useRouter()
  const { leagueId, season } = router.query

  const leagueIdNumber = leagueId ? parseInt(leagueId as string, 10) : undefined
  const seasonNumber = season ? parseInt(season as string, 10) : undefined

  const { data, error, isLoading } = useQuery<LeagueStadings[]>({
    queryKey: ['leagueStandings', leagueIdNumber, seasonNumber],
    queryFn: () =>
      getLeagueStandings(leagueIdNumber as number, seasonNumber as number),
    enabled: !!leagueIdNumber && !!seasonNumber,
  })

  const renderContent = () => {
    if (isLoading) {
      return (
        <ContainerProgress>
          <CircularProgress />
        </ContainerProgress>
      )
    }

    if (error) {
      return <div>Error fetching league data</div>
    }

    if (data && data.length > 0) {
      const standingsData = data[0]
      const league: League = {
        id: standingsData.league.id,
        name: standingsData.league.name,
        logo: standingsData.league.logo,
        type: '',
      }

      return (
        <LeagueLayout leagueId={league.id} season={seasonNumber as number}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='league standings table'>
              <TableHead>
                <TableRow>
                  <TableCell>Rank</TableCell>
                  <TableCell>Team</TableCell>
                  <TableCell align='right'>Points</TableCell>
                  <TableCell align='right'>Goals Diff</TableCell>
                  <TableCell align='right'>Played</TableCell>
                  <TableCell align='right'>Wins</TableCell>
                  <TableCell align='right'>Draws</TableCell>
                  <TableCell align='right'>Losses</TableCell>
                  <TableCell align='right'>Form</TableCell>
                  <TableCell align='right'>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {standingsData.league.standings.map(
                  (standingGroup, groupIndex) =>
                    standingGroup.map((standing, index) => (
                      <TableRow key={`${groupIndex}-${index}`}>
                        <TableCell>{standing.rank}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <TeamLogo
                              alt={standing.team.name}
                              src={standing.team.logo}
                              width={10}
                              height={10}
                            />
                            <Typography variant='body1'>
                              {standing.team.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align='right'>{standing.points}</TableCell>
                        <TableCell align='right'>
                          {standing.goalsDiff}
                        </TableCell>
                        <TableCell align='right'>
                          {standing.all.played}
                        </TableCell>
                        <TableCell align='right'>{standing.all.win}</TableCell>
                        <TableCell align='right'>{standing.all.draw}</TableCell>
                        <TableCell align='right'>{standing.all.lose}</TableCell>
                        <TableCell align='right'>{standing.form}</TableCell>
                        <TableCell align='right'>
                          {standing.description}
                        </TableCell>
                      </TableRow>
                    )),
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </LeagueLayout>
      )
    }
    return <div>No data available</div>
  }

  return <FootballLayout>{renderContent()}</FootballLayout>
}
