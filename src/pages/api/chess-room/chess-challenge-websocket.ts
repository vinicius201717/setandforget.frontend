import { io, Socket } from 'socket.io-client'
import { Room } from 'src/types/apps/chessTypes'

let socket: Socket | null = null

export const connectSocket = (
  challengeId: string | null,
  roomId: string | null,
  creatorId: string | null,
  userId: string | null,
  amount: string | null,
  setGameStatus: React.Dispatch<React.SetStateAction<boolean>> | null,
  setChessRoom: React.Dispatch<React.SetStateAction<Room | null>> | null,
  setLiveMove: React.Dispatch<
    React.SetStateAction<
      | {
          from: string
          to: string
          promotion?: string
          wTime: number
          bTime: number
        }
      | undefined
    >
  > | null,
) => {
  if (socket) {
    socket.disconnect()
  }

  socket = io('http://localhost:3002/chess', {
    query: {
      challengeId,
      roomId,
      creatorId,
      userId,
      amount,
    },
  })

  socket.on('move', (move) => {
    if (setLiveMove) setLiveMove(move)
  })

  socket.on('disconnect', () => {
    console.log('Disconnected from WebSocket server')
  })

  socket.on('message', (move: string) => {
    console.log('Message received from server:', move)
    if (setChessRoom) setChessRoom(null)
  })

  socket.on('reconnected', (game) => {
    if (setChessRoom) setChessRoom(game)
  })

  socket.on('roomComplete', (data) => {
    window.localStorage.removeItem('chess-challenge-id')
    window.location.href = `/chess/play/${data.roomId}`
  })

  socket.on('giveUp', (data: boolean) => {
    if (setGameStatus) setGameStatus(data)
  })
}

export const sendMove = (
  roomId: string,
  roomLogId: string,
  userId: string,
  move: { from: string; to: string; promotion?: string },
  fen: string,
  moveHistory: string[],
) => {
  if (socket) {
    const query = {
      roomId,
      roomLogId,
      userId,
      ...move,
      fen,
      moveHistory,
    }
    socket.emit('move', query)
  }
}

export const giveUp = (roomId: string, userId: string) => {
  const query = {
    roomId,
    userId,
  }
  if (socket) {
    socket.emit('giveUp', query)
  }
}
