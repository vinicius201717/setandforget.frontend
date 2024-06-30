// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const BillingHistoryTable = () => {
  return (
    <Card>
      <CardHeader title='Billing History' />
      <Divider sx={{ m: '0 !important' }} />
      <CardContent>
        <Box
          sx={{
            gap: 4,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Button
            component={Link}
            variant='contained'
            href='/apps/invoice/add'
            startIcon={<Icon icon='mdi:plus' />}
          >
            Create Invoice
          </Button>
          <Box
            sx={{
              gap: 4,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            <TextField size='small' placeholder='Search Invoice' />
            <FormControl size='small'>
              <InputLabel id='invoice-status-select'>Invoice Status</InputLabel>
            </FormControl>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default BillingHistoryTable
