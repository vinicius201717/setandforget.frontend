import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

interface UseWebSocketOptions {
  url: string
}

export const useWebSocket = ({ url }: UseWebSocketOptions) => {
  const [message, setMessage] = useState<string | null>(null)
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const newSocket = io(url)
    setSocket(newSocket)

    newSocket.on('connect', () => {
      console.log('Conectado ao WebSocket Server')
    })

    newSocket.on('serverMessage', (data: string) => {
      console.log('Mensagem recebida do servidor:', data)
      setMessage(data)
    })

    return () => {
      newSocket.disconnect()
      console.log('Desconectado do WebSocket')
    }
  }, [url])

  const sendMessage = (msg: string) => {
    if (socket) {
      socket.emit('clientMessage', msg)
    }
  }

  return { message, sendMessage }
}
