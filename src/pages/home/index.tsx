/* eslint-disable react/no-unescaped-entities */
import React, { ReactNode, useEffect, useState } from 'react'
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import MenuIcon from '@mui/icons-material/Menu'
import GoodGameLogo from 'src/@core/components/logo'
import Link from 'next/link'
import Image from 'next/image'

const HomePage = () => {
  const [scrollY, setScrollY] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  const theme = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setScrollY(y)

      if (y > 100 && !scrolled) {
        setScrolled(true)
      } else if (y <= 100 && scrolled) {
        setScrolled(false)
      }
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollFontSize = Math.max(32, 64 - scrollY / 10)
  const subTextFontSize = Math.max(14, 20 - scrollY / 30)
  const boxScale = Math.max(0.8, 1 - scrollY / 1000)
  const opacity = Math.max(0.5, 1 - scrollY / 600)

  const imageList = ['Control', 'Games', 'Deposit', 'Withdrawls', 'Friendship']

  return (
    <Box>
      <AppBar
        position='fixed'
        elevation={0}
        sx={{
          boxShadow: 'none',
          backgroundColor: `rgba(2,2,2,${Math.min(1, scrollY / 100)})`,
          transition: 'background-color 0.3s ease',
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
              <Box sx={{ flexGrow: 0, borderRadius: '8px' }}>
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
      <Box
        sx={{
          paddingTop: '200px',
          position: 'relative',
          height: '80vh',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            transition: 'all 0.2s linear',
            opacity,
            position: 'fixed',
            zIndex: 1,
            top: '40%',
            left: '50%',
            transform: `translate(-50%, -50%) scale(${boxScale})`,
          }}
        >
          <Typography
            variant='h2'
            sx={{
              textAlign: 'center',
              fontWeight: 700,
              fontSize: `${scrollFontSize}px`,
              fontFamily: 'Mona sans',
              transition: 'all 0.2s linear',
            }}
          >
            Transforme raciocínio rápido em dinheiro real jogando contra outros
            jogadores.
          </Typography>
          <br />
          <Box>
            <Typography
              variant='h6'
              sx={{
                fontSize: `${subTextFontSize}px`,
                transition: 'all 0.2s linear',
                opacity,
              }}
            >
              Junte-se à plataforma de iGaming e transforme inteligência em
              lucro.
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-evenly',
              paddingTop: '50px',
              transition: 'all 0.2s linear',
              opacity,
              gap: 5,
            }}
          >
            <Link href={'/login'}>
              <Button variant='outlined' type={'button'}>
                Login
              </Button>
            </Link>
            <Link href={'/register'}>
              <Button variant='contained' type={'button'}>
                create your account
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          zIndex: 999,
          position: 'relative',
          width: '50vw',
          height: '75vh',
          margin: '0 auto',
          borderRadius: '20px 20px 0 0',
          padding: '15px',
          paddingBottom: '0',
          background:
            'linear-gradient(135deg, rgb(106, 90, 205), rgb(138, 43, 226))', // degradê roxo
          boxShadow: '0px -20px 59px 7px rgba(106, 90, 205,0.75)',
          backdropFilter: 'blur(10px)', // se quiser efeito glass
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)', // opcional, para reforçar efeito luz
        }}
      >
        <Box
          sx={{
            width: '50vw',
            height: '100%',
            position: 'relative', // necessário para Image com layout fill
            borderRadius: '20px 20px 0 0',
            backdropFilter: 'blur(15px)',
            WebkitBackdropFilter: 'blur(15px)',
            border: '5px solid rgba(255, 255, 255, 0.3)',
            borderBottom: '0',
            overflow: 'hidden',
            padding: '100px',
          }}
        >
          <Image
            src='/images/pages/home-dashboard-exemple.png'
            alt='dashboard exemple'
            fill
            style={{
              objectFit: 'cover',
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          height: '200vh',
          position: 'relative',
          bgcolor: theme.palette.background.paper,
          zIndex: 888,
          paddingTop: '20px',
          borderTop: '1px solid rgba(114, 114, 114, 0.3)',
          boxShadow: '1px -250px 33px 12px rgba(52, 78, 134, 0.27)',
          display: 'flex',
          justifyContent: 'center', // centraliza horizontal
          alignItems: 'flex-start', // impede que o filho cresça na altura
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            borderRadius: '30px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            padding: '8px',
            gap: 2,
          }}
        >
          {imageList.map((image, key) => (
            <Button
              key={key}
              variant={key === 0 ? 'outlined' : 'text'}
              sx={{ borderRadius: '25px', height: '40px' }}
            >
              {image}
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

HomePage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
HomePage.guestGuard = true

export default HomePage
