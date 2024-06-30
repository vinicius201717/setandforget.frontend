import wQueen from 'src/assets/w-queen.png'
import {
  Container,
  NameRagingContainer,
  ProfileContainer,
  ProfileImg,
} from './style'

interface ProfileInfoProps {
  children: React.ReactNode
  name: string
  rating: number
}

export function ProfileInfo({ children, name, rating }: ProfileInfoProps) {
  return (
    <Container>
      <ProfileContainer>
        <ProfileImg src={wQueen} alt='Queen' width={50} height={50} />
        <NameRagingContainer>
          <span>{name}</span>
          <span>{rating}</span>
        </NameRagingContainer>
      </ProfileContainer>
      {children}
    </Container>
  )
}
