export const translateGameOverMessage = (
  gameOverCondition: string,
  winnerId: string,
  userId: string,
): string => {
  switch (gameOverCondition) {
    case 'Stalemate':
      return 'Game tied'
    case 'Give up':
      return userId === winnerId ? 'You won' : 'You lost'
    case 'Checkmate':
      return userId === winnerId ? 'You won' : 'You lost'
    case 'Draw by threefold repetition':
      return 'Game tied'
    case 'Draw due to insufficient material':
      return 'Game tied'
    case 'Draw by some other rule (50-move rule, etc)':
      return 'Game tied'
    case 'Draw proposal':
      return 'Game tied'

    default:
      return gameOverCondition
  }
}
