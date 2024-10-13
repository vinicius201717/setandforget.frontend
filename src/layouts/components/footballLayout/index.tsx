import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import { Container } from '@mui/material'
import FootballHorizontalMenu from 'src/components/menu/FootballHorizontalMenu'

interface FootballLayoutProps {
  children: ReactNode
  type: string
}

export default function FootballLayout({
  children,
  type,
}: FootballLayoutProps) {
  const router = useRouter()

  const isFootballPage = router.pathname.includes('football')

  return (
    <Container>
      {isFootballPage && <FootballHorizontalMenu type={type} />}
      {children}
    </Container>
  )
}
