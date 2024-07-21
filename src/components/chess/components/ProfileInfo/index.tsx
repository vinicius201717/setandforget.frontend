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
import {
  draw,
  giveUp,
} from 'src/pages/api/chess-room/chess-challenge-websocket'
import { useAuth } from 'src/hooks/useAuth'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material'

interface ProfileInfoProps {
  children: React.ReactNode
  name: string
  rating: number
  positionClock?: number | null
  me?: boolean
  setTicketOrMoves?: React.Dispatch<React.SetStateAction<1 | 2 | null>>
  capturedPieces: string[]
  orientation: 'w' | 'b'
  status: boolean
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
  status,
}: ProfileInfoProps) {
  const [capturedPiecesW, setCapturedPiecesW] = useState<string[]>([])
  const [capturedPiecesB, setCapturedPiecesB] = useState<string[]>([])
  const [open, setOpen] = useState(false)

  const { user } = useAuth()

  const inverte = () => {
    if (setTicketOrMoves) {
      setTicketOrMoves((current) => (current === 1 ? 2 : 1))
    }
  }

  const handleGiveUp = () => {
    const roomId = window.localStorage.getItem('chess-room-id')
    const userId = user?.id as string
    if (roomId && userId) {
      giveUp(roomId, userId)
    }
    window.localStorage.removeItem('chess-room-id')
    setOpen(false)
  }

  const handleDraw = () => {
    const roomId = window.localStorage.getItem('chess-room-id')
    const userId = user?.id as string
    const name = user?.name as string
    if (roomId && userId) {
      draw(roomId, userId, name)
    }
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
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
            <ActionButton onClick={inverte} isMobile={true}>
              <SwapHorizIcon />
            </ActionButton>
            <ActionButton disabled={!status} onClick={handleClickOpen}>
              Give up
            </ActionButton>
            <ActionButton disabled={!status} onClick={handleDraw}>
              Draw
            </ActionButton>
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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Give Up</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to give up the game?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleGiveUp} color='primary' autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
