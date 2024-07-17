import { chessResultCreate } from 'src/pages/api/chess-result/chessResultCreate'
import { endGame } from 'src/pages/api/chess-room/chess-challenge-websocket'
import { GameStatus } from 'src/types/apps/chessTypes'

/* eslint-disable no-unused-vars */
interface ChessGame {
  isCheckmate: () => boolean
  isStalemate: () => boolean
  isThreefoldRepetition: () => boolean
  isInsufficientMaterial: () => boolean
  isDraw: () => boolean
  isGameOver: () => boolean
}

type GameStatusSetter = (data: GameStatus) => void

export const isGameOverChess = (
  roomId: string,
  userId: string,
  winnerId: string,
  loserId: string,
  game: ChessGame,
  isLiveMoveVerification: boolean | null | undefined,
  setGameStatus: GameStatusSetter,
): boolean => {
  let gameOverCondition: string | null = null

  switch (true) {
    case game.isCheckmate():
      gameOverCondition = 'Checkmate'
      break
    case game.isStalemate():
      gameOverCondition = 'Stalemate'
      break
    case game.isThreefoldRepetition():
      gameOverCondition = 'Draw by threefold repetition'
      break
    case game.isInsufficientMaterial():
      gameOverCondition = 'Draw due to insufficient material'
      break
    case game.isDraw():
      gameOverCondition = 'Draw by some other rule (50-move rule, etc)'
      break
    case game.isGameOver():
      gameOverCondition = 'The game is over by one of the above conditions.'
      break
    default:
      break
  }

  if (gameOverCondition) {
    if (!isLiveMoveVerification) {
      chessResultCreate({
        roomId,
        winnerId,
        loserId,
        resultType: gameOverCondition,
      }).then((response) => {
        endGame(response.id, roomId, userId, loserId, gameOverCondition)

        setGameStatus({
          status: false,
          message: gameOverCondition,
          loserId,
        })
        return true
      })
      setGameStatus({ status: false, message: gameOverCondition, loserId })
      return true
    }
  }

  return false
}
