import { Card, CardContent, Divider, Typography } from '@mui/material'
import { Bar } from 'react-chartjs-2'

import { Biggest } from 'src/types/apps/footballType/teamType'

interface BiggestStreaksProps {
  biggest: Biggest
}

export const BiggestStreaks = ({ biggest }: BiggestStreaksProps) => {
  const winsData = {
    labels: ['Home', 'Away'],
    datasets: [
      {
        label: 'Biggest Wins',
        data: [
          biggest.wins.home ? parseInt(biggest.wins.home) : 0,
          biggest.wins.away ? parseInt(biggest.wins.away) : 0,
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  }

  return (
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
