// src/components/GoodGameLogo.tsx
import { useTheme } from '@mui/material/styles'
import Image from 'next/image'

type GoodGameLogoProps = {
  width?: number
  height?: number
}

const GoodGameLogo = ({ width = 120, height = 120 }: GoodGameLogoProps) => {
  const theme = useTheme()
  const color = theme.palette.primary.main

  const logos: Record<string, string> = {
    '#FF4C51': '/images/logos/good-game/logo-error.png',
    '#9155FD': '/images/logos/good-game/logo-primary.png',
    '#8A8D93': '/images/logos/good-game/logo-secondary.png',
    '#56CA00': '/images/logos/good-game/logo-success.png',
    '#FFB400': '/images/logos/good-game/logo-warning.png',
    '#16B1FF': '/images/logos/good-game/logo-info.png',
    default: '/images/logos/good-game/logo-white.png',
  }

  const src = logos[color] || logos.default

  return (
    <Image
      src={src}
      alt='GoodGame - Logo'
      width={width}
      height={height}
      unoptimized
    />
  )
}

export default GoodGameLogo
