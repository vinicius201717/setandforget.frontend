// ** MUI Imports
import Box from '@mui/material/Box'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Components
import Autocomplete from 'src/layouts/components/Autocomplete'
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import LanguageDropdown from 'src/@core/layouts/components/shared-components/LanguageDropdown'

// ** Hook Import
import { useAuth } from 'src/hooks/useAuth'
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'
import ShortcutsDropdown from 'src/@core/layouts/components/shared-components/ShortcutsDropdown'
import { useEffect, useState } from 'react'
import { getShortcuts } from 'src/pages/api/shortcuts/getShortcuts'
import { ResponseCreateType } from 'src/context/types'
import MoneyDropdown from 'src/@core/layouts/components/shared-components/MoneyDropdown'

interface Props {
  hidden: boolean
  settings: Settings
  // eslint-disable-next-line no-unused-vars
  saveSettings: (values: Settings) => void
}

const AppBarContent = (props: Props) => {
  const [shortcuts, setShortcuts] = useState<ResponseCreateType[] | null>()
  // ** Props
  const { hidden, settings, saveSettings } = props

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
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {auth.user && <Autocomplete hidden={hidden} settings={settings} />}
      <MoneyDropdown settings={settings} />
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
  )
}

export default AppBarContent
