import { Container } from '@mui/material'
import { ContainerFixture } from './style'
import FootballLayout from 'src/layouts/components/footballLayout'

export default function Football() {
  return (
    <FootballLayout>
      <Container>
        <ContainerFixture />
      </Container>
    </FootballLayout>
  )
}
