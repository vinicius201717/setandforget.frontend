import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import { Container } from '@mui/material'
import HorizontalMenu from 'src/components/menu/HorizontalMenu'

interface FootballLayoutProps {
  children: ReactNode
}

export default function FootballLayout({ children }: FootballLayoutProps) {
  const router = useRouter()

  const isFootballPage = router.pathname.includes('football')

  return (
    <Container>
      {isFootballPage && <HorizontalMenu />}
      {children}
    </Container>
  )
}
