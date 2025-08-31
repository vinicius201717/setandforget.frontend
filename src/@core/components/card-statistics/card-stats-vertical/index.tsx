// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import OptionsMenu from 'src/@core/components/option-menu'

import { CardStatsVerticalProps } from 'src/@core/components/card-statistics/types'
import { DashboardChessData } from 'src/types/apps/dashboardType'

interface ExtendedCardStatsVerticalProps
  extends Partial<CardStatsVerticalProps> {
  data?: DashboardChessData
}

const CardStatsVertical = (props: ExtendedCardStatsVerticalProps) => {
  // ** Props
  const {
    title,
    subtitle,
    icon,
    stats,
    trendNumber,
    optionsMenuProps,
    color = 'primary',
    trend = 'positive',
    data,
  } = props

  // If 'data' is provided, override or calculate props based on it
  const finalStats = data ? data.netProfit.toString() : stats
  const finalTrendNumber = data
    ? `${data.profitPercentage >= 0 ? '+' : ''}${data.profitPercentage.toFixed(2)}%`
    : trendNumber
  const finalTrend = data
    ? data.profitPercentage >= 0
      ? 'positive'
      : 'negative'
    : trend
  const finalTitle = data ? 'Total Profit' : title
  const finalSubtitle = data ? 'Profit' : subtitle

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            mb: 5.5,
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          <CustomAvatar color={color} sx={{ boxShadow: 3, mr: 4 }}>
            {icon}
          </CustomAvatar>
          {optionsMenuProps ? (
            <OptionsMenu {...optionsMenuProps} />
          ) : (
            <OptionsMenu
              options={['Refresh', 'Share', 'Update']}
              iconButtonProps={{
                size: 'small',
                className: 'card-more-options',
                sx: { color: 'text.secondary' },
              }}
            />
          )}
        </Box>
        <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
          {finalTitle}
        </Typography>
        <Box
          sx={{
            mt: 1.5,
            display: 'flex',
            flexWrap: 'wrap',
            mb: 1.5,
            alignItems: 'flex-start',
          }}
        >
          <Typography variant='h6' sx={{ mr: 2 }}>
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(Number(finalStats))}
          </Typography>

          <Typography
            component='sup'
            variant='caption'
            sx={{
              color: finalTrend === 'positive' ? 'success.main' : 'error.main',
            }}
          >
            {finalTrendNumber}
          </Typography>
        </Box>
        <Typography variant='caption'>{finalSubtitle}</Typography>
      </CardContent>
    </Card>
  )
}

export default CardStatsVertical
