import { chessResultCreate } from 'src/pages/api/chess-result/chessResultCreate'

/* eslint-disable no-unused-vars */
interface ChessGame {
  isCheckmate: () => boolean
  isStalemate: () => boolean
  isThreefoldRepetition: () => boolean
  isInsufficientMaterial: () => boolean
  isDraw: () => boolean
  isGameOver: () => boolean
}

interface GameStatus {
  status: boolean
  message: string
}

type GameStatusSetter = (data: GameStatus) => void

export const isGameOverChess = (
  roomId: string,
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
        console.log(response)
        setGameStatus({ status: false, message: gameOverCondition })
        return true
      })
      setGameStatus({ status: false, message: gameOverCondition })
      return true
    }
  }

  return false
}
