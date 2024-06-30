import * as React from 'react'
import Box from '@mui/material/Box'
import { DepositMethod } from 'src/components/deposit/DepositMethod'

export default function DepositPage() {
  return (
    <Box sx={{ width: '100%' }}>
      <React.Fragment>
        <DepositMethod />
      </React.Fragment>
    </Box>
  )
}
