import { Icon } from '@iconify/react'
import { Box } from '@mui/material'
const deviceBrowserIcons = [
  {
    deviceName: 'Windows',
    browserIcon: (
      <Box component='span' sx={{ mr: 2.5 }}>
        <Icon icon='mdi:microsoft-windows' fontSize={20} />
      </Box>
    ),
  },
  {
    deviceName: 'MacOS',
    browserIcon: (
      <Box component='span' sx={{ mr: 2.5 }}>
        <Icon icon='mdi:apple' fontSize={20} />
      </Box>
    ),
  },
  {
    deviceName: 'Android',
    browserIcon: (
      <Box component='span' sx={{ mr: 2.5 }}>
        <Icon icon='mdi:android' fontSize={20} />
      </Box>
    ),
  },
  {
    deviceName: 'iPhone',
    browserIcon: (
      <Box component='span' sx={{ mr: 2.5 }}>
        <Icon icon='mdi:apple' fontSize={20} />
      </Box>
    ),
  },
  {
    deviceName: 'iPad',
    browserIcon: (
      <Box component='span' sx={{ mr: 2.5 }}>
        <Icon icon='mdi:tablet-ipad' fontSize={20} />
      </Box>
    ),
  },
  {
    deviceName: 'PlayStation',
    browserIcon: (
      <Box component='span' sx={{ mr: 2.5 }}>
        <Icon icon='mdi:playstation' fontSize={20} />
      </Box>
    ),
  },
  {
    deviceName: 'Xbox',
    browserIcon: (
      <Box component='span' sx={{ mr: 2.5 }}>
        <Icon icon='mdi:xbox' fontSize={20} />
      </Box>
    ),
  },
  {
    deviceName: 'Chromebook',
    browserIcon: (
      <Box component='span' sx={{ mr: 2.5 }}>
        <Icon icon='mdi:laptop-chromebook' fontSize={20} />
      </Box>
    ),
  },
]

export const defaultIcon = [
  {
    icon: (
      <Box component='span' sx={{ mr: 2.5 }}>
        <Icon icon='mdi:earth' fontSize={20} />
      </Box>
    ),
  },
]

export default deviceBrowserIcons
