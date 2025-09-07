import { useState } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useTheme } from '@mui/material/styles'
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const series = [
  { name: 'Income', data: [70, 90, 90, 100] },
  { name: 'Net Worth', data: [120, 80, 100, 80, 100, 80] },
]

const CardWidgetsPerformance = () => {
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (option?: string) => {
    setAnchorEl(null)
    if (option) alert(`Selecionou: ${option}`)
  }

  const options = ['chess']

  const apexOptions = {
    chart: { parentHeightOffset: 0, toolbar: { show: false } },
    colors: [theme.palette.primary.main, theme.palette.info.main],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        gradientToColors: [theme.palette.primary.dark, theme.palette.info.dark],
        shadeIntensity: 0.5,
        type: 'vertical',
        opacityFrom: 0.9,
        opacityTo: 0.8,
        stops: [0, 100],
      },
    },
    stroke: { width: 2 },
    markers: { size: 4 },
    plotOptions: {
      radar: {
        polygons: {
          strokeColors: theme.palette.divider,
          fill: { colors: ['transparent'] },
        },
      },
    },
    legend: { labels: { colors: theme.palette.text.primary } },
    yaxis: { show: false }, // números do eixo Y desativados
    xaxis: { labels: { style: { colors: theme.palette.text.secondary } } },
  }

  return (
    <Card>
      <CardHeader
        title='Performance'
        action={
          <>
            <IconButton onClick={handleOpen}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => handleClose()}
            >
              {options.map((option) => (
                <MenuItem key={option} onClick={() => handleClose(option)}>
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </>
        }
      />
      <CardContent>
        <ReactApexcharts
          type='radar'
          height={305}
          series={series}
          options={apexOptions}
        />
      </CardContent>
    </Card>
  )
}

export default CardWidgetsPerformance
