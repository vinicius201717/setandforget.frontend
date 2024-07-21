// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

import PageHeader from 'src/@core/components/page-header'
import ChessHistoryTableCustomized from 'src/views/pages/chess/ChessHistoryTableCustomized'

const StyledAnchor = styled('a')(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main,
}))

const Transactions = () => {
  return (
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography variant='h5'>
            <StyledAnchor target='_blank'>Chess game history</StyledAnchor>
          </Typography>
        }
        subtitle={<Typography variant='body2'>game story</Typography>}
      />
      <Grid item xs={12}>
        <Card>
          <ChessHistoryTableCustomized />
        </Card>
      </Grid>
    </Grid>
  )
}

export default Transactions
