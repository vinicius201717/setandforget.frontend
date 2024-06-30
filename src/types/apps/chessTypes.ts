import { Chess, Square } from 'chess.js'
import React from 'react'

export interface HandleSquareClickProps {
  square: Square
  selectedSquare: Square | null
  game: Chess
  destinationSquare: string | null
  setDestinationSquare: React.Dispatch<React.SetStateAction<Square | null>>
  setSelectedSquare: React.Dispatch<React.SetStateAction<Square | null>>
  setPosition: React.Dispatch<React.SetStateAction<string>>
  setPromotion: React.Dispatch<
    React.SetStateAction<{
      show: boolean
      sourceSquare: string
      targetSquare: string
    }>
  >
  switchPlayer: () => void
}

export interface OnDropParams {
  sourceSquare: string
  targetSquare: string
  game: Chess
  destinationSquare: string | null
  setPromotion: React.Dispatch<
    React.SetStateAction<{
      show: boolean
      sourceSquare: string
      targetSquare: string
    }>
  >
  setPosition: React.Dispatch<React.SetStateAction<string>>
  setSelectedSquare: React.Dispatch<React.SetStateAction<Square | null>>
  setDestinationSquare: React.Dispatch<React.SetStateAction<Square | null>>
  switchPlayer: () => void
}

export interface SelectedSquareProps {
  action: string
  square: Square
  selectedSquare: Square | null
  destinationSquare: string | null
  setDestinationSquare: React.Dispatch<React.SetStateAction<Square | null>>
  setSelectedSquare: React.Dispatch<React.SetStateAction<Square | null>>
}

export interface ClockProps {
  time: number
  who: boolean
  set: React.Dispatch<React.SetStateAction<number>>
}

export interface PromotionProps {
  show: boolean
  color: 'w' | 'b'
  from: Square
  to: Square
}

export type PieceType = 'q' | 'r' | 'b' | 'n'

export interface CreatorType {
  id: string
  name: string
  avatar: string
}

export interface GameType {
  challengeId: string
  user: CreatorType
  amount: number
  duration: number
}

export interface ChallengeGlobalType {
  id: string
  user: CreatorType
  duration: number
  amount: number
}

export interface Challenge {
  id: string
  userId: string
  amount: number
  created_at: string
  duration: number
  status: boolean
  updated_at: string
}

interface Player {
  id: string
  name: string
  avatar: string | null
}

interface RoomLog {
  id: string
  roomId: string
  fen: string
  moveHistory: string
  duration: string
  created_at: string
  updated_at: string | null
}

export interface Room {
  challenge: Challenge
  playerOne: Player
  playerTwo: Player
  roomLogs: RoomLog[]
}

export interface RoomLogsLive {
  fen: string
  moveHistory: string
  duration: string
}
