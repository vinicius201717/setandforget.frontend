import { Square } from 'chess.js'
import { ChessboardComponentProps } from 'src/types/apps/chessTypes'
import { UserDataType } from 'src/context/types'
import { isGameOverChess } from './isGameOver'
type HandleSquareClickProps = ChessboardComponentProps

export const handleSquareClick =
  ({
    selectedSquare,
    setSelectedSquare,
    setHighlightSquareFrom,
    setHighlightSquareTo,
    setPromotion,
    setFen,
    updateCapturedPieces,
    handleMoveLive,
    gameStatus,
    setGameStatus,
    setUser,
    setChessRoom,
    game,
    orientation,
    user,
    chessRoomId,
    chessRoom,
    captureSound,
    checkSound,
    moveSound,
  }: HandleSquareClickProps) =>
  (square: Square) => {
    if (gameStatus.status) {
      const turn = game.turn()
      if (orientation === turn) {
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
            (m: { from: string; to: string; promotion: string }) =>
              m.from === move.from &&
              m.to === move.to &&
              (m.promotion === move.promotion || !m.promotion),
          )

          if (isMoveLegal) {
            const foundMove = legalMoves.find(
              (m: { from: string; to: string; flags: string | string[] }) =>
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
              const moveToVerifyCaptured = game.move(move)
              setFen(game.fen())
              const loseId =
                user?.id === chessRoom?.playerOne.id
                  ? chessRoom?.playerTwo.id
                  : chessRoom?.playerOne.id
              isGameOverChess(
                chessRoomId as string,
                user?.id as string,
                user?.id as string,
                loseId as unknown as string,
                game,
                false,
                false,
                user as UserDataType,
                chessRoom?.challenge.amount as number,
                true,
                setGameStatus,
                setUser,
                setChessRoom,
              )
              setHighlightSquareTo(square)
              handleMoveLive(move)
              setSelectedSquare(null)
              updateCapturedPieces(moveToVerifyCaptured)
              if (moveToVerifyCaptured.captured && captureSound) {
                captureSound.play().catch((error) => {
                  console.error('Erro ao reproduzir som de captura:', error)
                })
              } else if (game.inCheck() && checkSound) {
                checkSound.play().catch((error) => {
                  console.error('Erro ao reproduzir som de xeque:', error)
                })
              } else if (moveSound) {
                moveSound.play().catch((error) => {
                  console.error('Erro ao reproduzir som de movimento:', error)
                })
              }
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
