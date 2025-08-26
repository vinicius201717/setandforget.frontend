import { ReactElement } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Icon from 'src/@core/components/icon'
import { ThemeColor } from 'src/@core/layouts/types'
import OptionsMenu from 'src/@core/components/option-menu'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { PaymentSummary } from 'src/types/apps/dashboardType'

interface AnalyticsTransactionsCardProps {
  summary: PaymentSummary | null
}

interface DataType {
  stats: string
  title: string
  color: ThemeColor
  icon: ReactElement
}

const renderStats = (summary: PaymentSummary | null) => {
  if (!summary) {
    return <Typography variant='caption'>No data available</Typography>
  }
  const data: DataType[] = [
    {
      stats: summary.totalDeposits.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
      }),
      title: 'Deposit Amount',
      color: 'primary',
      icon: <Icon icon='mdi:currency-usd' />,
    },
    {
      stats: summary.totalWithdrawals.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
      }),
      title: 'Withdrawl total',
      color: 'primary',
      icon: <Icon icon='mdi:currency-usd' />,
    },
    {
      stats: `${summary.profit.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
      })}`,
      title: 'Profit',
      color: summary.profit >= 0 ? 'success' : 'error',
      icon: (
        <Icon
          icon={summary.profit >= 0 ? 'mdi:trending-up' : 'mdi:trending-down'}
          style={{
            color: summary.profit >= 0 ? '#16a34a' : '#dc2626',
            backgroundColor: summary.profit >= 0 ? '#dcfce7' : '#fee2e2',
            borderRadius: '50%',
            padding: '6px',
          }}
        />
      ),
    },
    {
      stats: `${summary.profitPercentage.toFixed(2)}%`,
      title: 'Deposits > $1000',
      color: 'info',
      icon: <Icon icon='mdi:check-circle' />,
    },
  ]

  return data.map((item: DataType, index: number) => (
    <Grid item xs={12} sm={3} key={index}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <CustomAvatar
          variant='rounded'
          color={item.color}
          sx={{
            mr: 3,
            boxShadow: 3,
            width: 44,
            height: 44,
            '& svg': { fontSize: '1.75rem' },
          }}
        >
          {item.icon}
        </CustomAvatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='caption'>{item.title}</Typography>
          <Typography variant='h6'>{item.stats}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}

const AnalyticsTransactionsCard = ({
  summary,
}: AnalyticsTransactionsCardProps) => {
  return (
    <Card>
      <CardHeader
        title='Transactions'
        action={
          <OptionsMenu
            options={['Last 28 Days', 'Last Month', 'Last Year']}
            iconButtonProps={{ size: 'small', sx: { color: 'text.primary' } }}
          />
        }
        subheader={
          <Typography variant='body2'>
            <Box
              component='span'
              sx={{ fontWeight: 600, color: 'text.primary' }}
            >
              Total 48.5% growth
            </Box>{' '}
            😎 this month
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important',
          },
        }}
      />
      <CardContent sx={{ pt: (theme) => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats(summary)}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default AnalyticsTransactionsCard
