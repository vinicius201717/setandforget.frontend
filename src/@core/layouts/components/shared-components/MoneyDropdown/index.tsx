// ** React Imports
import { useState, SyntheticEvent, Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// ** Type Imports
import { Settings } from 'src/@core/context/settingsContext'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

import { Menu, MenuItem } from './style'
import Link from 'next/link'
import { useAuth } from 'src/hooks/useAuth'
import { formatMoney } from 'src/utils/format-money'

interface Props {
  settings: Settings
}

const MoneyDropdown = (props: Props) => {
  // ** Props
  const { settings } = props

  // ** States
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null)

  // ** Vars
  const { direction } = settings

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = () => {
    setAnchorEl(null)
  }

  const { user } = useAuth()

  return (
    <Fragment>
      <IconButton
        color='inherit'
        aria-haspopup='true'
        onClick={handleDropdownOpen}
        aria-controls='customized-menu'
        sx={{ borderRadius: '20px' }}
      >
        <Typography variant='h6'>
          {user?.Account.amount
            ? `${formatMoney(user?.Account.amount / 100)}`
            : '0'}
        </Typography>
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
              Money
            </Typography>
            <CustomChip
              skin='light'
              size='small'
              color='primary'
              label={
                user?.Account.amount
                  ? formatMoney(user.Account.amount / 100)
                  : '0'
              }
              sx={{
                height: 20,
                fontSize: '0.75rem',
                fontWeight: 500,
                borderRadius: '10px',
              }}
            />
          </Box>
        </MenuItem>
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
          <Link href={'/pages/deposit'} onClick={handleDropdownClose}>
            <Button fullWidth variant='contained'>
              Deposit
            </Button>
          </Link>
          <Link href={'/pages/withdraw'}>
            <Button fullWidth variant='contained' onClick={handleDropdownClose}>
              Withdraw
            </Button>
          </Link>
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default MoneyDropdown
