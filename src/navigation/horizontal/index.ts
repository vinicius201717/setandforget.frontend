// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => {
  return [
    {
      title: 'Classes',
      icon: 'mdi:chart-box-outline',
      path: '/dashboards/classes',
    },
    {
      title: 'Assessment',
      icon: 'mdi:chart-box-outline',
      path: '/assessment',
    },
    {
      title: 'New Post',
      icon: 'mdi:note-edit-outline',
      path: '/admin/new-post',
    },
  ]
}

export default navigation
