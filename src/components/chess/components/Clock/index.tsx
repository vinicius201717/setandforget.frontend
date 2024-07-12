import { Container } from './style'

interface ClockProps {
  children: React.ReactNode
  isRunning: boolean
}

export const ClockComponent = ({ children, isRunning }: ClockProps) => {
  return <Container isRunning={isRunning}>{children}</Container>
}
