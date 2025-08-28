// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

interface CardStatsLineChartProps {
  amount: number // valor principal do card
  seriesData: number[] // dados do gráfico
  title?: string // título do card
}

const CardStatsLineChart = ({
  amount,
  seriesData,
  title = 'Total Profit',
}: CardStatsLineChartProps) => {
  const theme = useTheme()

  const series = [{ data: seriesData || [] }]

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    tooltip: { enabled: false },
    grid: {
      strokeDashArray: 6,
      borderColor: theme.palette.divider,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: false } },
      padding: { top: -10, left: -7, right: 5, bottom: 5 },
    },
    stroke: {
      width: 3,
      lineCap: 'butt',
      curve: 'straight',
    },
    colors: [theme.palette.primary.main],
    markers: {
      size: 6,
      offsetY: 4,
      offsetX: -2,
      strokeWidth: 3,
      colors: ['transparent'],
      strokeColors: 'transparent',
      discrete: [
        {
          size: 5.5,
          seriesIndex: 0,
          strokeColor: theme.palette.primary.main,
          fillColor: theme.palette.background.paper,
          dataPointIndex: (seriesData?.length ?? 1) - 1,
        },
      ],
      hover: { size: 7 },
    },
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false },
    },
    yaxis: { labels: { show: false } },
  }

  return (
    <Card>
      <CardContent>
        <Typography variant='h6'>{`R$ ${(amount || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}</Typography>
        <ReactApexcharts
          type='line'
          height={98}
          options={options}
          series={series}
        />
        <Typography
          variant='body2'
          sx={{ fontWeight: 600, textAlign: 'center', color: 'text.primary' }}
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CardStatsLineChart
