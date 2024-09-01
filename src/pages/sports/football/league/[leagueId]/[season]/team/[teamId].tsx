import React from 'react'
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Box,
  Divider,
} from '@mui/material'
import { green, red, grey } from '@mui/material/colors'

import { Bar, Line, Pie } from 'react-chartjs-2'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { getTeamInfo } from 'src/pages/api/football/team/getTeamInfo'
import { FootballTeamStatistics } from 'src/types/apps/footballType/teamType'
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
import { LastResultsContainer, TeamLogo } from '../../style'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'

import FootballLayout from 'src/layouts/components/footballLayout'

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
  const leagueId = parseInt(query.leagueId as string, 10)
  const season = parseInt(query.season as string, 10)
  const teamId = parseInt(query.teamId as string, 10)

  const { data, isLoading } = useQuery<FootballTeamStatistics>({
    queryKey: ['teamDetails', leagueId, season, teamId],
    queryFn: () => getTeamInfo(teamId, leagueId, season),
    enabled: !!leagueId && !!season && !!teamId,
  })

  const renderIcon = (result: string) => {
    switch (result) {
      case 'W':
        return <SportsSoccerIcon sx={{ color: green[500] }} />
      case 'D':
        return <SportsSoccerIcon sx={{ color: grey[700] }} />
      case 'L':
        return <SportsSoccerIcon sx={{ color: red[500] }} />
      default:
        return null
    }
  }

  const cardData = {
    labels: [
      '0-15 min',
      '16-30 min',
      '31-45 min',
      '46-60 min',
      '61-75 min',
      '76-90 min',
      '91-105 min',
      '106-120 min',
    ],
    datasets: [
      {
        label: 'Yellow Cards',
        data: [
          data?.cards.yellow['0-15'].total || 0,
          data?.cards.yellow['16-30'].total || 0,
          data?.cards.yellow['31-45'].total || 0,
          data?.cards.yellow['46-60'].total || 0,
          data?.cards.yellow['61-75'].total || 0,
          data?.cards.yellow['76-90'].total || 0,
          data?.cards.yellow['91-105'].total || 0,
          data?.cards.yellow['106-120'].total || 0,
        ],
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      },
      {
        label: 'Red Cards',
        data: [
          data?.cards.red['0-15'].total || 0,
          data?.cards.red['16-30'].total || 0,
          data?.cards.red['31-45'].total || 0,
          data?.cards.red['46-60'].total || 0,
          data?.cards.red['61-75'].total || 0,
          data?.cards.red['76-90'].total || 0,
          data?.cards.red['91-105'].total || 0,
          data?.cards.red['106-120'].total || 0,
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  }

  if (isLoading || !data) {
    return (
      <ContainerProgress>
        <CircularProgress />
      </ContainerProgress>
    )
  }

  const goalsData = {
    labels: ['Home', 'Away'],
    datasets: [
      {
        label: 'Goals For',
        data: [data.biggest.goals.for.home, data.biggest.goals.for.away],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Goals Against',
        data: [
          data.biggest.goals.against.home,
          data.biggest.goals.against.away,
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  }
  const losesData = {
    labels: ['Home', 'Away'],
    datasets: [
      {
        label: 'Biggest Loses',
        data: [
          data.biggest.loses.home ? parseInt(data.biggest.loses.home) : 0,
          data.biggest.loses.away ? parseInt(data.biggest.loses.away) : 0,
        ],
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  }
  const streakData = {
    labels: ['Wins', 'Draws', 'Loses'],
    datasets: [
      {
        label: 'Biggest Streaks',
        data: [
          data.biggest.streak.wins,
          data.biggest.streak.draws,
          data.biggest.streak.loses,
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const winsData = {
    labels: ['Home', 'Away'],
    datasets: [
      {
        label: 'Biggest Wins',
        data: [3, 5], // Static data for testing
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  }

  const cleanSheetData = {
    labels: ['Casa', 'Fora', 'Total'],
    datasets: [
      {
        label: 'Clean Sheets',
        data: [
          data.clean_sheet.home,
          data.clean_sheet.away,
          data.clean_sheet.total,
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const fixturesData = {
    labels: ['Home', 'Away', 'Total'],
    datasets: [
      {
        label: 'Wins',
        data: [
          data.fixtures.wins.home,
          data.fixtures.wins.away,
          data.fixtures.wins.total,
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Draws',
        data: [
          data.fixtures.draws.home,
          data.fixtures.draws.away,
          data.fixtures.draws.total,
        ],
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      },
      {
        label: 'Loses',
        data: [
          data.fixtures.loses.home,
          data.fixtures.loses.away,
          data.fixtures.loses.total,
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  }

  const goalsDataLine = {
    labels: [
      '0-15',
      '16-30',
      '31-45',
      '46-60',
      '61-75',
      '76-90',
      '91-105',
      '106-120',
    ],
    datasets: [
      {
        label: 'Goals For',
        data: [
          data.goals.for.minute['0-15'].total || 0,
          data.goals.for.minute['16-30'].total || 0,
          data.goals.for.minute['31-45'].total || 0,
          data.goals.for.minute['46-60'].total || 0,
          data.goals.for.minute['61-75'].total || 0,
          data.goals.for.minute['76-90'].total || 0,
          data.goals.for.minute['91-105'].total || 0,
          data.goals.for.minute['106-120'].total || 0,
        ],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4, // valor para suavizar a linha
      },
      {
        label: 'Goals Against',
        data: [
          data.goals.against.minute['0-15'].total || 0,
          data.goals.against.minute['16-30'].total || 0,
          data.goals.against.minute['31-45'].total || 0,
          data.goals.against.minute['46-60'].total || 0,
          data.goals.against.minute['61-75'].total || 0,
          data.goals.against.minute['76-90'].total || 0,
          data.goals.against.minute['91-105'].total || 0,
          data.goals.against.minute['106-120'].total || 0,
        ],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        tension: 0.4, // valor para suavizar a linha
      },
    ],
  }

  const lineupData = {
    squad: {
      goalkeeper: [{ number: 1, name: 'G. Buffon' }],
      defense: [
        { number: 2, name: 'J. Zanetti' },
        { number: 3, name: 'P. Maldini' },
        { number: 4, name: 'F. Cannavaro' },
        { number: 5, name: 'R. Carlos' },
      ],
      midfield: [
        { number: 6, name: 'X. Alonso' },
        { number: 7, name: 'Z. Zidane' },
        { number: 8, name: 'A. Pirlo' },
      ],
      attack: [
        { number: 9, name: 'L. Messi' },
        { number: 10, name: 'R. Ronaldo' },
        { number: 11, name: 'T. Henry' },
      ],
    },
    formation: '4-3-3',
  }

  return (
    <FootballLayout>
      <Container>
        <Grid container alignItems='center' spacing={2}>
          <Grid item>
            <TeamLogo
              src={data.team.logo}
              alt={data.team.name}
              width={80}
              height={80}
            />
          </Grid>
          <Grid item xs>
            <Typography variant='h6'>
              {data.team.name} - {data.league.name} ({data.league.season})
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ marginBottom: 5, marginTop: 5 }} />
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                Latest Results:
              </Typography>
              <Divider sx={{ marginBottom: 2 }} />
              <LastResultsContainer>
                {data.form.split('').map((result, index) => (
                  <Box key={index} sx={{ margin: '0 4px' }}>
                    {renderIcon(result)}
                  </Box>
                ))}
              </LastResultsContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid container spacing={3} sx={{ marginTop: 2 }}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant='body2'>
                  Goals For / Goals Against
                </Typography>
                <Divider sx={{ marginBottom: 2 }} />
                <Bar
                  data={{
                    labels: Object.keys(data.goals.for.minute).map(
                      (label) => `${label} min`,
                    ),
                    datasets: [
                      {
                        label: 'Goals For',
                        data: Object.values(data.goals.for.minute).map(
                          (item) => item.total || 0,
                        ),
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                      },
                      {
                        label: 'Goals Against',
                        data: Object.values(data.goals.against.minute).map(
                          (item) => item.total || 0,
                        ),
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                      },
                    ],
                  }}
                  options={{
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {},
                      },
                    },
                    plugins: {
                      legend: {
                        position: 'bottom',
                      },
                    },
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant='body2'>Card Distribution</Typography>
                <Divider sx={{ marginBottom: 2 }} />
                <Bar
                  data={cardData}
                  options={{
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          stepSize: 1,
                        },
                      },
                    },
                    plugins: {
                      legend: {
                        position: 'bottom',
                      },
                    },
                  }}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid container spacing={2} padding={3}>
            {data.goals && (
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant='body2'>Goals For/Against</Typography>
                    <Divider sx={{ marginBottom: 2 }} />
                    <Bar
                      data={goalsData}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            position: 'bottom',
                          },
                        },
                      }}
                      height={200}
                    />
                  </CardContent>
                </Card>
              </Grid>
            )}

            {data.biggest?.streak?.wins ||
            data.biggest?.streak?.loses ||
            data.biggest?.streak?.draws ? (
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant='body2'>Biggest Streaks</Typography>
                    <Divider sx={{ marginBottom: 2 }} />
                    <Line
                      data={streakData}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            position: 'bottom',
                          },
                        },
                      }}
                      height={200}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ) : null}

            {data.biggest?.wins?.home || data.biggest?.wins?.away ? (
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant='body2'>Biggest Wins</Typography>
                    <Divider sx={{ marginBottom: 2 }} />
                    <Bar
                      data={winsData}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            position: 'bottom',
                          },
                        },
                      }}
                      height={200}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ) : null}
            {data.biggest?.loses?.home || data.biggest?.loses?.away ? (
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant='body2'>Biggest Loses</Typography>
                    <Divider sx={{ marginBottom: 2 }} />
                    <Pie
                      data={losesData}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            position: 'bottom',
                          },
                        },
                      }}
                    />
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: 4 }}>
                  <CardContent>
                    <Typography variant='h6'>Failed to Score</Typography>
                    <Divider sx={{ marginBottom: 2 }} />
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Typography variant='body2'>Home Games:</Typography>
                        <Typography variant='h4'>
                          {data.failed_to_score.home}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant='body2'>Away Games:</Typography>
                        <Typography variant='h4'>
                          {data.failed_to_score.away}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant='body2'>Total Games:</Typography>
                        <Typography variant='h4'>
                          {data.failed_to_score.total}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ) : null}
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <Typography variant='body2'>Clean Sheets</Typography>
                  <Divider sx={{ marginBottom: 2 }} />
                  <Bar
                    data={cleanSheetData}
                    options={{
                      scales: {
                        y: {
                          beginAtZero: true,
                          ticks: { stepSize: 1 },
                        },
                      },
                      plugins: {
                        legend: { display: false },
                      },
                    }}
                    height={200}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant='body2'>Fixtures</Typography>
                  <Divider sx={{ marginBottom: 2 }} />
                  <Bar
                    data={fixturesData}
                    options={{
                      responsive: true,

                      plugins: {
                        legend: {
                          position: 'bottom',
                        },
                      },
                    }}
                    height={200}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant='body2'>
                    Goals Distribution by Minute
                  </Typography>
                  <Divider sx={{ marginBottom: 2 }} />
                  <Line
                    data={goalsDataLine}
                    options={{
                      responsive: true,
                      plugins: { legend: { position: 'bottom' } },
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </FootballLayout>
  )
}
