/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react'
import Chessboard from 'chessboardjsx'
import { Chess, Square } from 'chess.js'
import { useChessTimer } from '../utils/ChessTimer'
import { formatTime } from 'src/utils/format-timer'
import PromotionModal from '../components/PromotionModal'
import { PieceType, PromotionProps, Room } from 'src/types/apps/chessTypes'
import { isGameOverChess } from '../utils/isGameOver'
import { ProfileInfo } from '../components/ProfileInfo'
import { ClockComponent } from '../components/Clock'
import { useTheme, lighten } from '@mui/material'
import {
  ContainerProfile,
  Container,
  ContainerMobileChess,
  ContainerMobileChessDisplay,
  ContainerMobile,
} from './style'
import { chessRoomGet } from 'src/pages/api/chess-room/chess-room-get'
import { useAuth } from 'src/hooks/useAuth'
import {
  connectSocket,
  sendMove,
} from 'src/pages/api/chess-room/chess-challenge-websocket'

const ChessboardComponent: React.FC<{ chessRoomId?: string }> = ({
  chessRoomId,
}) => {
  const [game, setGame] = useState(new Chess())
  const [chessRoom, setChessRoom] = useState<Room | null>(null)
  const [gameStatus, setGameStatus] = useState<boolean>(true)
  const [fen, setFen] = useState<string>(game.fen())
  const [moves, setMoves] = useState<string[]>([])
  const [duration, setDuration] = useState<string>()
  const [liveMove, setLiveMove] = useState<{
    from: string
    to: string
    promotion?: string
  }>()
  const [promotion, setPromotion] = useState<PromotionProps | null>(null)
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null)
  const [highlightSquareFrom, setHighlightSquareFrom] = useState<Square | null>(
    null,
  )
  const [highlightSquareTo, setHighlightSquareTo] = useState<Square | null>(
    null,
  )
  const [orientation, setOrientation] = useState<'w' | 'b'>('w')

  const theme = useTheme()
  const { user, setLoading } = useAuth()

  const highlightStyleFrom = {
    backgroundColor: lighten(theme.palette.primary.main, 0.8),
  }

  const highlightStyleTo = {
    backgroundColor: lighten(theme.palette.primary.main, 0.7),
  }

  const { timeW, timeB, switchPlayer, resetTimer } = useChessTimer({
    initialTime: (chessRoom?.challenge.duration as number) || 800,
    onTimeEnd: (player) => {
      alert(`Tempo esgotado! ${player === 'w' ? 'Brancas' : 'Negras'} perdem.`)
    },
  })

  useEffect(() => {
    setFen(game.fen())
  }, [game])

  useEffect(() => {
    if (!gameStatus) {
      console.log('O JOGO ACABOU')
    }
  }, [gameStatus])

  useEffect(() => {
    const initialFen =
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

    if (chessRoom) {
      if (chessRoom.playerOne.id === user?.id) {
        setOrientation('w')
      } else {
        setOrientation('b')
      }

      const newFen = chessRoom.roomLog.fen as string
      const moveHistory = chessRoom?.roomLog.moveHistory as string

      const newGame = new Chess()
      newGame.load(newFen)
      setGame(newGame)
      setFen(newFen)

      if (initialFen !== newFen) {
        if (moveHistory) {
          const lastMove: string[] = JSON.parse(moveHistory)
          setMoves(lastMove)
        }
      }
    }
  }, [chessRoom])

  useEffect(() => {
    if (liveMove) {
      const { from, to, promotion } = liveMove

      const legalMoves = game.moves({ verbose: true })
      const isMoveLegal = legalMoves.some(
        (m) =>
          m.from === from &&
          m.to === to &&
          (m.promotion === promotion || !m.promotion),
      )

      if (isMoveLegal) {
        game.move({ from, to, promotion })
        setFen(game.fen())

        const moveHistory = game.history()
        const lastMove = moveHistory[moveHistory.length - 1]
        setMoves((currentMoves) => [...currentMoves, lastMove])

        setHighlightSquareFrom(from as Square)
        setHighlightSquareTo(to as Square)
      } else {
        console.error('Movimento inválido:', liveMove)
      }
    }
  }, [liveMove])

  useEffect(() => {
    if (chessRoomId) {
      chessRoomGet(chessRoomId as string)
        .then((response: Room) => {
          if (
            response &&
            response.challenge &&
            response.playerOne &&
            response.playerTwo
          ) {
            setLoading(false)
            const creatorId = response.challenge.userId
            const challengeId = response.challenge.id
            const userId = user?.id as string

            connectSocket(
              challengeId,
              chessRoomId,
              creatorId,
              userId,
              setChessRoom,
              setLiveMove,
            )
          }
        })
        .catch((error) => {
          console.error('Failed to fetch chess room:', error)
          setLoading(false)
        })
    }
  }, [chessRoomId])

  const handleMoveLive = useCallback(
    (move: { from: string; to: string; promotion?: string }) => {
      const moveHistory = game.history()

      const roomLogId = chessRoom?.roomLog.id
      if (roomLogId) {
        const lastMove = moveHistory[moveHistory.length - 1]

        const currentMoves = [...moves, lastMove]
        setMoves((currentMoves) => {
          const updatedMoves = [...currentMoves, lastMove]

          return updatedMoves
        })

        sendMove(
          chessRoomId as string,
          chessRoom.roomLog.id,
          move,
          game.fen(),
          currentMoves,
        )
      }
    },
    [game, chessRoom, timeB],
  )

  const handleSquareClick = useCallback(
    (square: Square) => {
      const turn = game.turn()
      if (orientation === turn) {
        if (!isGameOverChess(game, setGameStatus)) {
          const piece = game.get(square)
          if (!selectedSquare) {
            if (
              piece &&
              piece.color === orientation &&
              piece.color === game.turn()
            ) {
              setSelectedSquare(square)
              setHighlightSquareFrom(square)
              setHighlightSquareTo(null)
            } else {
              setHighlightSquareFrom(null)
              setHighlightSquareTo(null)
            }
          } else {
            const move = { from: selectedSquare, to: square, promotion: 'q' }
            const legalMoves = game.moves({ verbose: true })
            const isMoveLegal = legalMoves.some(
              (m) =>
                m.from === move.from &&
                m.to === move.to &&
                (m.promotion === move.promotion || !m.promotion),
            )

            if (isMoveLegal) {
              game.move(move)
              setFen(game.fen())
              isGameOverChess(game, setGameStatus)
              setHighlightSquareTo(square)
              switchPlayer()
              handleMoveLive(move)
              setSelectedSquare(null)
            } else {
              const pieceAtTarget = game.get(square)
              if (pieceAtTarget && pieceAtTarget.color === game.turn()) {
                setSelectedSquare(square)
                setHighlightSquareFrom(square)
                setHighlightSquareTo(null)
              }
            }
          }
        }
      }
    },
    [
      game,
      selectedSquare,
      orientation,
      setFen,
      switchPlayer,
      handleMoveLive,
      setGameStatus,
    ],
  )

  const handleMove = useCallback(
    (from: string, to: string) => {
      if (game) {
        const turn = game.turn()

        if (!isGameOverChess(game, setGameStatus)) {
          const fromSquare = from as Square
          const toSquare = to as Square
          const piece = game.get(fromSquare)

          setHighlightSquareFrom(fromSquare)

          if (
            (piece && piece.color !== game.turn()) ||
            orientation !== game.turn()
          ) {
            setHighlightSquareFrom(null)
            setHighlightSquareTo(null)
            return
          }

          const validMoves = game.moves({
            square: fromSquare,
            verbose: true,
          })
          const move = validMoves.find(
            (m) => m.from === fromSquare && m.to === toSquare,
          )

          if (!move) {
            return
          }

          if (move.flags.includes('p')) {
            setPromotion({
              show: true,
              color: game.turn(),
              from: fromSquare,
              to: toSquare,
            })
            setHighlightSquareTo(toSquare)
          } else {
            if (orientation === turn) {
              game.move(move)
              setFen(game.fen())
              isGameOverChess(game, setGameStatus)
              switchPlayer()
              setHighlightSquareTo(toSquare)
              handleMoveLive(move)
            }
          }
        }
      }
    },
    [
      game,
      orientation,
      setHighlightSquareFrom,
      setHighlightSquareTo,
      setFen,
      switchPlayer,
      setPromotion,
      handleMoveLive,
      setGameStatus,
    ],
  )

  const handlePromotionChoice = useCallback(
    (pieceType: PieceType) => {
      if (promotion) {
        const { from, to } = promotion

        game.move({ from, to, promotion: pieceType })
        setFen(game.fen())
        setPromotion(null)
        switchPlayer()
        handleMoveLive({
          from,
          to,
          promotion: pieceType,
        })
      }
    },
    [game, promotion, handleMoveLive, switchPlayer],
  )

  return (
    <>
      {chessRoom && chessRoom.challenge ? (
        <Container>
          <ContainerMobile>
            <ContainerMobileChess>
              <ContainerMobileChessDisplay>
                <ProfileInfo
                  name={
                    orientation === 'b'
                      ? chessRoom?.playerTwo.name
                      : chessRoom.playerOne.name
                  }
                  rating={2220}
                >
                  <ClockComponent>
                    {orientation === 'b'
                      ? formatTime(timeB)
                      : formatTime(timeW)}
                  </ClockComponent>
                </ProfileInfo>
              </ContainerMobileChessDisplay>

              <Chessboard
                boardStyle={{ width: '100%' }}
                position={fen}
                orientation={orientation === 'w' ? 'white' : 'black'}
                onDrop={({ sourceSquare, targetSquare }) =>
                  handleMove(sourceSquare, targetSquare)
                }
                onSquareClick={handleSquareClick}
                squareStyles={{
                  ...(highlightSquareFrom && {
                    [highlightSquareFrom]: highlightStyleFrom,
                  }),
                  ...(highlightSquareTo && {
                    [highlightSquareTo]: highlightStyleTo,
                  }),
                }}
              />
              <ContainerMobileChessDisplay>
                <ProfileInfo
                  name={
                    orientation === 'b'
                      ? chessRoom?.playerOne.name
                      : chessRoom.playerTwo.name
                  }
                  rating={2220}
                >
                  <ClockComponent>
                    {orientation === 'b'
                      ? formatTime(timeB)
                      : formatTime(timeW)}
                  </ClockComponent>
                </ProfileInfo>
              </ContainerMobileChessDisplay>
            </ContainerMobileChess>
          </ContainerMobile>

          <ContainerProfile style={{ marginBottom: '10px' }}>
            <ProfileInfo
              name={
                orientation === 'b'
                  ? chessRoom?.playerOne.name
                  : chessRoom.playerTwo.name
              }
              rating={2220}
            >
              <ClockComponent>
                {orientation === 'b' ? formatTime(timeW) : formatTime(timeB)}
              </ClockComponent>
            </ProfileInfo>
            <ProfileInfo
              name={
                orientation === 'w'
                  ? chessRoom?.playerOne.name
                  : chessRoom.playerTwo.name
              }
              rating={2220}
            >
              <ClockComponent>
                {orientation === 'b' ? formatTime(timeB) : formatTime(timeW)}
              </ClockComponent>
            </ProfileInfo>
          </ContainerProfile>
          {promotion && promotion.show && (
            <PromotionModal
              onChoosePiece={handlePromotionChoice}
              color={promotion.color}
            />
          )}
        </Container>
      ) : null}
    </>
  )
}

export default ChessboardComponent
