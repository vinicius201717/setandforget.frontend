import toast from 'react-hot-toast'
import { io, Socket } from 'socket.io-client'
import { Draw, GameStatus, Room } from 'src/types/apps/chessTypes'

let socket: Socket | null = null

export const connectSocket = (
  challengeId: string | null,
  roomId: string | null,
  creatorId: string | null,
  userId: string | null,
  amount: string | null,
  setDraw: React.Dispatch<React.SetStateAction<Draw>> | null,
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>> | null,
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

  socket.on('giveUp', (data: GameStatus) => {
    if (setGameStatus)
      setGameStatus({ status: data.status, message: data.message })
  })

  socket.on('draw', (name: string, userId: string) => {
    if (setDraw) setDraw({ active: true, name, userId })
  })

  socket.on('refuseDraw', (name: string) => {
    toast(`${name} refuse draw!`, {
      position: 'bottom-right',
    })
  })

  socket.on('acceptDraw', (data: GameStatus) => {
    if (setGameStatus)
      setGameStatus({ status: data.status, message: data.message })
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

export const draw = (roomId: string, userId: string, name: string) => {
  const query = {
    roomId,
    userId,
    name,
  }
  if (socket) {
    socket.emit('draw', query)
  }
}

export const refuseDraw = (roomId: string, userId: string, name: string) => {
  const query = {
    roomId,
    userId,
    name,
  }
  if (socket) {
    socket.emit('refuseDraw', query)
  }
}

export const acceptDraw = (roomId: string, userId: string, name: string) => {
  const query = {
    roomId,
    userId,
    name,
  }
  if (socket) {
    socket.emit('acceptDraw', query)
  }
}
