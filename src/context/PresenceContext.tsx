/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-unused-vars */
// src/contexts/PresenceContext.tsx
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react'
import { io, Socket } from 'socket.io-client'
import { AuthContext } from './AuthContext'
import { NotificationsType, OnlineUser } from './types'

type PresenceContextType = {
  onlineUsers: OnlineUser[]
  socket: Socket | null
  sendNotification: (toUserId: string, message: string) => void
  pingServer: () => void
}

const defaultValues: PresenceContextType = {
  onlineUsers: [],
  socket: null,
  sendNotification: () => {},
  pingServer: () => {},
}

const PresenceContext = createContext<PresenceContextType>(defaultValues)

type Props = {
  children: ReactNode
}

export const PresenceProvider = ({ children }: Props) => {
  const { user, addNotification } = useContext(AuthContext)
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([])

  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    if (!user) return
    // Conecta ao Presence Gateway na porta 3003
    const socket = io('http://localhost:3003/presence', {
      query: { userId: user?.id },
    })
    socketRef.current = socket

    socket.on('connect', () => {
      console.log('Connected to Presence Gateway:', socket.id)
    })

    // ========================
    // Eventos do servidor
    // ========================
    socket.on('user-online', ({ userId }: { userId: OnlineUser }) => {
      setOnlineUsers((prev) =>
        prev.includes(userId) ? prev : [...prev, userId],
      )
    })

    socket.on('presenteFriendship', (onlines: OnlineUser[]) => {
      setOnlineUsers(onlines)
    })

    socket.on('user-offline', ({ userId }: { userId: OnlineUser }) => {
      setOnlineUsers((prev) => prev.filter((id) => id !== userId))
    })

    socket.on('notification', (payload: NotificationsType) => {
      addNotification(payload)
    })

    return () => {
      socket.disconnect()
    }
  }, [user])

  // ========================
  // Funções de envio
  // ========================
  const sendNotification = (toUserId: string, message: string) => {
    socketRef.current?.emit('notify', { toUserId, message })
  }

  const pingServer = () => {
    socketRef.current?.emit('ping')
  }

  return (
    <PresenceContext.Provider
      value={{
        onlineUsers,
        socket: socketRef.current,
        sendNotification,
        pingServer,
      }}
    >
      {children}
    </PresenceContext.Provider>
  )
}

export const usePresence = () => useContext(PresenceContext)
