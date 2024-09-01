import React from 'react'
import { Card, CardContent, Divider, Typography } from '@mui/material'
import { Pie } from 'react-chartjs-2'
import { Biggest } from 'src/types/apps/footballType/teamType'

interface BiggestLosesProps {
  biggest: Biggest
}

export const BiggestLoses = ({ biggest }: BiggestLosesProps) => {
  const losesData = {
    labels: ['Home', 'Away'],
    datasets: [
      {
        label: 'Biggest Loses',
        data: [
          biggest.loses.home ? parseInt(biggest.loses.home) : 0,
          biggest.loses.away ? parseInt(biggest.loses.away) : 0,
        ],
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  }

  return (
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
                align: 'start',
              },
            },
          }}
        />
      </CardContent>
    </Card>
  )
}
