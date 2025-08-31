// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { DashboardChessData } from 'src/types/apps/dashboardType'

type Props = {
  data?: DashboardChessData
}

const CardStatsDistributedColumnChart = ({ data }: Props) => {
  const theme = useTheme()

  const categories = [
    `${data?.totalWins} Win`,
    `${data?.totalLosses} Loss`,
    `${data?.totalDraws} Draw`,
  ]

  const series = [
    {
      name: 'Games',
      data: [
        data?.totalWins || 0,
        data?.totalLosses || 0,
        data?.totalDraws || 0,
      ],
    },
  ]

  const options: ApexOptions = {
    chart: { type: 'bar', toolbar: { show: false }, parentHeightOffset: 0 },
    grid: { show: false, padding: { top: -10, left: -7, right: 0, bottom: 5 } },
    states: {
      hover: { filter: { type: 'none' } },
      active: { filter: { type: 'none' } },
    },
    legend: { show: false },
    dataLabels: { enabled: false },
    colors: [
      theme.palette.success.main,
      theme.palette.error.main,
      theme.palette.info.main,
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '30%',
        borderRadius: 6,
        startingShape: 'rounded',
        endingShape: 'rounded',
        distributed: true,
        colors: {
          backgroundBarRadius: 6,
          backgroundBarColors: [
            theme.palette.customColors.trackBg,
            theme.palette.customColors.trackBg,
            theme.palette.customColors.trackBg,
          ],
        },
      },
    },
    xaxis: {
      categories,
      labels: {
        show: true,
        style: {
          fontSize: '10px',
          colors: [
            theme.palette.getContrastText(theme.palette.background.default),
            theme.palette.getContrastText(theme.palette.background.default),
            theme.palette.getContrastText(theme.palette.background.default),
          ],
        },
      },
      axisTicks: { show: false },
      axisBorder: { show: false },
    },
    yaxis: { show: false, max: data?.totalMatches || undefined },
  }

  return (
    <Card>
      <CardContent>
        <Typography variant='body2'>
          Total games {data?.totalMatches || 0}
        </Typography>

        <ReactApexcharts
          type='bar'
          height={120}
          options={options}
          series={series}
        />
      </CardContent>
    </Card>
  )
}

export default CardStatsDistributedColumnChart
