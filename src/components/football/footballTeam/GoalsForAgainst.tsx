import React from 'react'
import { Typography, Card, CardContent, Divider, Grid } from '@mui/material'

import { Bar } from 'react-chartjs-2'
import { Biggest } from 'src/types/apps/footballType/teamType'

interface GoalsFormAgainstProps {
  biggest: Biggest
}

const GoalsFormAgainst = ({ biggest }: GoalsFormAgainstProps) => {
  const goalsData = {
    labels: ['Home', 'Away'],
    datasets: [
      {
        label: 'Goals For',
        data: [biggest.goals.for.home, biggest.goals.for.away],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Goals Against',
        data: [biggest.goals.against.home, biggest.goals.against.away],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  }
  return (
    <>
      {biggest.goals && (
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant='body2'>Goals For/Against</Typography>
              <Divider sx={{ marginBottom: 2 }} />
              <Bar
                data={goalsData}
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
        </Grid>
      )}
    </>
  )
}

export default GoalsFormAgainst
