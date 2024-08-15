/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserDataType } from 'src/context/types'
import { chessResultCreate } from 'src/pages/api/chess-result/chessResultCreate'
import { endGame } from 'src/pages/api/chess-room/chess-challenge-websocket'
import { GameStatus, Room } from 'src/types/apps/chessTypes'

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
  timeUp: boolean,
  isLiveMoveVerification: boolean | null | undefined,
  user: UserDataType,
  amount: number,
  verifyIfIsLiveMove: boolean,
  setGameStatus: GameStatusSetter,
  setUser: (value: UserDataType) => void,
  setChessRoom: (
    value: Room | ((prevRoom: Room | null) => Room | null),
  ) => void,
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
    case timeUp:
      gameOverCondition = 'Time up'
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
        if (gameOverCondition === 'Checkmate' && verifyIfIsLiveMove) {
          const totalBet = amount * 2
          const winnings = totalBet * 0.9
          const newAmount = user.Account.amount + winnings * 100

          const updatedUser = {
            ...user,
            Account: {
              ...user.Account,
              amount: newAmount,
            },
          }
          setUser(updatedUser)
        } else if (gameOverCondition === 'Time up' && !verifyIfIsLiveMove) {
          const totalBet = amount * 2
          const winnings = totalBet * 0.9
          const newAmount = user.Account.amount + winnings * 100

          const updatedUser = {
            ...user,
            Account: {
              ...user.Account,
              amount: newAmount,
            },
          }
          setUser(updatedUser)
        }
        setGameStatus({
          status: false,
          message: gameOverCondition,
          loserId,
        })

        return true
      })
    } else {
      if (gameOverCondition.includes('Draw')) {
        const newAmount = user.Account.amount + amount * 100

        const updatedUser = {
          ...user,
          Account: {
            ...user.Account,
            amount: newAmount,
          },
        }
        setUser(updatedUser)

        setGameStatus({
          status: false,
          message: gameOverCondition,
          loserId,
        })
        return true
      }
      setGameStatus({
        status: false,
        message: gameOverCondition,
        loserId,
      })
      return true
    }
  }

  return false
}
