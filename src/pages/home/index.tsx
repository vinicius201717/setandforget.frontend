/* eslint-disable react/no-unescaped-entities */
import React, { ReactNode } from 'react'
import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import MenuIcon from '@mui/icons-material/Menu'
import AdbIcon from '@mui/icons-material/Adb'
import GoodGameLogo from 'src/@core/components/logo'

const HomePage = () => {
  const theme = useTheme()

  return (
    <Box>
      <AppBar
        position='relative'
        elevation={0}
        sx={{
          boxShadow: 'none',
          background: theme.palette.background.default,
        }}
      >
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <GoodGameLogo width={60} height={60} />

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                color='inherit'
              >
                <MenuIcon />
              </IconButton>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} />
            <Box sx={{ display: 'flex', gap: '25px' }}>
              <Box
                sx={{
                  flexGrow: 0,
                  borderRadius: '8px',
                }}
              >
                <Typography variant='body1' sx={{ fontWeight: 600 }}>
                  Login
                </Typography>
              </Box>

              <Box
                sx={{
                  flexGrow: 0,
                  border: '1px solid white',
                  padding: '2px 10px',
                  borderRadius: '8px',
                  display: 'flex',
                }}
              >
                <Typography variant='body1' sx={{ fontWeight: 600 }}>
                  Criar conta
                </Typography>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}

HomePage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

HomePage.guestGuard = true

export default HomePage
