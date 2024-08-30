import React from 'react'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Divider,
} from '@mui/material'
import { PredictionsResponse } from 'src/types/apps/footballType'
import {
  BoxPercent,
  BoxPercentContainer,
  CardContentContainer,
  TeamLogo,
  TeamsContent,
} from './style'

interface PredictionsProps {
  data: PredictionsResponse
}

const PredictionsComponent: React.FC<PredictionsProps> = ({ data }) => {
  const { comparison, h2h, league, predictions, teams } = data

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={12}>
        <CardContentContainer>
          <Grid item>
            <TeamLogo
              src={league.logo}
              alt={league.name}
              width={80}
              height={80}
            />
          </Grid>
          <Grid item>
            <Typography variant='body1'>{league.name}</Typography>
            <Typography variant='body2' color='textSecondary'>
              {league.country}
            </Typography>
          </Grid>
        </CardContentContainer>
      </Grid>

      <Grid item xs={12} md={12}>
        <Card>
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>
                    <TeamsContent>
                      <Grid item>
                        <TeamLogo
                          src={teams.home.logo}
                          alt={teams.home.name}
                          width={80}
                          height={80}
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant='body2'>
                          {teams.home.name}
                        </Typography>
                      </Grid>
                    </TeamsContent>
                  </TableCell>
                  <TableCell align='center'>VS</TableCell>
                  <TableCell align='center'>
                    <TeamsContent>
                      <Grid item>
                        <TeamLogo
                          src={teams.away.logo}
                          alt={teams.away.name}
                          width={80}
                          height={80}
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant='body2'>
                          {teams.away.name}
                        </Typography>
                      </Grid>
                    </TeamsContent>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(comparison).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell align='center'>{value.home}</TableCell>
                    <TableCell align='center'>{key.toUpperCase()}</TableCell>
                    <TableCell align='center'>{value.away}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              Match Prediction
            </Typography>
            <Typography variant='body1'>{predictions.advice}</Typography>
            <Divider style={{ margin: '20px 0' }} />
            <BoxPercentContainer>
              <BoxPercent
                percent={predictions.percent.home}
                color={'#4caf50'}
                title={`Home win: ${predictions.percent.home}`}
              >
                <Typography
                  variant='body2'
                  color={'black'}
                  fontWeight={'600'}
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Home Win: {predictions.percent.home}
                </Typography>
              </BoxPercent>
              <BoxPercent
                percent={predictions.percent.draw}
                color={'#ffeb3b'}
                title={`Draw: ${predictions.percent.draw}`}
              >
                <Typography
                  variant='body2'
                  color={'black'}
                  fontWeight={'600'}
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Draw: {predictions.percent.draw}
                </Typography>
              </BoxPercent>
              <BoxPercent
                percent={predictions.percent.away}
                color={'#1a90ff'}
                title={`Away win: ${predictions.percent.away}`}
              >
                <Typography
                  variant='body2'
                  color={'black'}
                  fontWeight={'600'}
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Away Win: {predictions.percent.away}
                </Typography>
              </BoxPercent>
            </BoxPercentContainer>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              Head-to-Head (H2H)
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
