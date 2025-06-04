// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => {
  return [
    {
      icon: 'mdi:chart-timeline-variant',
      title: 'Analytics',
      path: '/dashboards/analytics',
    },
    {
      title: 'Assessment',
      icon: 'mdi:chart-box-outline',
      path: '/assessment',
    },
    // {
    //   title: 'Football',
    //   path: '/sports/football',
    // },
    {
      title: 'Chess',
      icon: 'streamline:chess-knight',
      path: '/chess',
    },
    {
      title: 'Assessment',
      icon: 'mdi:chart-box-outline',
      path: '/chess',
    },
  ]
}

export default navigation
