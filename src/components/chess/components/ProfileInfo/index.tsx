/* eslint-disable no-unused-vars */
import wQueen from 'src/assets/w-queen.png'
import {
  ActionButton,
  BoxButtons,
  BoxPieces,
  Container,
  ContainerClockBoxPiece,
  NameRagingContainer,
  ProfileContainer,
  ProfileImg,
} from './style'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'

interface ProfileInfoProps {
  children: React.ReactNode
  name: string
  rating: number
  positionClock?: number | null
  me?: boolean
  setTicketOrMoves?: React.Dispatch<React.SetStateAction<1 | 2 | null>>
}

export function ProfileInfo({
  children,
  name,
  rating,
  positionClock = 0,
  me,
  setTicketOrMoves,
}: ProfileInfoProps) {
  const inverte = () => {
    if (setTicketOrMoves) {
      setTicketOrMoves((current) => (current === 1 ? 2 : 1))
    }
  }

  return (
    <Container>
      <ContainerClockBoxPiece>
        {positionClock === 2 && children}
        {positionClock === 2 && <BoxPieces></BoxPieces>}
      </ContainerClockBoxPiece>
      {positionClock === 2 && <br />}
      <ProfileContainer>
        <ProfileImg src={wQueen} alt='Queen' width={50} height={50} />
        <NameRagingContainer>
          <span>{name}</span>
          <span>{rating}</span>
        </NameRagingContainer>
        {me ? (
          <BoxButtons>
            <ActionButton onClick={inverte}>
              <SwapHorizIcon />
            </ActionButton>
            <ActionButton>Give up</ActionButton>
            <ActionButton>Draw</ActionButton>
          </BoxButtons>
        ) : null}
      </ProfileContainer>
      <ContainerClockBoxPiece>
        {positionClock === 1 ? children : ''}
        {positionClock === 1 ? <BoxPieces></BoxPieces> : ''}
      </ContainerClockBoxPiece>
    </Container>
  )
}
