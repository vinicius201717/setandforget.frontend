// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => {
  return [
    {
      icon: 'mdi:home-outline',
      title: 'Home DESENVOLVIMENTO',
      path: '/pages/home',
    },
    {
      icon: 'mdi:book-open-page-variant',
      title: 'Learging',
      path: '/pages/learning',
    },
    {
      icon: 'mdi:check-box-multiple-outline',
      title: 'Checklist',
      path: '/pages/checklist',
    },
    {
      icon: 'mdi:rss-box',
      title: 'Results',
      path: '/pages/feed',
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
    {
      title: 'New Post',
      icon: 'mdi:note-edit-outline',
      path: '/admin/new-post',
      role: 'admin',
    },
  ]
}

export default navigation
