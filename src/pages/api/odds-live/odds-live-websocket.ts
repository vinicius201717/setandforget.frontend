/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { io, Socket } from 'socket.io-client'

let socket: Socket | null = null

export const connectOddsSocket = (
  onOddsUpdate: (data: any) => void,
  onConnect?: () => void,
  onDisconnect?: () => void,
) => {
  if (socket) {
    console.log('Socket already exists, disconnecting...')
    socket.disconnect()
  }

  console.log('Attempting to connect to WebSocket on namespace /odds...')
  socket = io('http://localhost:3003/odds', {
    transports: ['websocket'],
  })

  socket.on('connect', () => {
    console.log('Connected to Odds WebSocket server on /odds namespace')
    if (onConnect) onConnect()
  })

  socket.on('disconnect', () => {
    console.log('Disconnected from Odds WebSocket server')
    if (onDisconnect) onDisconnect()
  })

  // Evento para atualizar odds ao vivo
  socket.on('updateData', (data) => {
    console.log('Received odds update:', data)
    onOddsUpdate(data.response)
  })

  // Evento para lidar com a finalização das odds ou tempo esgotado
  socket.on('oddsTimeout', () => {
    console.log('Odds data has timed out or completed')
  })

  // Log any error
  socket.on('connect_error', (error) => {
    console.error('WebSocket connection error:', error)
  })
}

// Enviar mensagem (opcional para interação com o WebSocket)
export const sendOddsRequest = (params: { [key: string]: any }) => {
  if (socket) {
    console.log('Sending odds request with params:', params)
    socket.emit('oddsRequest', params)
  } else {
    console.error('Socket is not connected. Unable to send request.')
  }
}

// Desconectar o WebSocket manualmente
export const disconnectOddsSocket = () => {
  if (socket) {
    console.log('Disconnecting from WebSocket...')
    socket.disconnect()
    socket = null
  }
}
