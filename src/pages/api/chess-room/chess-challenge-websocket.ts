/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import toast from 'react-hot-toast'
import { io, Socket } from 'socket.io-client'
import { Draw, GameStatus, Revenge, Room } from 'src/types/apps/chessTypes'

let socket: Socket | null = null

export const connectSocket = (
  challengeId: string | null,
  roomId: string | null,
  creatorId: string | null,
  userId: string | null,
  amount: string | null,
  friendChallenge: string | null,
  setDraw: React.Dispatch<React.SetStateAction<Draw>> | null,
  setRevenge: React.Dispatch<React.SetStateAction<Revenge>> | null,
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
      friendChallenge,
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
      setGameStatus({
        status: data.status,
        message: data.message,
        loserId: data.loserId,
      })
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
    if (setGameStatus) {
      setGameStatus({ status: data.status, message: data.message, loserId: '' })
    }
  })

  socket.on('revengeRequest', (data: Revenge) => {
    if (setRevenge)
      setRevenge({
        name: data.name,
        roomId: data.roomId,
        userId: data.userId,
        status: data.status,
        cancelled: data.cancelled,
      })
  })

  socket.on('revengeAccept', (roomId: string) => {
    window.localStorage.setItem('chess-room-id', roomId)
    window.location.href = `/chess/play/${roomId}`
  })

  socket.on('revengeRefuse', (data: Revenge) => {
    if (setRevenge)
      setRevenge({
        name: data.name,
        roomId: data.roomId,
        userId: data.userId,
        status: data.status,
        cancelled: data.cancelled,
      })
  })

  socket.on('revengeCancelRequest', (data: Revenge) => {
    if (setRevenge)
      setRevenge({
        name: data.name,
        roomId: data.roomId,
        userId: data.userId,
        status: data.status,
        cancelled: data.cancelled,
      })
  })

  socket.on('endGame', (data) => {
    if (setGameStatus)
      setGameStatus({
        status: data.status,
        message: data.message,
        loserId: data.loserId,
      })
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

export const revenge = (roomId: string, userId: string, name: string) => {
  const query = { roomId, userId, name }
  if (socket) socket.emit('revenge', query)
}

export const revengeCancel = (
  roomId: string,
  userId: string,
  name: string,
  status: boolean,
) => {
  const query = { roomId, userId, name, status }
  if (socket) socket.emit('revengeCancel', query)
}

export const acceptRevenge = (
  roomId: string,
  userId: string,
  name: string,
  duration: number,
  newRoomId: string,
  newChallengeId: string,
) => {
  const query = { roomId, userId, name, duration, newRoomId, newChallengeId }
  if (socket) socket.emit('acceptRevenge', query)
}

export const refuseRevenge = (roomId: string, userId: string, name: string) => {
  const query = { roomId, userId, name }
  if (socket) socket.emit('refuseRevenge', query)
}

export const endGame = (
  resultId: string,
  roomId: string,
  userId: string,
  loserId: string,
  resultType: string,
) => {
  const query = {
    resultId,
    roomId,
    userId,
    loserId,
    resultType,
  }
  if (socket) {
    socket.emit('endGame', query)
  }
}

export const isUserConnected = (): boolean => {
  return !!socket?.connected
}
