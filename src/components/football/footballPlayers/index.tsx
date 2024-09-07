import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
  CircularProgress,
  IconButton,
  Tab,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
} from '@mui/material'
import {
  Player,
  PlayerDetails,
  PlayerStatistics,
  PlayerStatisticsResponse,
} from 'src/types/apps/footballType/playersType'
import { useQuery } from '@tanstack/react-query'
import { getPlayerStatistics } from 'src/pages/api/football/player/getPlayerStatisitcs'
import {
  BoxStatistics,
  BoxStatisticsInfo,
  ContainerProgress,
  LeagueLogo,
  ModalContainer,
  PlayerPhoto,
  StyledModalBox,
  StyledTableCell,
  StyledTableRow,
  TabsContainer,
  TeamLogo,
  TopTeamPlayer,
} from './style'
import CloseIcon from '@mui/icons-material/Close'
import { formatDate } from 'src/utils/format-data'
import FootballPlayerMenuTeam from 'src/components/menu/FootballPlayerMenuTeams'

const PlayerCard: React.FC<{ player: Player; onClick: () => void }> = ({
  player,
  onClick,
}) => {
  return (
    <Card
      sx={{ maxWidth: 200, margin: 'auto', cursor: 'pointer' }}
      onClick={onClick}
    >
      <CardMedia
        component='img'
        height='200'
        image={player.photo}
        alt={player.name}
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div' noWrap>
          {player.name}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Position: {player.position}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Age: {player.age}
        </Typography>
        {player.number ? (
          <Typography variant='body2' color='text.secondary'>
            Number: {player.number}
          </Typography>
        ) : (
          <Typography variant='body2' color='text.secondary'>
            Number: Unassigned
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

const PlayersList: React.FC<{ players: Player[]; season: number }> = ({
  players,
  season,
}) => {
  const [playerId, setPlayerId] = useState<number | null>(null)
  const [openModal, setOpenModal] = useState(false)
  const [player, setPlayer] = useState<PlayerDetails | null>(null)
  const [statistics, setStatistics] = useState<PlayerStatistics[] | null>(null)
  const [tabIndex, setTabIndex] = useState<number>(0)
  const [tabStatistic, setTabStatistic] = useState<number>(0)

  const { data, isLoading, refetch } = useQuery<
    PlayerStatisticsResponse[] | null
  >({
    queryKey: ['teamStatistic', playerId, season],
    queryFn: () => getPlayerStatistics(playerId as number, season),
    enabled: false,
  })

  useEffect(() => {
    if (playerId !== null) {
      refetch().then(() => setOpenModal(true))
    }
  }, [playerId, refetch])

  useEffect(() => {
    if (data && data.length > 0 && data[0].statistics.length > 0) {
      const playerData = data[0].player
      const playerStatistic = data[0].statistics

      setPlayer(playerData)
      setStatistics(playerStatistic)
    }
  }, [data])

  const handleFetchStatistics = (id: number) => {
    setOpenModal(true)
    setPlayerId(id)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue)
  }

  const handleTabStatisticChange = (
    event: React.SyntheticEvent,
    newValue: number,
  ) => {
    setTabStatistic(newValue)
  }

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {players.map((player) => (
          <Grid item key={player.id} xs={12} sm={6} md={3}>
            <PlayerCard
              player={player}
              onClick={() => handleFetchStatistics(player.id)}
            />
          </Grid>
        ))}
      </Grid>

      <ModalContainer
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby='player-statistics-modal'
        aria-describedby='player-statistics-description'
      >
        <StyledModalBox>
          <IconButton
            aria-label='close'
            onClick={handleCloseModal}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>

          {isLoading || !data ? (
            <ContainerProgress>
              <CircularProgress />
            </ContainerProgress>
          ) : (
            data && (
              <>
                <TabsContainer
                  value={tabIndex}
                  onChange={handleTabChange}
                  variant='fullWidth'
                  indicatorColor='primary'
                  textColor='primary'
                >
                  <Tab label='Player Info' />
                  <Tab label='Player Statistics' />
                </TabsContainer>

                {tabIndex === 0 && player && (
                  <BoxStatisticsInfo
                    sx={{ padding: 3, alignItems: 'flex-start' }}
                  >
                    <TableContainer component={Paper}>
                      <Table
                        sx={{ minWidth: 700, mt: '10px' }}
                        aria-label='customized table'
                      >
                        <TableHead>
                          <TableRow>
                            <StyledTableCell colSpan={4}>
                              Info player
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <StyledTableRow>
                            <StyledTableCell component='th' scope='row'>
                              Name:
                            </StyledTableCell>
                            <StyledTableCell align='left'>
                              {player.firstname} {player.lastname}
                            </StyledTableCell>
                          </StyledTableRow>
                          <StyledTableRow>
                            <StyledTableCell component='th' scope='row'>
                              Age:
                            </StyledTableCell>
                            <StyledTableCell align='left'>
                              {player.age}
                            </StyledTableCell>
                          </StyledTableRow>
                          <StyledTableRow>
                            <StyledTableCell component='th' scope='row'>
                              Nationality:
                            </StyledTableCell>
                            <StyledTableCell align='left'>
                              {player.nationality}
                            </StyledTableCell>
                          </StyledTableRow>
                          <StyledTableRow>
                            <StyledTableCell component='th' scope='row'>
                              Height:
                            </StyledTableCell>
                            <StyledTableCell align='left'>
                              {player.height}
                            </StyledTableCell>
                          </StyledTableRow>
                          <StyledTableRow>
                            <StyledTableCell component='th' scope='row'>
                              Weight:
                            </StyledTableCell>
                            <StyledTableCell align='left'>
                              {player.weight}
                            </StyledTableCell>
                          </StyledTableRow>

                          <StyledTableRow>
                            <StyledTableCell component='th' scope='row'>
                              Injured:
                            </StyledTableCell>
                            <StyledTableCell align='left'>
                              {player.injured ? 'Yes' : 'No'}
                            </StyledTableCell>
                          </StyledTableRow>

                          <StyledTableRow>
                            <StyledTableCell component='th' scope='row'>
                              Date of Birth:
                            </StyledTableCell>
                            <StyledTableCell align='left'>
                              {formatDate(player.birth.date)}
                            </StyledTableCell>
                          </StyledTableRow>

                          <StyledTableRow>
                            <StyledTableCell component='th' scope='row'>
                              Country of Birth:
                            </StyledTableCell>
                            <StyledTableCell align='left'>
                              {player.birth.country}
                            </StyledTableCell>
                          </StyledTableRow>

                          <StyledTableRow>
                            <StyledTableCell component='th' scope='row'>
                              Place of Birth:
                            </StyledTableCell>
                            <StyledTableCell align='left'>
                              {player.birth.place}
                            </StyledTableCell>
                          </StyledTableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </BoxStatisticsInfo>
                )}

                {tabIndex === 1 && statistics && (
                  <BoxStatisticsInfo
                    sx={{ padding: 3, alignItems: 'flex-start' }}
                  >
                    {statistics[tabStatistic] ? (
                      <>
                        {' '}
                        <FootballPlayerMenuTeam
                          statistics={statistics}
                          handleChange={handleTabStatisticChange}
                        />
                        <TopTeamPlayer>
                          {statistics[tabStatistic].team.logo ? (
                            <TeamLogo
                              src={statistics[tabStatistic].team.logo}
                              alt={statistics[tabStatistic].team.name}
                              width={80}
                              height={80}
                            />
                          ) : (
                            ''
                          )}
                          {player ? (
                            <PlayerPhoto
                              src={player?.photo}
                              alt={player?.name}
                              width={80}
                              height={80}
                            />
                          ) : (
                            ''
                          )}
                          {statistics[tabStatistic].league.logo ? (
                            <LeagueLogo
                              src={statistics[tabStatistic].league.logo}
                              alt={statistics[tabStatistic].league.name}
                              width={80}
                              height={80}
                            />
                          ) : (
                            ''
                          )}
                        </TopTeamPlayer>
                      </>
                    ) : null}
                    {
                      <BoxStatistics>
                        <TableContainer component={Paper}>
                          <Table
                            sx={{ minWidth: 700 }}
                            aria-label='customized table'
                          >
                            <TableHead>
                              <TableRow>
                                <StyledTableCell colSpan={4}>
                                  Player statistics for{' '}
                                  {statistics[tabStatistic].team.name} in the{' '}
                                  {statistics[tabStatistic].league.name} league.
                                  {statistics[tabStatistic].games.rating ? (
                                    <>
                                      Rating last game:{' '}
                                      {statistics[tabStatistic].games.rating}
                                    </>
                                  ) : (
                                    ''
                                  )}
                                </StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <StyledTableRow>
                                <StyledTableCell component='th' scope='row'>
                                  Team:
                                </StyledTableCell>
                                <StyledTableCell align='left'>
                                  {statistics[tabStatistic].team.name ||
                                    'unknow'}
                                </StyledTableCell>

                                <StyledTableCell component='th' scope='row'>
                                  Shots:
                                </StyledTableCell>
                                <StyledTableCell align='left'>
                                  {statistics[tabStatistic].shots.total || 0}
                                </StyledTableCell>
                              </StyledTableRow>

                              <StyledTableRow>
                                <StyledTableCell component='th' scope='row'>
                                  League:
                                </StyledTableCell>
                                <StyledTableCell align='left'>
                                  {statistics[tabStatistic].league.name || 0}
                                </StyledTableCell>
                                <StyledTableCell component='th' scope='row'>
                                  Passes:
                                </StyledTableCell>
                                <StyledTableCell align='left'>
                                  {statistics[tabStatistic].passes.total || 0}
                                </StyledTableCell>
                              </StyledTableRow>
                              <StyledTableRow>
                                <StyledTableCell component='th' scope='row'>
                                  Appearances:
                                </StyledTableCell>
                                <StyledTableCell align='left'>
                                  {statistics[tabStatistic].games.appearences ||
                                    0}
                                </StyledTableCell>
                                <StyledTableCell component='th' scope='row'>
                                  Fouls Committed:
                                </StyledTableCell>
                                <StyledTableCell align='left'>
                                  {statistics[tabStatistic].fouls.committed ||
                                    0}
                                </StyledTableCell>
                              </StyledTableRow>

                              <StyledTableRow>
                                <StyledTableCell component='th' scope='row'>
                                  Goals Scored:
                                </StyledTableCell>
                                <StyledTableCell align='left'>
                                  {statistics[tabStatistic].goals.total || 0}
                                </StyledTableCell>

                                <StyledTableCell component='th' scope='row'>
                                  Yellow Cards:
                                </StyledTableCell>
                                <StyledTableCell align='left'>
                                  {statistics[tabStatistic].cards.yellow || 0}
                                </StyledTableCell>
                              </StyledTableRow>

                              <StyledTableRow>
                                <StyledTableCell component='th' scope='row'>
                                  Assists:
                                </StyledTableCell>
                                <StyledTableCell align='left'>
                                  {statistics[tabStatistic].goals.assists || 0}
                                </StyledTableCell>

                                <StyledTableCell component='th' scope='row'>
                                  Red Cards:
                                </StyledTableCell>
                                <StyledTableCell align='left'>
                                  {statistics[tabStatistic].cards.red || 0}
                                </StyledTableCell>
                              </StyledTableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </BoxStatistics>
                    }
                  </BoxStatisticsInfo>
                )}
              </>
            )
          )}
        </StyledModalBox>
      </ModalContainer>
    </Container>
  )
}

export default PlayersList
