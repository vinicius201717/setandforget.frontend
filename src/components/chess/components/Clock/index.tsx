import { Container } from './style'

interface ClockProps {
  children: React.ReactNode
}

export const ClockComponent = ({ children }: ClockProps) => {
  return <Container>{children}</Container>
}
