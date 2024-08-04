import * as React from 'react'
import Box from '@mui/material/Box'
import { DepositMethod } from 'src/components/deposit/DepositMethod'
import { Grid } from '@mui/material'

export default function DepositPage() {
  return (
    <Grid container spacing={3} justifyContent='center' alignItems='center'>
      <Grid item xs={12} md={6}>
        <Box>
          <React.Fragment>
            <DepositMethod />
          </React.Fragment>
        </Box>
      </Grid>
    </Grid>
  )
}
