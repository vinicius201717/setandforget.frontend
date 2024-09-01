import React from 'react'
import { Grid, Typography, Card, CardContent, Divider } from '@mui/material'
import { Penalty } from 'src/types/apps/footballType/teamType'

interface PenaltyProps {
  data: Penalty
}

const PenaltyStats = ({ data }: PenaltyProps) => {
  return (
    <Card>
      <CardContent>
        <Typography variant='body2' gutterBottom>
          Penalty Statistics
        </Typography>
        <Divider />

        <Grid container spacing={2} style={{ marginTop: '16px' }}>
          <Grid item xs={6}>
            <Typography variant='body2'>Scored:</Typography>
            <Typography variant='h6'>{data.scored.percentage}</Typography>
            <Typography variant='body2'>Total: {data.scored.total}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant='body2'>Missed:</Typography>
            <Typography variant='h6'>{data.missed.percentage}</Typography>
            <Typography variant='body2'>Total: {data.missed.total}</Typography>
          </Grid>

          <Grid item xs={12} style={{ marginTop: '16px' }}>
            <Typography variant='body1' align='left'>
              Total Penalties Taken: {data.total}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default PenaltyStats
