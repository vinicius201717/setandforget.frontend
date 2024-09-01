import React from 'react'
import { Card, CardContent, Divider, Typography } from '@mui/material'
import { Bar } from 'react-chartjs-2'
import { Cards } from 'src/types/apps/footballType/teamType'

interface CardDistributionProps {
  card: Cards
}

export const CardDistribution = ({ card }: CardDistributionProps) => {
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
          card?.yellow['0-15'].total || 0,
          card?.yellow['16-30'].total || 0,
          card?.yellow['31-45'].total || 0,
          card?.yellow['46-60'].total || 0,
          card?.yellow['61-75'].total || 0,
          card?.yellow['76-90'].total || 0,
          card?.yellow['91-105'].total || 0,
          card?.yellow['106-120'].total || 0,
        ],
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      },
      {
        label: 'Red Cards',
        data: [
          card?.red['0-15'].total || 0,
          card?.red['16-30'].total || 0,
          card?.red['31-45'].total || 0,
          card?.red['46-60'].total || 0,
          card?.red['61-75'].total || 0,
          card?.red['76-90'].total || 0,
          card?.red['91-105'].total || 0,
          card?.red['106-120'].total || 0,
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  }

  return (
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
                align: 'start',
              },
            },
          }}
        />
      </CardContent>
    </Card>
  )
}
