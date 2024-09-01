import { Card, CardContent, Divider, Typography } from '@mui/material'
import { Line } from 'react-chartjs-2'

import { Biggest } from 'src/types/apps/footballType/teamType'

interface BiggestWinsProps {
  biggest: Biggest
}

export const BiggestWins = ({ biggest }: BiggestWinsProps) => {
  const streakData = {
    labels: ['Wins', 'Draws', 'Loses'],
    datasets: [
      {
        label: 'Biggest Streaks',
        data: [biggest.streak.wins, biggest.streak.draws, biggest.streak.loses],
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

  return (
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
                align: 'start',
              },
            },
          }}
          height={200}
        />
      </CardContent>
    </Card>
  )
}
