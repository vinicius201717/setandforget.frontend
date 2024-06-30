import { io, Socket } from 'socket.io-client'
import { Room } from 'src/types/apps/chessTypes'

let socket: Socket | null = null

export const connectSocket = (
  challengeId: string | null,
  creatorId: string | null,
  userId: string | null,
  setChessRoom: React.Dispatch<React.SetStateAction<Room | null>> | null,
) => {
  if (socket) {
    socket.disconnect()
  }
  socket = io(`http://localhost:3002/chess`, {
    query: {
      challengeId,
      creatorId,
      userId,
    },
  })

  socket.on('connect', () => {
    console.log('Connected to WebSocket server')
  })

  socket.on('disconnect', () => {
    console.log('Disconnected from WebSocket server')
  })

  socket.on('message', (move: string) => {
    console.log(move)

    if (setChessRoom) setChessRoom(null)
  })

  socket.on('reconnected', (gameData) => {
    console.log('Reconnected to the game:', gameData)
  })

  socket.on('startGame', (data) => {
    window.location.href = `/chess/play/${data.chessRoomId}`
  })
}

export const sendMove = (
  move: { from: string; to: string },
  fen: string,
  moveHistory: string,
) => {
  if (socket) {
    const query = {
      move,
      fen,
      moveHistory,
    }
    socket.emit('move', query)
  }
}
