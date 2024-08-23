import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import { Container } from '@mui/material'
import FootballHorizontalMenu from 'src/components/menu/FootballHorizontalMenu'

interface FootballLayoutProps {
  children: ReactNode
}

export default function FootballLayout({ children }: FootballLayoutProps) {
  const router = useRouter()

  const isFootballPage = router.pathname.includes('football')

  return (
    <Container>
      {isFootballPage && <FootballHorizontalMenu />}
      {children}
    </Container>
  )
}
