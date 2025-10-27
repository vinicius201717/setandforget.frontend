// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      sectionTitle: 'Dashboard',
    },
    {
      icon: 'mdi:chart-timeline-variant',
      title: 'Classes',
      path: '/dashboards/classes',
    },
    {
      title: 'Assessment',
      icon: 'mdi:chart-box-outline',
      path: '/assessment',
    },

    {
      sectionTitle: 'Administration',
    },
    {
      title: 'New Post',
      icon: 'mdi:note-edit-outline',
      path: '/admin/new-post',
    },
  ]
}

export default navigation
