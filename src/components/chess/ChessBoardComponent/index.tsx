/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react'
import Chessboard from 'chessboardjsx'
import { Chess, Square } from 'chess.js'
import useClock from '../utils/ChessTimer'
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
import { GamePlayTicketInfo } from '../components/GamePlayTickteInfo'
import ChessMovesTable from '../components/ChessMovesTable'
import { getCapturedPieces } from '../utils/setCapturedPiecesToFen'

const ChessboardComponent: React.FC<{ chessRoomId?: string }> = ({
  chessRoomId,
}) => {
  const [game, setGame] = useState(new Chess())
  const [chessRoom, setChessRoom] = useState<Room | null>(null)
  const [gameStatus, setGameStatus] = useState<boolean>(true)
  const [fen, setFen] = useState<string>(game.fen())
  const [moves, setMoves] = useState<string[]>([])
  const [liveMove, setLiveMove] = useState<{
    from: string
    to: string
    promotion?: string
    wTime: number
    bTime: number
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
  const [ticketOrMoves, setTicketOrMoves] = useState<1 | 2 | null>(1)
  const [capturedPieces, setCapturedPieces] = useState<string[]>([])

  const theme = useTheme()
  const { user, setLoading } = useAuth()

  const highlightStyleFrom = {
    backgroundColor: lighten(theme.palette.primary.main, 0.8),
  }

  const highlightStyleTo = {
    backgroundColor: lighten(theme.palette.primary.main, 0.7),
  }

  const wClock = useClock(60)
  const bClock = useClock(60)

  useEffect(() => {
    setFen(game.fen())
  }, [game])

  useEffect(() => {
    if (!gameStatus) {
      alert('O JOGO ACABOU')
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
      setGameStatus(chessRoom.status)
      const newCapturedPieces = getCapturedPieces(newFen)

      if (newCapturedPieces) {
        setCapturedPieces(newCapturedPieces)
      }

      // TIMES
      const wTime = chessRoom.roomSocket.wTime
      const bTime = chessRoom.roomSocket.bTime

      if (chessRoom.roomLog.duration && gameStatus) {
        wClock.reset(wTime)
        bClock.reset(bTime)

        const durations = JSON.parse(chessRoom.roomLog.duration)

        if (durations.length % 2 === 0) {
          wClock.reset(wTime)
          bClock.pause()
          wClock.start()
        } else {
          bClock.reset(bTime)
          wClock.pause()
          bClock.start()
        }
      } else {
        wClock.reset(wTime)
        bClock.reset(bTime)
        bClock.pause()
        wClock.start()
      }

      if (initialFen !== newFen && moveHistory) {
        const lastMoves: string[] = JSON.parse(moveHistory)
        setMoves(lastMoves)
      }
    }
  }, [chessRoom])

  useEffect(() => {
    if (gameStatus) {
      if (liveMove) {
        const { from, to, promotion, wTime, bTime } = liveMove

        const legalMoves = game.moves({ verbose: true })
        const isMoveLegal = legalMoves.find(
          (m) =>
            m.from === from &&
            m.to === to &&
            (m.promotion === promotion || !m.promotion),
        )

        if (isMoveLegal) {
          const moveToVerifyCaptured = game.move({ from, to, promotion })

          setFen(game.fen())
          updateCapturedPieces(moveToVerifyCaptured)
          if (game.turn() === 'w') {
            wClock.reset(wTime)
            wClock.start()
            bClock.pause()
          } else {
            bClock.reset(bTime)
            bClock.start()
            wClock.pause()
          }

          const moveHistory = game.history()
          const lastMove = moveHistory[moveHistory.length - 1]
          setMoves((currentMoves) => [...currentMoves, lastMove])

          setHighlightSquareFrom(from as Square)
          setHighlightSquareTo(to as Square)
        } else {
          if (game.turn() === 'w') {
            wClock.reset(wTime)
            wClock.start()
            bClock.pause()
          } else {
            bClock.reset(bTime)
            bClock.start()
            wClock.pause()
          }
        }
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
              null,
              setGameStatus,
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

  const updateCapturedPieces = (move: any) => {
    if (move.captured) {
      const color =
        game.turn() === 'w' ? move.captured.toUpperCase() : move.captured
      const newPieces = [...capturedPieces, color]
      setCapturedPieces(newPieces)
    }
  }

  const handleMoveLive = useCallback(
    (move: { from: string; to: string; promotion?: string }) => {
      const moveHistory = game.history()

      const roomLogId = chessRoom?.roomLog.id
      if (roomLogId) {
        const lastMove = moveHistory[moveHistory.length - 1]

        setMoves((currentMoves) => [...currentMoves, lastMove])

        sendMove(
          chessRoomId as string,
          chessRoom.roomLog.id,
          user?.id as string,
          move,
          game.fen(),
          [...moves, lastMove],
        )
      }
    },
    [game, chessRoom, moves, chessRoomId, user?.id],
  )

  const handleSquareClick = useCallback(
    (square: Square) => {
      if (gameStatus) {
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
                const foundMove = legalMoves.find(
                  (m) =>
                    m.from === move.from &&
                    m.to === move.to &&
                    m.flags.includes('p'),
                )
                if (foundMove) {
                  setPromotion({
                    show: true,
                    color: game.turn(),
                    from: selectedSquare,
                    to: square,
                  })
                } else {
                  game.move(move)
                  setFen(game.fen())
                  isGameOverChess(game, setGameStatus)
                  setHighlightSquareTo(square)
                  handleMoveLive(move)
                  setSelectedSquare(null)
                }
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
      }
    },
    [game, selectedSquare, orientation, setFen, handleMoveLive, setGameStatus],
  )

  const handleMove = useCallback(
    (from: string, to: string) => {
      if (gameStatus) {
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
                const moveToVerifyCaptured = game.move(move)
                setFen(game.fen())
                isGameOverChess(game, setGameStatus)
                setHighlightSquareTo(toSquare)
                handleMoveLive(move)
                updateCapturedPieces(moveToVerifyCaptured)
              }
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
      setPromotion,
      handleMoveLive,
      setGameStatus,
    ],
  )
  const handlePromotionChoice = useCallback(
    (pieceType: PieceType) => {
      if (promotion) {
        const { from, to } = promotion

        const legalMoves = game.moves({ verbose: true })
        const isMoveLegal = legalMoves.some(
          (m) => m.from === from && m.to === to && m.promotion === pieceType,
        )

        if (isMoveLegal) {
          const moveToVerifyCaptured = game.move({
            from,
            to,
            promotion: pieceType,
          })
          setFen(game.fen())
          setPromotion(null)
          handleMoveLive({
            from,
            to,
            promotion: pieceType,
          })
          updateCapturedPieces(moveToVerifyCaptured)
        }
      }
    },
    [game, promotion, handleMoveLive],
  )

  return (
    <>
      {chessRoom && chessRoom.challenge ? (
        <Container>
          <ContainerMobile>
            <ContainerMobileChess>
              {orientation === 'b' ? (
                <ContainerMobileChessDisplay>
                  <ProfileInfo
                    name={chessRoom?.playerOne.name}
                    rating={2220}
                    capturedPieces={capturedPieces}
                    orientation={orientation}
                    status={gameStatus}
                  >
                    <ClockComponent>{formatTime(wClock.time)}</ClockComponent>
                  </ProfileInfo>
                </ContainerMobileChessDisplay>
              ) : (
                <ContainerMobileChessDisplay>
                  <ProfileInfo
                    name={chessRoom?.playerTwo.name}
                    rating={2220}
                    capturedPieces={capturedPieces}
                    orientation={orientation}
                    status={gameStatus}
                  >
                    <ClockComponent>{formatTime(bClock.time)}</ClockComponent>
                  </ProfileInfo>
                </ContainerMobileChessDisplay>
              )}
              <Chessboard
                boardStyle={{ width: '100%', height: '100%' }}
                calcWidth={() => 700}
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
              {orientation === 'w' ? (
                <ContainerMobileChessDisplay>
                  <ProfileInfo
                    name={chessRoom?.playerOne.name}
                    rating={2220}
                    capturedPieces={capturedPieces}
                    orientation={orientation}
                    status={gameStatus}
                  >
                    <ClockComponent>{formatTime(wClock.time)}</ClockComponent>
                  </ProfileInfo>
                </ContainerMobileChessDisplay>
              ) : (
                <ContainerMobileChessDisplay>
                  <ProfileInfo
                    name={chessRoom?.playerTwo.name}
                    rating={2220}
                    capturedPieces={capturedPieces}
                    orientation={orientation}
                    status={gameStatus}
                  >
                    <ClockComponent>{formatTime(bClock.time)}</ClockComponent>
                  </ProfileInfo>
                </ContainerMobileChessDisplay>
              )}
            </ContainerMobileChess>
          </ContainerMobile>

          {orientation === 'b' ? (
            <ContainerProfile style={{ marginBottom: '10px' }}>
              <ProfileInfo
                name={chessRoom?.playerOne.name}
                positionClock={1}
                rating={2220}
                capturedPieces={capturedPieces}
                orientation={orientation}
                status={gameStatus}
              >
                <ClockComponent>{formatTime(wClock.time)}</ClockComponent>
              </ProfileInfo>
              {ticketOrMoves === 1 ? (
                <GamePlayTicketInfo
                  ticketId={chessRoom.challenge.id}
                  clock={chessRoom.challenge.duration / 60}
                  value={chessRoom.challenge.amount * 2}
                  payout={90}
                />
              ) : (
                <ChessMovesTable moves={moves} />
              )}
              <ProfileInfo
                name={chessRoom.playerTwo.name}
                positionClock={2}
                me={true}
                rating={2220}
                setTicketOrMoves={setTicketOrMoves}
                capturedPieces={capturedPieces}
                orientation={orientation}
                status={gameStatus}
              >
                <ClockComponent>{formatTime(bClock.time)}</ClockComponent>
              </ProfileInfo>
            </ContainerProfile>
          ) : (
            <ContainerProfile style={{ marginBottom: '10px' }}>
              <ProfileInfo
                name={chessRoom?.playerOne.name}
                positionClock={1}
                rating={2220}
                capturedPieces={capturedPieces}
                orientation={orientation}
                status={gameStatus}
              >
                <ClockComponent>{formatTime(bClock.time)}</ClockComponent>
              </ProfileInfo>{' '}
              {ticketOrMoves === 1 ? (
                <GamePlayTicketInfo
                  ticketId={chessRoom.challenge.id}
                  clock={chessRoom.challenge.duration / 60}
                  value={chessRoom.challenge.amount * 2}
                  payout={90}
                />
              ) : (
                <ChessMovesTable moves={moves} />
              )}
              <ProfileInfo
                name={chessRoom.playerTwo.name}
                positionClock={2}
                me={true}
                rating={2220}
                setTicketOrMoves={setTicketOrMoves}
                capturedPieces={capturedPieces}
                orientation={orientation}
                status={gameStatus}
              >
                <ClockComponent>{formatTime(wClock.time)}</ClockComponent>
              </ProfileInfo>
            </ContainerProfile>
          )}

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
