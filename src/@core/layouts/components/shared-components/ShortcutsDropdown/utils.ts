import { ResponseCreateType } from 'src/context/types'
import { ShortcutsType } from '.'

const shortcuts: ShortcutsType[] = [
  {
    title: 'Chess',
    url: '/chess/',
    subtitle: 'Chess Play',
    icon: 'mdi:chess-knight',
  },
  {
    title: 'Profile',
    url: '/pages/user-profile/profile/',
    subtitle: 'Page Profile',
    icon: 'mdi:account',
  },
  {
    url: '/dashboards/analytics/',
    title: 'Dashboard',
    icon: 'mdi:chart-pie',
    subtitle: 'User Dashboard',
  },
  {
    title: 'Settings',
    icon: 'mdi:cog-outline',
    subtitle: 'Account Settings',
    url: '/pages/account-settings/account/',
  },
  {
    title: 'Settings',
    icon: 'mdi:lock',
    subtitle: 'Account Security',
    url: '/pages/account-settings/security/',
  },
  {
    title: 'Settings',
    icon: 'mdi:credit-card',
    subtitle: 'Account Billing',
    url: '/pages/account-settings/billing/',
  },
  {
    title: 'Settings',
    icon: 'mdi:bell',
    subtitle: 'Account Notifications',
    url: '/pages/account-settings/notifications/',
  },
  {
    title: 'Settings',
    icon: 'mdi:share',
    subtitle: 'Account Connections',
    url: '/pages/account-settings/connections/',
  },
  {
    title: 'Settings',
    icon: 'mdi:signature',
    subtitle: 'Signature',
    url: '/pages/pricing/',
  },
  {
    title: 'Deposit/Withdraw',
    icon: 'mdi:currency-usd',
    subtitle: 'Money',
    url: '/pages/deposit/',
  },
  {
    title: 'Transactions',
    icon: 'mdi:bank-transfer',
    subtitle: 'Deposits and Withdraw',
    url: '/pages/transactions/',
  },
]

export function getData(url: string) {
  return shortcuts.find((item) => item.url === url)
}

export function locateShortcutById(
  url: string,
  shortcuts: ResponseCreateType[] | null | undefined,
): ResponseCreateType | undefined {
  if (shortcuts) {
    return shortcuts.find((item) => item.url === url)
  }
  return undefined
}
