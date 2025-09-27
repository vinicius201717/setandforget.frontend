import React from 'react'
import { Box, Typography, useTheme, keyframes } from '@mui/material'

const multiplayerGameCategories: string[] = [
  'Battle Royale',
  'First-Person Shooter (FPS)',
  'Third-Person Shooter',
  'Massively Multiplayer Online (MMO)',
  'Multiplayer Online Battle Arena (MOBA)',
  'Real-Time Strategy (RTS)',
  'Turn-Based Strategy',
  'Cooperative Survival',
  'Party Games',
  'Racing',
  'Sports',
  'Fighting',
  'Puzzle Multiplayer',
  'Card Games',
  'Board Games',
  'Sandbox',
  'Role-Playing Games (RPG)',
  'Tactical Shooters',
  'Hero Shooters',
  'MMORPG',
  'Social Deduction',
  'Multiplayer Horror',
  'Sandbox Survival',
  'Simulation Multiplayer',
  'Platformers',
  'MOBA Auto Battlers',
  'Arcade Multiplayer',
  'Multiplayer Rhythm Games',
  'MMOFPS',
  'Battle Arena',
  'Text-Based Multiplayer',
  'Asymmetric Multiplayer',
  'Virtual Reality Multiplayer',
  'MMORTS',
  'Tower Defense Multiplayer',
  'Card Battle',
  'Multiplayer Roguelike',
  'Split-Screen Multiplayer',
  'Local Co-op',
  'Online Co-op',
  'Multiplayer Strategy RPG',
]

// Definindo a animação com keyframes do MUI
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
  const textColor = theme.palette.mode === 'dark' ? '#ccc' : '#333'
  const borderColor = theme.palette.mode === 'dark' ? '#4b4b4b' : '#b4b4b4'
  const bgColor = theme.palette.background.default

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        width: '100vw',
        height: 200,
        display: 'flex',
        alignItems: 'center',
        paddingBottom: '20px',
        borderBottom: `1px solid ${borderColor}`,
      }}
    >
      {/* Sombra esquerda */}
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 60,
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
          width: 60,
          height: '100%',
          zIndex: 2,
          background: `linear-gradient(to left, ${bgColor}, transparent)`,
        }}
      />
      <Box
        sx={{
          display: 'inline-flex',
          whiteSpace: 'nowrap',
          animation: `${scroll} 200s linear infinite`,
          '&:hover': {
            animationPlayState: 'paused',
          },
        }}
      >
        {[...multiplayerGameCategories, ...multiplayerGameCategories].map(
          (brand, index) => (
            <Typography
              key={index}
              sx={{
                color: textColor,
                fontWeight: 500,
                fontSize: '3rem',
                px: 3,
                opacity: 0.8,
                userSelect: 'none',
                cursor: 'default',
                marginRight: '50px',
              }}
            >
              {brand},
            </Typography>
          ),
        )}
      </Box>
    </Box>
  )
}

export default InfiniteTextCarousel
