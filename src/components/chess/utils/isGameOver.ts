/* eslint-disable no-unused-vars */

export const isGameOverChess = (
  game: any,
  setGameStatus: (status: boolean) => void,
): boolean => {
  if (game.isCheckmate()) {
    console.log('Xeque-mate! O jogo acabou.')
    setGameStatus(false)
    return true
  } else if (game.isStalemate()) {
    console.log('Empate por afogamento. O jogo acabou.')
    setGameStatus(false)

    return true
  } else if (game.isThreefoldRepetition()) {
    console.log('Empate por três repetições. O jogo acabou.')
    setGameStatus(false)

    return true
  } else if (game.isInsufficientMaterial()) {
    console.log('Empate por material insuficiente. O jogo acabou.')
    setGameStatus(false)

    return true
  } else if (game.isDraw()) {
    console.log(
      'Empate por alguma outra regra (50 movimentos, etc). O jogo acabou.',
    )
    setGameStatus(false)

    return true
  }
  if (game.isGameOver()) {
    console.log('O jogo acabou por uma das condições acima.')
    setGameStatus(false)

    return true
  }

  return false
}
