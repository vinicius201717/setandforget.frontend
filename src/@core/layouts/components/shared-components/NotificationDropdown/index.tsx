// ** React Imports
import { useState, SyntheticEvent, Fragment, ReactNode } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Badge from '@mui/material/Badge'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Imports
import { Settings } from 'src/@core/context/settingsContext'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Util Import
import { getInitials } from 'src/@core/utils/get-initials'
import {
  Avatar,
  Menu,
  MenuItem,
  MenuItemSubtitle,
  MenuItemTitle,
  PerfectScrollbar,
} from './style'
import { NotificationsType } from 'src/context/types'
import { readAllNotifications } from 'src/pages/api/notification/readAllNotifications'
import toast from 'react-hot-toast'
import { useAuth } from 'src/hooks/useAuth'
import Link from 'next/link'

interface Props {
  settings: Settings
  notifications: NotificationsType[] | null
}

const ScrollWrapper = ({
  children,
  hidden,
}: {
  children: ReactNode
  hidden: boolean
}) => {
  if (hidden) {
    return (
      <Box sx={{ maxHeight: 349, overflowY: 'auto', overflowX: 'hidden' }}>
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

const NotificationDropdown = (props: Props) => {
  // ** Props
  const { settings, notifications } = props

  // ** States
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null)

  // ** Hook
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  // ** Vars
  const { direction } = settings

  const auth = useAuth()

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = () => {
    setAnchorEl(null)
  }

  const handleReadAllNotifications = () => {
    readAllNotifications()
      .then((response) => {
        if (response.status) {
          if (notifications) {
            const updatedNotifications = notifications.map((notification) => ({
              ...notification,
              status: false,
            }))
            auth.setNotifications(updatedNotifications)
          }

          toast.success(response.message, {
            position: 'bottom-right',
          })
        } else {
          toast.error(response.message, {
            position: 'bottom-right',
          })
        }
      })
      .catch((error: Error) => {
        toast.error('Error to read notifications.', {
          position: 'bottom-right',
        })
        console.error('Error updating notifications:', error)
      })
  }

  const RenderAvatar = ({
    notification,
  }: {
    notification: NotificationsType
  }) => {
    const { avatarAlt, avatarImg } = notification

    if (avatarImg) {
      return <Avatar alt={avatarAlt} src={avatarImg} />
    } else {
      return (
        <Avatar skin='light' color='secondary'>
          {getInitials(avatarAlt as string)}
        </Avatar>
      )
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
        <Badge
          color='error'
          variant='dot'
          invisible={!notifications?.[0]?.status ?? false}
          sx={{
            '& .MuiBadge-badge': {
              top: 4,
              right: 4,
              boxShadow: (theme) =>
                `0 0 0 2px ${theme.palette.background.paper}`,
            },
          }}
        >
          <Icon icon='mdi:bell-outline' />
        </Badge>
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
            <Typography sx={{ cursor: 'text', fontWeight: 600 }}>
              Notifications
            </Typography>
            <CustomChip
              skin='light'
              size='small'
              color='primary'
              label={`${notifications?.filter((notif) => notif.status).length} New`}
              sx={{
                height: 20,
                fontSize: '0.75rem',
                fontWeight: 500,
                borderRadius: '10px',
              }}
            />
          </Box>
        </MenuItem>
        <ScrollWrapper hidden={hidden}>
          {notifications?.map(
            (notification: NotificationsType, index: number) => (
              <Link
                style={{ textDecoration: 'none' }}
                href={`/notification/${notification.id}`}
                key={index}
                onClick={handleDropdownClose}
              >
                <MenuItem>
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <RenderAvatar notification={notification} />
                    <Box
                      sx={{
                        mx: 4,
                        flex: '1 1',
                        display: 'flex',
                        overflow: 'hidden',
                        flexDirection: 'column',
                      }}
                    >
                      <MenuItemTitle>{notification.title}</MenuItemTitle>
                      <MenuItemSubtitle variant='body2'>
                        {notification.subtitle}
                      </MenuItemSubtitle>
                    </Box>
                    <Typography
                      variant='caption'
                      sx={{ color: 'text.disabled' }}
                    >
                      {notification.meta}
                    </Typography>
                  </Box>
                  <Box>
                    <Badge
                      color='success'
                      variant='dot'
                      invisible={!notification.status}
                      sx={{
                        position: 'absolute',
                        top: '3px',
                        right: '3px',
                        '& .MuiBadge-badge': {
                          top: 4,
                          right: 4,
                          boxShadow: (theme) =>
                            `0 0 0 2px ${theme.palette.background.paper}`,
                        },
                      }}
                    />
                  </Box>
                </MenuItem>
              </Link>
            ),
          )}
        </ScrollWrapper>
        <MenuItem
          disableRipple
          disableTouchRipple
          sx={{
            py: 3.5,
            borderBottom: 0,
            cursor: 'default',
            userSelect: 'auto',
            backgroundColor: 'transparent !important',
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <Button
            fullWidth
            variant='contained'
            onClick={handleReadAllNotifications}
          >
            Read All Notifications
          </Button>
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default NotificationDropdown
