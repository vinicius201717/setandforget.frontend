/* eslint-disable react-hooks/exhaustive-deps */
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
import { Feature } from 'src/context/types'
import { imageListName, textList } from 'src/utils/text-homepage'
import InfiniteTextCarousel from 'src/components/home/InfiniteCarousel'
import Footer from 'src/components/home/footer'
import Avatar3D from 'src/components/home/cssanimation'

const HomePage = () => {
  const theme = useTheme()

  const [scrollY, setScrollY] = useState<number>(0)
  const [scrolled, setScrolled] = useState<boolean>(false)
  const [images, setImages] = useState<string>(
    `/images/pages/${theme.palette.mode}-home-dashboard-exemple.png`,
  )
  const [selectedImage, setSelectedImage] = useState(imageListName[0])
  const [textImage, setTextImage] = useState<Feature>(textList[0])

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

  const imagesList = [
    `/images/pages/${theme.palette.mode}-home-dashboard-exemple.png`,
    `/images/pages/${theme.palette.mode}-home-game-exemple.png`,
    `/images/pages/${theme.palette.mode}-home-deposit-exemple.png`,
    `/images/pages/${theme.palette.mode}-home-withdrawls-exemple.png`,
    `/images/pages/${theme.palette.mode}-home-friendship-exemple.png`,
  ]

  const handleChangeImage = (key: string) => {
    setSelectedImage(key)
    switch (key) {
      case 'Control':
        setImages(imagesList[0])
        setTextImage(textList[0])

        break
      case 'Games':
        setImages(imagesList[1])
        setTextImage(textList[1])

        break
      case 'Deposit':
        setImages(imagesList[2])
        setTextImage(textList[2])

        break
      case 'Withdrawls':
        setImages(imagesList[3])
        setTextImage(textList[3])

        break
      case 'Friendship':
        setImages(imagesList[4])
        setTextImage(textList[4])

        break
      default:
        break
    }
  }
  const isDark = theme.palette.mode === 'dark'

  const backgroundGradient = isDark
    ? `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.main})`
    : `linear-gradient(135deg, ${theme.palette.grey[100]}, ${theme.palette.grey[300]})`

  const boxShadow = isDark
    ? '0px -20px 59px 7px rgba(106, 90, 205, 0.45)'
    : '0px -10px 40px 4px rgba(106, 90, 205, 0.15)'

  const borderColor = isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.1)'

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
                  create account
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
            Turn quick thinking into real money by playing against other
            players.
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
              Join the iGaming platform and turn intelligence into profit.
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
          background: backgroundGradient,
          boxShadow: '0px -20px 59px 7px rgba(106, 90, 205,0.75)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
        }}
      >
        <Box
          sx={{
            width: '50vw',
            height: '100%',
            position: 'relative',
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
            src={images}
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
          position: 'relative',
          bgcolor: theme.palette.background.paper,
          zIndex: 888,
          paddingTop: '40px',
          borderTop: '1px solid rgba(114, 114, 114, 0.3)',
          boxShadow,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            width: '100%',
            maxWidth: '900px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              borderRadius: '30px',
              border: `1px solid ${borderColor}`,
              padding: '8px 16px',
              gap: 2,
              width: 'fit-content',
              margin: '0 auto',
              backgroundColor: theme.palette.background.default,
            }}
          >
            {imageListName.map((image, key) => (
              <Button
                key={key}
                variant={selectedImage === image ? 'outlined' : 'text'}
                sx={{
                  borderRadius: '25px',
                  height: '40px',
                  minWidth: '120px',
                  flexShrink: 0,
                  textTransform: 'capitalize',
                }}
                onClick={() => handleChangeImage(image)}
              >
                {image}
              </Button>
            ))}
          </Box>

          {/* Texto descritivo abaixo */}
          <Box textAlign='center' px={2}>
            <Typography variant='h6' gutterBottom>
              {textImage.title}
            </Typography>
            <Typography variant='body1' color='text.secondary'>
              {textImage.description}
            </Typography>
          </Box>
          <Typography variant='h4' sx={{ marginTop: '100px' }}>
            Coming Soon
          </Typography>
          <InfiniteTextCarousel />
        </Box>
      </Box>
      <Box
        sx={{
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '100px',
          position: 'relative',
          zIndex: '999',
          bgcolor: theme.palette.background.paper,
        }}
      >
        <Avatar3D />
        <Typography variant='h3'>How it works</Typography>
      </Box>
      <Footer />
    </Box>
  )
}

HomePage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
HomePage.guestGuard = true

export default HomePage
