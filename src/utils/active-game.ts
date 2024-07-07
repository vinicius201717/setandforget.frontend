import { NextRouter } from 'next/router'

export const checkIfHaveActiveGame = (router: NextRouter) => {
  const chessRoomId = window.localStorage.getItem('chess-room-id')
  if (chessRoomId) {
    const pathname = router.pathname
    const regex = /^\/chess\/play\/.+$/

    if (!regex.test(pathname)) {
      router.push(`/chess/play/${chessRoomId}`)
    }
  }
}
