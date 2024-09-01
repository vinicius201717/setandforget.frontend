import React from 'react'
import { Card, CardContent, Divider, Typography } from '@mui/material'
import { Line } from 'react-chartjs-2'
import { Goals } from 'src/types/apps/footballType/teamType'

interface GoalsDistributionByMinuteProps {
  goalsDistributionByMinute: Goals
}

export const GoalsDistributionByMinutes = ({
  goalsDistributionByMinute,
}: GoalsDistributionByMinuteProps) => {
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
          goalsDistributionByMinute.for.minute['0-15'].total || 0,
          goalsDistributionByMinute.for.minute['16-30'].total || 0,
          goalsDistributionByMinute.for.minute['31-45'].total || 0,
          goalsDistributionByMinute.for.minute['46-60'].total || 0,
          goalsDistributionByMinute.for.minute['61-75'].total || 0,
          goalsDistributionByMinute.for.minute['76-90'].total || 0,
          goalsDistributionByMinute.for.minute['91-105'].total || 0,
          goalsDistributionByMinute.for.minute['106-120'].total || 0,
        ],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Goals Against',
        data: [
          goalsDistributionByMinute.against.minute['0-15'].total || 0,
          goalsDistributionByMinute.against.minute['16-30'].total || 0,
          goalsDistributionByMinute.against.minute['31-45'].total || 0,
          goalsDistributionByMinute.against.minute['46-60'].total || 0,
          goalsDistributionByMinute.against.minute['61-75'].total || 0,
          goalsDistributionByMinute.against.minute['76-90'].total || 0,
          goalsDistributionByMinute.against.minute['91-105'].total || 0,
          goalsDistributionByMinute.against.minute['106-120'].total || 0,
        ],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  }
  return (
    <Card style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <CardContent
        style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
      >
        <Typography variant='body2'>Goals Distribution by Minute</Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <div style={{ flex: 1 }}>
          <Line
            data={goalsDataLine}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'bottom',
                  align: 'start',
                },
              },
              layout: {
                padding: {
                  bottom: -10,
                },
              },
            }}
          />
        </div>
      </CardContent>
    </Card>
  )
}
