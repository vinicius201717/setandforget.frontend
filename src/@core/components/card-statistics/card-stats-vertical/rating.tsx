// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

import { CardStatsVerticalProps } from 'src/@core/components/card-statistics/types'
import Link from 'next/link'

interface ExtendedCardStatsVerticalProps
  extends Partial<CardStatsVerticalProps> {
  rating?: number
}

const CardStatsRatingVertical = (props: ExtendedCardStatsVerticalProps) => {
  const { title, icon, rating = 0 } = props

  return (
    <Card>
      <CardContent>
        {/* Avatar e ícone */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            mb: 3,
          }}
        >
          <CustomAvatar
            color='primary'
            sx={{ boxShadow: 3, mr: 3, width: 48, height: 48 }}
          >
            {icon}
          </CustomAvatar>
          <Typography sx={{ fontWeight: 700, fontSize: '1rem' }}>
            {title}
          </Typography>
        </Box>

        {/* Rating */}
        {rating !== undefined && (
          <Typography
            variant='h4'
            sx={{ fontWeight: 700, color: 'primary.main', mb: 2 }}
          >
            {rating}
          </Typography>
        )}

        <Link href={'/chess'}>
          <Button
            rel='noopener'
            variant='contained'
            size='small'
            sx={{ textTransform: 'none' }}
          >
            {'Chess'}
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

export default CardStatsRatingVertical
