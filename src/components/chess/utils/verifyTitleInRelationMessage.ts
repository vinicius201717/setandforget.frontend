export const translateGameOverMessage = (
  gameOverCondition: string,
  loserId: string,
  userId: string,
): string => {
  switch (gameOverCondition) {
    case 'Stalemate':
      return 'Game tied'
    case 'Give up':
      return userId === loserId ? 'You lost' : 'You won'
    case 'Checkmate':
      return userId === loserId ? 'You lost' : 'You won'
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
