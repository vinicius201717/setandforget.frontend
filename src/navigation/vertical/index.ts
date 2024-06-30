// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      sectionTitle: 'Dashboard',
    },
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
    {
      sectionTitle: 'Jogos',
    },
    {
      title: 'Football',
      icon: 'ph:soccer-ball-thin',
      path: '/sports/football',
    },
    {
      title: 'Chess',
      icon: 'streamline:chess-knight',
      path: '/chess',
    },
  ]
}

export default navigation
