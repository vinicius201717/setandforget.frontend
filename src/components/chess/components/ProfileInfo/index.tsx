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
import { useEffect, useState } from 'react'
import { getPieceImages } from '../../utils/formatNameToImagePieces'

interface ProfileInfoProps {
  children: React.ReactNode
  name: string
  rating: number
  positionClock?: number | null
  me?: boolean
  setTicketOrMoves?: React.Dispatch<React.SetStateAction<1 | 2 | null>>
  capturedPieces: string[]
  orientation: 'w' | 'b'
}

export function ProfileInfo({
  children,
  name,
  rating,
  positionClock = 0,
  me,
  setTicketOrMoves,
  capturedPieces,
  orientation,
}: ProfileInfoProps) {
  const [capturedPiecesW, setCapturedPiecesW] = useState<string[]>([])
  const [capturedPiecesB, setCapturedPiecesB] = useState<string[]>([])
  const inverte = () => {
    if (setTicketOrMoves) {
      setTicketOrMoves((current) => (current === 1 ? 2 : 1))
    }
  }

  const givUp = () => {
    window.localStorage.removeItem('chess-room-id')
  }

  useEffect(() => {
    const whitePieces = capturedPieces.filter(
      (piece) => piece === piece.toUpperCase(),
    )
    const blackPieces = capturedPieces.filter(
      (piece) => piece === piece.toLowerCase(),
    )
    setCapturedPiecesW(whitePieces)
    setCapturedPiecesB(blackPieces)
  }, [capturedPieces])

  return (
    <Container>
      <ContainerClockBoxPiece>
        {positionClock === 2 && children}
        {positionClock === 2 && (
          <BoxPieces>
            {orientation === 'w'
              ? getPieceImages(capturedPiecesW)
              : getPieceImages(capturedPiecesB)}
          </BoxPieces>
        )}
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
            <ActionButton onClick={givUp}>Give up</ActionButton>
            <ActionButton>Draw</ActionButton>
          </BoxButtons>
        ) : null}
      </ProfileContainer>
      <ContainerClockBoxPiece>
        {positionClock === 1 ? children : ''}
        {positionClock === 1 ? (
          <BoxPieces>
            {orientation === 'w'
              ? getPieceImages(capturedPiecesB)
              : getPieceImages(capturedPiecesW)}
          </BoxPieces>
        ) : (
          ''
        )}
      </ContainerClockBoxPiece>
    </Container>
  )
}
