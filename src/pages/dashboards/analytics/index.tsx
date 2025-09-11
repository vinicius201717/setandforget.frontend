// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import AnalyticsTable from 'src/views/dashboards/analytics/AnalyticsTable'
import AnalyticsTrophy from 'src/views/dashboards/analytics/AnalyticsTrophy'
import AnalyticsSessions from 'src/views/dashboards/analytics/AnalyticsSessions'
import AnalyticsTotalProfit from 'src/views/dashboards/analytics/AnalyticsTotalProfit'
import AnalyticsTotalEarning from 'src/views/dashboards/analytics/AnalyticsTotalEarning'
import AnalyticsWeeklyOverview from 'src/views/dashboards/analytics/AnalyticsWeeklyOverview'
import AnalyticsDepositWithdraw from 'src/views/dashboards/analytics/AnalyticsDepositWithdraw'
import AnalyticsTransactionsCard from 'src/views/dashboards/analytics/AnalyticsTransactionsCard'
import { useEffect, useState } from 'react'
import { getDashboardTransactionsData } from 'src/pages/api/dashboard/getTransactionsData'
import {
  DashboardChessData,
  DepositWithdrawResponse,
  PaymentSummary,
  UserRankings,
} from 'src/types/apps/dashboardType'
import { getDashboardChessData } from 'src/pages/api/dashboard/getChessData'
import CardStatsVertical from 'src/@core/components/card-statistics/card-stats-vertical'
import CardStatsRatingVertical from 'src/@core/components/card-statistics/card-stats-vertical/rating'
import { useAuth } from 'src/hooks/useAuth'
import { getDashboardDepositWithdraw } from 'src/pages/api/dashboard/getDepositWithdraw'

const AnalyticsDashboard = () => {
  const [summary, setSummary] = useState<PaymentSummary | null>(null)
  const [game, setGame] = useState<DashboardChessData>()
  const [depositWithdraw, setDepositWithdraw] =
    useState<DepositWithdrawResponse>({
      deposits: [],
      withdrawls: [],
    })

  const { user } = useAuth()
  const amount = user?.Account?.amount ? user.Account.amount / 100 : 0

  useEffect(() => {
    getDashboardTransactionsData().then((response) => {
      setSummary(response)
    })
    getDashboardChessData().then((response) => {
      setGame(response)
    })
    getDashboardDepositWithdraw().then((response) => {
      setDepositWithdraw(response)
    })
  }, [])
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <AnalyticsTrophy name={user?.name as string} amount={amount} />
        </Grid>
        <Grid item xs={12} md={8}>
          <AnalyticsTransactionsCard summary={summary} />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <AnalyticsWeeklyOverview />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <AnalyticsTotalEarning rankings={game?.rankings as UserRankings} />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <AnalyticsTotalProfit
                amount={game?.netProfit as number}
                seriesData={game?.lastTwentyGames as number[]}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatsVertical
                data={game}
                stats={game?.netProfit.toString() as string}
                icon={<Icon icon='mdi:poll' />}
                color='secondary'
                trendNumber='+42%'
                title='Total Profit'
                subtitle='Weekly Profit'
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatsRatingVertical
                title='Rating'
                rating={game?.rating}
                icon={<Icon icon='mdi:briefcase-variant-outline' />}
              />
            </Grid>
            <Grid item xs={6}>
              <AnalyticsSessions data={game as DashboardChessData} />
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid item xs={12} md={4}>
          <AnalyticsSalesByCountries />
        </Grid> */}
        {/* <Grid item xs={12} md={6} lg={4}>
          <AnalyticsPerformance />
        </Grid> */}
        <Grid item xs={12} md={8}>
          <AnalyticsDepositWithdraw depositWithdraw={depositWithdraw} />
        </Grid>

        <Grid item xs={12} md={12} lg={8}>
          <AnalyticsTable />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default AnalyticsDashboard
