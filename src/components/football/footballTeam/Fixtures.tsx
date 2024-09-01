import React from 'react'
import { Card, CardContent, Divider, Typography } from '@mui/material'
import { Bar } from 'react-chartjs-2'
import { Fixtures } from 'src/types/apps/footballType/teamType'

interface FixturePropsProps {
  fixture: Fixtures
}

export const Fixture = ({ fixture }: FixturePropsProps) => {
  const fixturesData = {
    labels: ['Home', 'Away', 'Total'],
    datasets: [
      {
        label: 'Wins',
        data: [fixture.wins.home, fixture.wins.away, fixture.wins.total],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Draws',
        data: [fixture.draws.home, fixture.draws.away, fixture.draws.total],
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      },
      {
        label: 'Loses',
        data: [fixture.loses.home, fixture.loses.away, fixture.loses.total],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  }
  return (
    <Card>
      <CardContent>
        <Typography variant='body2'>Fixtures</Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <Bar
          data={fixturesData}
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
