import { io, Socket } from 'socket.io-client'
import { Room } from 'src/types/apps/chessTypes'

let socket: Socket | null = null

export const connectSocket = (
  roomId: string | null,
  creatorId: string | null,
  userId: string | null,
  setChessRoom: React.Dispatch<React.SetStateAction<Room | null>> | null,
) => {
  if (socket) {
    socket.disconnect()
  }

  socket = io('http://localhost:3002/chess', {
    query: {
      roomId,
      creatorId,
      userId,
    },
  })

  socket.on('createRoom', () => {
    if (roomId && userId) createRoom(roomId, userId)
  })

  socket.on('disconnect', () => {
    console.log('Disconnected from WebSocket server')
  })

  socket.on('message', (move: string) => {
    console.log('Message received from server:', move)
    if (setChessRoom) setChessRoom(null)
  })

  socket.on('reconnected', (gameData) => {
    console.log('Reconnected to the game:', gameData)
  })

  socket.on('roomComplete', (data) => {
    window.location.href = `/chess/play/${data.chessRoomId}`
  })
}

export const createRoom = (roomId: string, userId: string) => {
  if (socket) {
    socket.emit('createRoom', { roomId, userId })
  }
}

export const joinRoom = (roomId: string, userId: string) => {
  if (socket) {
    socket.emit('joinRoom', { roomId, userId })
  }
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
    console.log('Sending move:', query)
    socket.emit('move', query)
  }
}
