import React from 'react'
import { Card, CardContent, Divider, Typography } from '@mui/material'
import { Bar } from 'react-chartjs-2'
import { CleanSheetAndFailedToScore } from 'src/types/apps/footballType/teamType'

interface CleanSheetsProps {
  cleanSheets: CleanSheetAndFailedToScore
}

export const CleanSheets = ({ cleanSheets }: CleanSheetsProps) => {
  const cleanSheetData = {
    labels: ['Casa', 'Fora', 'Total'],
    datasets: [
      {
        label: 'Clean Sheets',
        data: [cleanSheets.home, cleanSheets.away, cleanSheets.total],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  return (
    <Card>
      <CardContent>
        <Typography variant='body2'>Clean Sheets</Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <Bar
          data={cleanSheetData}
          options={{
            scales: {
              y: {
                beginAtZero: true,
                ticks: { stepSize: 1 },
              },
            },
            plugins: {
              legend: { display: false },
            },
          }}
          height={200}
        />
      </CardContent>
    </Card>
  )
}
