import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
  CircularProgress,
} from '@mui/material'
import { Player } from 'src/types/apps/footballType/playersType'
import { useQuery } from '@tanstack/react-query'
import { getPlayerStatistics } from 'src/pages/api/football/player/getPlayerStatisitcs'
import { ContainerProgress } from './style'

const PlayerCard: React.FC<{ player: Player }> = ({ player }) => {
  return (
    <Card sx={{ maxWidth: 200, margin: 'auto' }}>
      <CardMedia
        component='img'
        height='200'
        image={player.photo}
        alt={player.name}
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
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

  const { data, isLoading, refetch } = useQuery<any>({
    queryKey: ['teamStatistic', playerId, season],
    queryFn: () => getPlayerStatistics(playerId as number, season),
    enabled: false,
  })

  const handleFetchStatistics = (id: number) => {
    setPlayerId(id)
    refetch()
  }

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <Container sx={{ py: 4 }}>
      {isLoading ? (
        <ContainerProgress>
          <CircularProgress />
        </ContainerProgress>
      ) : (
        <Grid container spacing={3}>
          {players.map((player) => (
            <Grid item key={player.id} xs={12} sm={6} md={3}>
              <div
                onClick={() => handleFetchStatistics(player.id)}
                style={{ cursor: 'pointer' }}
              >
                <PlayerCard player={player} />
              </div>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  )
}

export default PlayersList
