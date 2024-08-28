import React from 'react'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Divider,
} from '@mui/material'
import { PredictionsResponse } from 'src/types/apps/footballType'

interface PredictionsProps {
  data: PredictionsResponse
}

const PredictionsComponent: React.FC<PredictionsProps> = ({ data }) => {
  const { comparison, h2h, league, predictions, teams } = data

  return (
    <Grid container spacing={4}>
      {/* Liga e Equipes */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Grid container spacing={2} alignItems='center'>
              <Grid item>
                <Avatar src={league.logo} alt={league.name} />
              </Grid>
              <Grid item>
                <Typography variant='h6'>{league.name}</Typography>
                <Typography variant='body2' color='textSecondary'>
                  {league.country}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Equipes */}
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Grid container alignItems='center' spacing={2}>
                  <Grid item>
                    <Avatar src={teams.home.logo} alt={teams.home.name} />
                  </Grid>
                  <Grid item>
                    <Typography variant='h6'>{teams.home.name}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container alignItems='center' spacing={2}>
                  <Grid item>
                    <Avatar src={teams.away.logo} alt={teams.away.name} />
                  </Grid>
                  <Grid item>
                    <Typography variant='h6'>{teams.away.name}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Comparação */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              Comparação das Equipes
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Estatística</TableCell>
                  <TableCell>{teams.home.name}</TableCell>
                  <TableCell>{teams.away.name}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(comparison).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell>{key.toUpperCase()}</TableCell>
                    <TableCell>{value.home}</TableCell>
                    <TableCell>{value.away}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Grid>

      {/* Previsão */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              Previsão da Partida
            </Typography>
            <Typography variant='body1'>{predictions.advice}</Typography>
            <Divider style={{ margin: '20px 0' }} />
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant='body2'>Vitória Casa:</Typography>
                <Typography variant='h6'>{predictions.percent.home}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant='body2'>Empate:</Typography>
                <Typography variant='h6'>{predictions.percent.draw}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant='body2'>Vitória Fora:</Typography>
                <Typography variant='h6'>{predictions.percent.away}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* H2H - Confrontos Diretos */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              Confrontos Diretos (H2H)
            </Typography>
            {h2h.map((match, index) => (
              <div key={index}>
                <Typography variant='body2'>
                  {new Date(match.fixture.date).toLocaleDateString()} -{' '}
                  {match.league.name}
                </Typography>
                <Typography variant='body2'>
                  {match.teams.home.name} {match.goals.home} x{' '}
                  {match.goals.away} {match.teams.away.name}
                </Typography>
                {index < h2h.length - 1 && (
                  <Divider style={{ margin: '10px 0' }} />
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default PredictionsComponent
