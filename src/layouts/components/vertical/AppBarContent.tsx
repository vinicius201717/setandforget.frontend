/* eslint-disable no-unused-vars */
// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Components
import Autocomplete from 'src/layouts/components/Autocomplete'
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import LanguageDropdown from 'src/@core/layouts/components/shared-components/LanguageDropdown'
import ShortcutsDropdown from 'src/@core/layouts/components/shared-components/ShortcutsDropdown'

// ** Hook Import
import { useAuth } from 'src/hooks/useAuth'
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'
import { useEffect, useState } from 'react'
import { getShortcuts } from 'src/pages/api/shortcuts/getShortcuts'
import { ResponseCreateType } from 'src/context/types'

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}

const AppBarContent = (props: Props) => {
  const [shortcuts, setShortcuts] = useState<ResponseCreateType[] | null>()
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props

  // ** Hook
  const auth = useAuth()

  useEffect(() => {
    getShortcuts()
      .then((response: any) => {
        if (response) {
          setShortcuts(response)
        }
      })
      .catch((error) => {
        console.error('Failed to fetch shortcuts:', error)
      })
  }, [])

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box
        className='actions-left'
        sx={{ mr: 2, display: 'flex', alignItems: 'center' }}
      >
        {hidden && !settings.navHidden ? (
          <IconButton
            color='inherit'
            sx={{ ml: -2.75 }}
            onClick={toggleNavVisibility}
          >
            <Icon icon='mdi:menu' />
          </IconButton>
        ) : null}
        {auth.user && <Autocomplete hidden={hidden} settings={settings} />}
      </Box>
      <Box
        className='actions-right'
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <LanguageDropdown settings={settings} saveSettings={saveSettings} />
        <ModeToggler settings={settings} saveSettings={saveSettings} />
        {auth.user && (
          <>
            <ShortcutsDropdown
              settings={settings}
              shortcuts={shortcuts}
              setShortcuts={setShortcuts}
            />
            <NotificationDropdown
              settings={settings}
              notifications={auth.notifications}
            />
            <UserDropdown settings={settings} />
          </>
        )}
      </Box>
    </Box>
  )
}

export default AppBarContent
