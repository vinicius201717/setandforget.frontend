import React from 'react'
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Divider,
  CircularProgress,
  Avatar,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { getTeamInfo } from 'src/pages/api/football/team/getTeamInfo'
import { FootballTeamStatistics } from 'src/types/apps/footballType/teamType'
import { ContainerProgress } from 'src/components/football/footballLeague/style'

export default function TeamDetails() {
  const { query } = useRouter()
  const leagueId = query.leagueId
    ? parseInt(query.leagueId as string, 10)
    : undefined
  const season = query.season ? parseInt(query.season as string, 10) : undefined
  const teamId = query.teamId ? parseInt(query.teamId as string, 10) : undefined

  const { data, isLoading } = useQuery<FootballTeamStatistics>({
    queryKey: ['teamDetails', leagueId, season, teamId],
    queryFn: () =>
      getTeamInfo(teamId as number, leagueId as number, season as number),
    enabled: !!leagueId && !!season && !!teamId,
  })

  console.log(data)

  return (
    <Container>
      {isLoading && !data ? (
        <ContainerProgress>
          <CircularProgress />
        </ContainerProgress>
      ) : (
        <>
          <Grid container alignItems='center' spacing={2}>
            <Grid item>
              <Avatar
                src={data?.team.logo}
                alt={data?.team.name}
                sx={{ width: 80, height: 80 }}
              />
            </Grid>
            <Grid item>
              <Typography variant='h4' gutterBottom>
                {data?.team.name} - {data?.league.name} ({data?.league.season})
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={3} sx={{ marginTop: 2 }}>
            {/* Jogos */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant='h6'>Jogos</Typography>
                  <Divider sx={{ marginBottom: 2 }} />
                  <Typography variant='body1'>
                    <strong>Total Jogados:</strong>{' '}
                    {data?.fixtures.played.total}
                  </Typography>
                  <Typography variant='body1'>
                    <strong>Vitórias:</strong> {data?.fixtures.wins.total}
                  </Typography>
                  <Typography variant='body1'>
                    <strong>Empates:</strong> {data?.fixtures.draws.total}
                  </Typography>
                  <Typography variant='body1'>
                    <strong>Derrotas:</strong> {data?.fixtures.loses.total}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Gols Marcados */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant='h6'>Gols Marcados</Typography>
                  <Divider sx={{ marginBottom: 2 }} />
                  <Typography variant='body1'>
                    <strong>Total:</strong> {data?.goals.for.total.total}
                  </Typography>
                  <Typography variant='body1'>
                    <strong>Média:</strong> {data?.goals.for.average.total}
                  </Typography>
                  <Typography variant='h6' sx={{ marginTop: 2 }}>
                    Gols por Minuto
                  </Typography>
                  <Divider sx={{ marginBottom: 2 }} />
                  {Object.keys(data?.goals.for.minute || {}).map((minute) => (
                    <Typography variant='body2' key={minute}>
                      {minute}: {data?.goals.for.minute['0-15'].total || 0} (
                      {data?.goals.for.minute['16-30']?.percentage || '0%'})
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            </Grid>

            {/* Gols Sofridos */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant='h6'>Gols Sofridos</Typography>
                  <Divider sx={{ marginBottom: 2 }} />
                  <Typography variant='body1'>
                    <strong>Total:</strong> {data?.goals.against.total.total}
                  </Typography>
                  <Typography variant='body1'>
                    <strong>Média:</strong> {data?.goals.against.average.total}
                  </Typography>
                  <Typography variant='h6' sx={{ marginTop: 2 }}>
                    Gols Sofridos por Minuto
                  </Typography>
                  <Divider sx={{ marginBottom: 2 }} />
                  {Object.keys(data?.goals.against.minute || {}).map(
                    (minute) => (
                      <Typography variant='body2' key={minute}>
                        {minute}:{' '}
                        {data?.goals.against.minute['0-15']?.total || 0} (
                        {data?.goals.against.minute['31-45']?.percentage ||
                          '0%'}
                        )
                      </Typography>
                    ),
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Maiores Sequências */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant='h6'>Maiores Sequências</Typography>
                  <Divider sx={{ marginBottom: 2 }} />
                  <Typography variant='body1'>
                    <strong>Vitórias:</strong> {data?.biggest.streak.wins}
                  </Typography>
                  <Typography variant='body1'>
                    <strong>Empates:</strong> {data?.biggest.streak.draws}
                  </Typography>
                  <Typography variant='body1'>
                    <strong>Derrotas:</strong> {data?.biggest.streak.loses}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Clean Sheets */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant='h6'>Clean Sheets</Typography>
                  <Divider sx={{ marginBottom: 2 }} />
                  <Typography variant='body1'>
                    <strong>Total:</strong> {data?.clean_sheet.total}
                  </Typography>
                  <Typography variant='body1'>
                    <strong>Em Casa:</strong> {data?.clean_sheet.home}
                  </Typography>
                  <Typography variant='body1'>
                    <strong>Fora de Casa:</strong> {data?.clean_sheet.away}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Penalidades */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant='h6'>Penalidades</Typography>
                  <Divider sx={{ marginBottom: 2 }} />
                  <Typography variant='body1'>
                    <strong>Marcados:</strong> {data?.penalty.scored.total} (
                    {data?.penalty.scored.percentage})
                  </Typography>
                  <Typography variant='body1'>
                    <strong>Perdidos:</strong> {data?.penalty.missed.total} (
                    {data?.penalty.missed.percentage})
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Formações Usadas */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant='h6'>Formações Usadas</Typography>
                  <Divider sx={{ marginBottom: 2 }} />
                  {data?.lineups.map((lineup, index) => (
                    <Typography variant='body2' key={index}>
                      {lineup.formation}: {lineup.played} jogos
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            </Grid>

            {/* Cartões Recebidos */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant='h6'>Cartões Recebidos</Typography>
                  <Divider sx={{ marginBottom: 2 }} />
                  <Typography variant='body2'>
                    <strong>Amarelos:</strong>
                  </Typography>
                  {Object.keys(data?.cards.yellow || {}).map((minute) => (
                    <Typography variant='body2' key={minute}>
                      {minute}: {data?.cards.yellow['0-15'].total || 0} (
                      {data?.cards.yellow['106-120']?.percentage || '0%'})
                    </Typography>
                  ))}
                  <Typography variant='body2' sx={{ marginTop: 2 }}>
                    <strong>Vermelhos:</strong>
                  </Typography>
                  {Object.keys(data?.cards.red || {}).map((minute) => (
                    <Typography variant='body2' key={minute}>
                      {minute}: {data?.cards.red['61-75']?.total || 0} (
                      {data?.cards.red['61-75']?.percentage || '0%'})
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  )
}
