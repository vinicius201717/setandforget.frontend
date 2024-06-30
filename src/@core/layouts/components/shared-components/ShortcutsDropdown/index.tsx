/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useState, SyntheticEvent, Fragment, ReactNode } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Components

// ** Type Imports
import { Settings } from 'src/@core/context/settingsContext'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import { Menu, MenuItem, PerfectScrollbar } from './style'
import { getData, locateShortcutById } from './utils'
import { createShortcuts } from 'src/pages/api/shortcuts/createShortcuts'
import toast from 'react-hot-toast'
import { removeShortcut } from 'src/pages/api/shortcuts/removeshortcuts'
import { ResponseCreateType } from 'src/context/types'

export type ShortcutsType = {
  url: string
  icon: string
  title: string
  subtitle: string
}

interface Props {
  settings: Settings
  shortcuts: ResponseCreateType[] | null | undefined
  setShortcuts: (value: any) => void
}

// ** Styled Menu component

const ScrollWrapper = ({
  children,
  hidden,
}: {
  children: ReactNode
  hidden: boolean
}) => {
  if (hidden) {
    return (
      <Box sx={{ maxHeight: '30rem', overflowY: 'auto', overflowX: 'hidden' }}>
        {children}
      </Box>
    )
  } else {
    return (
      <PerfectScrollbar
        options={{ wheelPropagation: false, suppressScrollX: true }}
      >
        {children}
      </PerfectScrollbar>
    )
  }
}

const ShortcutsDropdown = (props: Props) => {
  // ** Props
  const { shortcuts, settings, setShortcuts } = props

  // ** States
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null)

  // ** Hook
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  // ** Vars
  const { direction } = settings

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = () => {
    setAnchorEl(null)
  }

  const onAddShortcut = () => {
    const data: ShortcutsType = getData(
      window.location.pathname,
    ) as ShortcutsType
    createShortcuts(data, shortcuts as ResponseCreateType[]).then(
      (response: ResponseCreateType | null | undefined) => {
        if (response) {
          setShortcuts((currentShortcuts: ResponseCreateType[]) => [
            ...currentShortcuts,
            response,
          ])
          toast.success('Shortcut created successfully.', {
            position: 'bottom-right',
          })
        } else if (response === null) {
          toast.error('Error creating shortcut.', {
            position: 'bottom-right',
          })
        }
      },
    )
  }

  const onRemoveShortcut = () => {
    const url = window.location.pathname
    const shortcut = locateShortcutById(url, shortcuts)
    if (shortcut) {
      removeShortcut(shortcut.id).then((response) => {
        if (response) {
          setShortcuts((currentShortcuts: ResponseCreateType[]) =>
            currentShortcuts.filter((item) => item.id !== shortcut.id),
          )
          toast.success('Shortcut removed successfully.', {
            position: 'bottom-right',
          })
        } else {
          toast.error('Error removing shortcut.', {
            position: 'bottom-right',
          })
        }
      })
    }
  }

  return (
    <Fragment>
      <IconButton
        color='inherit'
        aria-haspopup='true'
        onClick={handleDropdownOpen}
        aria-controls='customized-menu'
      >
        <Icon icon='mdi:view-grid-outline' />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: direction === 'ltr' ? 'right' : 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: direction === 'ltr' ? 'right' : 'left',
        }}
      >
        <MenuItem
          disableRipple
          disableTouchRipple
          sx={{
            cursor: 'default',
            userSelect: 'auto',
            backgroundColor: 'transparent !important',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Typography
              sx={{
                fontSize: '1.125rem',
                color: 'text.secondary',
                fontWeight: 600,
              }}
            >
              Shortcuts
            </Typography>
            <Box>
              <Tooltip title='Remove Shortcut' placement='top'>
                <IconButton disableRipple onClick={onRemoveShortcut}>
                  <Icon icon='mdi:minus-circle-outline' />
                </IconButton>
              </Tooltip>
              <Tooltip title='Add Shortcut' placement='top'>
                <IconButton disableRipple onClick={onAddShortcut}>
                  <Icon icon='mdi:plus-circle-outline' />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </MenuItem>
        <Divider sx={{ my: '0 !important' }} />
        <ScrollWrapper hidden={hidden}>
          <Grid
            container
            spacing={0}
            sx={{
              '& .MuiGrid-root': {
                borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                '&:nth-of-type(odd)': {
                  borderRight: (theme) => `1px solid ${theme.palette.divider}`,
                },
              },
            }}
          >
            {shortcuts?.map((shortcut) => (
              <Grid
                item
                xs={6}
                key={shortcut.title}
                onClick={handleDropdownClose}
                sx={{
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: 'action.hover' },
                }}
              >
                <Box
                  component={Link}
                  href={shortcut.url}
                  sx={{
                    p: 6,
                    display: 'flex',
                    textAlign: 'center',
                    alignItems: 'center',
                    textDecoration: 'none',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <CustomAvatar
                    skin='light'
                    color='secondary'
                    sx={{ mb: 2, width: 50, height: 50 }}
                  >
                    <Icon icon={shortcut.icon} />
                  </CustomAvatar>
                  <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>
                    {shortcut.title}
                  </Typography>
                  <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                    {shortcut.subtitle}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </ScrollWrapper>
      </Menu>
    </Fragment>
  )
}

export default ShortcutsDropdown
