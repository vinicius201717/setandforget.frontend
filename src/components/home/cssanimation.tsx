import React from 'react'
import { Box, Typography, useTheme, keyframes } from '@mui/material'

const brands: string[] = [
  'Spotify',
  'Vodafone',
  'American Airlines',
  'Duolingo',
  'EY',
  'Ford',
  'Infosys',
  'Mercado Libre',
  'Mercedes-Benz',
]

// Definindo a animação com keyframes
const scroll = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`

const InfiniteTextCarousel: React.FC = () => {
  const theme = useTheme()
  const textColor = theme.palette.mode === 'dark' ? '#e5e7eb' : '#1f2937'
  const bgColor = theme.palette.mode === 'dark' ? '#1f2937' : '#ffffff'

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height: { xs: 100, md: 120 },
        backgroundColor: bgColor,
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        margin: '20px 0',
      }}
    >
      {/* Sombra esquerda */}
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: { xs: 40, md: 60 },
          height: '100%',
          zIndex: 2,
          background: `linear-gradient(to right, ${bgColor}, transparent)`,
        }}
      />
      {/* Sombra direita */}
      <Box
        sx={{
          position: 'absolute',
          right: 0,
          top: 0,
          width: { xs: 40, md: 60 },
          height: '100%',
          zIndex: 2,
          background: `linear-gradient(to left, ${bgColor}, transparent)`,
        }}
      />
      {/* Carrossel com animação */}
      <Box
        sx={{
          display: 'inline-flex',
          whiteSpace: 'nowrap',
          animation: `${scroll} 20s linear infinite`,
          '&:hover': {
            animationPlayState: 'paused',
          },
        }}
      >
        {[...brands, ...brands].map((brand, index) => (
          <Typography
            key={index}
            variant='h1'
            sx={{
              color: textColor,
              fontWeight: 700,
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
              px: { xs: 2, md: 4 },
              opacity: 0.9,
              userSelect: 'none',
              cursor: 'default',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {brand}
          </Typography>
        ))}
      </Box>
    </Box>
  )
}

export default InfiniteTextCarousel
