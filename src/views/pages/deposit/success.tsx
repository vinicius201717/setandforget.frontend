import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Link from 'next/link'

export function SuccessPage() {
  return (
    <Container
      maxWidth='sm'
      sx={{
        mt: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant='h3' component='h1' gutterBottom>
        Deposit Successful
      </Typography>
      <Typography variant='h6' gutterBottom>
        Your deposit has been processed.
      </Typography>
      <Link href='/pages/transactions' passHref>
        <Button variant='contained' color='primary' sx={{ mt: 3 }}>
          See transactions
        </Button>
      </Link>
    </Container>
  )
}
