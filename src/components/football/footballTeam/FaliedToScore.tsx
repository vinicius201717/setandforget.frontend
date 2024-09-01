import React from 'react'
import { Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import { CleanSheetAndFailedToScore } from 'src/types/apps/footballType/teamType'

interface FaliedToScoreProps {
  faliedToScore: CleanSheetAndFailedToScore
}

export const FaliedToScore = ({ faliedToScore }: FaliedToScoreProps) => {
  return (
    <Card sx={{ marginTop: 4 }}>
      <CardContent>
        <Typography variant='h6'>Failed to Score</Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography
              variant='body2'
              noWrap
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              Home Games:
            </Typography>
            <Typography variant='h4'>{faliedToScore.home}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography
              variant='body2'
              noWrap
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              Away Games:
            </Typography>
            <Typography variant='h4'>{faliedToScore.away}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography
              variant='body2'
              noWrap
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              Total Games:
            </Typography>
            <Typography variant='h4'>{faliedToScore.total}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
