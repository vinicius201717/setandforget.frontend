/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Icon from 'src/@core/components/icon'
import { ThemeColor } from 'src/@core/layouts/types'
import CustomAvatar from 'src/@core/components/mui/avatar'
import {
  PaymentSummary,
  PaymentSummaryUnic,
} from 'src/types/apps/dashboardType'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'

interface AnalyticsTransactionsCardProps {
  summary: PaymentSummary | null
}

interface DataType {
  stats: string
  title: string
  color: ThemeColor
  icon: React.ReactElement
}

const renderStats = (summary: PaymentSummaryUnic | null) => {
  if (!summary) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          py: 4,
        }}
      >
        <Typography variant='h6' sx={{ mb: 1, color: 'text.secondary' }}>
          No data available at the moment.
        </Typography>
        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
          Try selecting another period! 😊
        </Typography>
      </Box>
    )
  }

  const data: DataType[] = [
    {
      stats: summary.totalDeposits.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
      }),
      title: 'Deposited Amount',
      color: 'primary',
      icon: <Icon icon='mdi:currency-usd' />,
    },
    {
      stats: summary.totalWithdrawals.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
      }),
      title: 'Total Withdrawals',
      color: 'primary',
      icon: <Icon icon='mdi:currency-usd' />,
    },
    {
      stats: summary.profit.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
      }),
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
      stats:
        summary.profitPercentage % 1 === 0
          ? `${summary.profitPercentage.toFixed(0)}%`
          : `${summary.profitPercentage.toFixed(2)}%`,
      title: 'Profit percentage',
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

// Wrapper para lidar com o menu de opções
const CustomOptionsMenu = ({
  options,
  iconButtonProps,
  onOptionSelect,
}: {
  options: string[]
  iconButtonProps: { size: 'small'; sx: { color: string } }
  onOptionSelect: (option: string) => void
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleOptionClick = (option: string) => {
    onOptionSelect(option)
    handleClose()
  }

  return (
    <>
      <IconButton {...iconButtonProps} onClick={handleClick}>
        <Icon icon='mdi:dots-vertical' />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {options.map((option) => (
          <MenuItem key={option} onClick={() => handleOptionClick(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

const AnalyticsTransactionsCard = ({
  summary: initialSummary,
}: AnalyticsTransactionsCardProps) => {
  // Inicializa o estado com o summary inicial
  const [summary, setSummary] = useState<PaymentSummaryUnic | null>(null)
  const [selectedPeriod, setSelectedPeriod] = useState<string>('')

  // Função para lidar com a seleção de opções
  const handleOptionSelect = (option: string) => {
    switch (option) {
      case 'Last Week': {
        const data: PaymentSummaryUnic = {
          daily: [],
          depositCount: initialSummary?.lastWeek?.depositCount || 0,
          hasMoreThan1000: initialSummary?.lastWeek?.hasMoreThan1000 || false,
          isPositive: initialSummary?.lastWeek?.isPositive || false,
          profit: initialSummary?.lastWeek?.profit || 0,
          amountAccount: initialSummary?.amountAccount || 0,
          profitPercentage: initialSummary?.lastWeek?.profitPercentage || 0,
          totalDeposits: initialSummary?.lastWeek?.totalDeposits || 0,
          withdrawalCount: initialSummary?.lastWeek?.withdrawalCount || 0,
          totalWithdrawals: initialSummary?.lastWeek?.totalWithdrawals || 0,
        }
        setSummary(data)
        break
      }
      case 'Last Month': {
        const data: PaymentSummaryUnic = {
          daily: [],
          depositCount: initialSummary?.lastMonth?.depositCount || 0,
          hasMoreThan1000: initialSummary?.lastMonth?.hasMoreThan1000 || false,
          isPositive: initialSummary?.lastMonth?.isPositive || false,
          profit: initialSummary?.lastMonth?.profit || 0,
          amountAccount: initialSummary?.amountAccount || 0,
          profitPercentage: initialSummary?.lastMonth?.profitPercentage || 0,
          totalDeposits: initialSummary?.lastMonth?.totalDeposits || 0,
          withdrawalCount: initialSummary?.lastMonth?.withdrawalCount || 0,
          totalWithdrawals: initialSummary?.lastMonth?.totalWithdrawals || 0,
        }
        setSummary(data)
        break
      }
      case 'Last Year': {
        const data: PaymentSummaryUnic = {
          daily: [],
          depositCount: initialSummary?.lastYear?.depositCount || 0,
          hasMoreThan1000: initialSummary?.lastYear?.hasMoreThan1000 || false,
          isPositive: initialSummary?.lastYear?.isPositive || false,
          profit: initialSummary?.lastYear?.profit || 0,
          amountAccount: initialSummary?.amountAccount || 0,
          profitPercentage: initialSummary?.lastYear?.profitPercentage || 0,
          totalDeposits: initialSummary?.lastYear?.totalDeposits || 0,
          withdrawalCount: initialSummary?.lastYear?.withdrawalCount || 0,
          totalWithdrawals: initialSummary?.lastYear?.totalWithdrawals || 0,
        }
        setSummary(data)
        break
      }
      default:
        break
    }
    setSelectedPeriod(option)
  }

  useEffect(() => {
    const data: PaymentSummaryUnic = {
      daily: initialSummary?.daily || [],
      depositCount: initialSummary?.depositCount || 0,
      hasMoreThan1000: initialSummary?.hasMoreThan1000 || false,
      isPositive: initialSummary?.isPositive || false,
      profit: initialSummary?.profit || 0,
      amountAccount: initialSummary?.amountAccount || 0,
      profitPercentage: initialSummary?.profitPercentage || 0,
      totalDeposits: initialSummary?.totalDeposits || 0,
      withdrawalCount: initialSummary?.withdrawalCount || 0,
      totalWithdrawals: initialSummary?.totalWithdrawals || 0,
    }
    setSummary(data)
  }, [initialSummary])

  return (
    <Card>
      <CardHeader
        title='Transactions'
        action={
          <CustomOptionsMenu
            options={['Last Week', 'Last Month', 'Last Year']}
            iconButtonProps={{ size: 'small', sx: { color: 'text.primary' } }}
            onOptionSelect={handleOptionSelect}
          />
        }
        subheader={
          <Typography variant='body2'>
            <Box
              component='span'
              sx={{ fontWeight: 600, color: 'text.primary' }}
            >
              Total {summary?.profitPercentage.toFixed(1) || '0.0'}% growth
            </Box>{' '}
            😎 this {selectedPeriod.toLowerCase()}
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
