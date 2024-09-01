import React from 'react'
import { Typography, Card, CardContent, Divider } from '@mui/material'

import { Bar } from 'react-chartjs-2'
import { Goals } from 'src/types/apps/footballType/teamType'

interface GoalsForGoalsAgainstProps {
  data: Goals
}

const GoalsForGoalsAgainst = ({ data }: GoalsForGoalsAgainstProps) => {
  return (
    <Card>
      <CardContent>
        <Typography variant='body2'>Goals For / Goals Against</Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <Bar
          data={{
            labels: Object.keys(data.for.minute).map((label) => `${label} min`),
            datasets: [
              {
                label: 'Goals For',
                data: Object.values(data.for.minute).map(
                  (item) => item.total || 0,
                ),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
              },
              {
                label: 'Goals Against',
                data: Object.values(data.against.minute).map(
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
                align: 'start',
              },
            },
          }}
        />
      </CardContent>
    </Card>
  )
}

export default GoalsForGoalsAgainst
