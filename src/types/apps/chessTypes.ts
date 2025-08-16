/* eslint-disable no-unused-vars */
import { Chess, Square } from 'chess.js'
import React, { Dispatch, SetStateAction } from 'react'
import { UserDataType } from 'src/context/types'

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

export interface CreateChallengeReturn {
  challenge: {
    amount: number
    created_at: string
    duration: number
    id: string
    roomId: string | null
    status: boolean
    updated_at: string
    userId: string
  }
  room: {
    challengeId: string
    created_at: string
    duration: number
    id: string
    playerOneId: string | null
    playerTwoId: string | null
    status: boolean
    updated_at: string
    userId: string | null
  }
  checkEqual: boolean
}

export interface GameType {
  challengeId: string
  user: CreatorType
  roomId: string
  amount: number
  duration: number
}

export interface ChallengeGlobalType {
  id: string
  user: CreatorType
  Room: { id: string }
  duration: number
  amount: number
}
export interface GetChallengeInterface {
  id: string
  roomId: string | null
  userId: string
  amount: number
  duration: number
  status: boolean
  created_at: string // ou Date
  updated_at: string // ou Date
  Room: {
    id: string
    challengeId: string
    playerOneId: string
    playerTwoId: string
    duration: number
    status: boolean
    created_at: string // ou Date, se você for converter
    updated_at: string // ou Date
    userId: string | null
  }
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

export interface Player {
  id: string
  name: string
  avatar: string | null
}

interface RoomLog {
  id: string
  roomId: string
  fen: string
  moveHistory: string
  duration: string | null
  created_at: string
  updated_at: string | null
}

interface RoomSocket {
  wTime: number
  bTime: number
}

export interface RoomResult {
  id: string
  roomId: string
  winnerId: string
  loserId: string
  resultType: string
  created_at: string
}

export interface Draw {
  active: boolean
  name: string
  userId: string
}

export interface Revenge {
  name: string
  userId: string
  roomId: string
  status: boolean
  cancelled: boolean
}

export interface GameStatus {
  status: boolean
  message: string
  loserId: string
}

export interface Room {
  challenge: Challenge
  playerOne: Player
  playerTwo: Player
  status: boolean
  roomLog: RoomLog
  roomSocket: RoomSocket
  result: RoomResult | null
}

export interface RoomLogsLive {
  fen: string
  moveHistory: string
  duration: string
}
export interface Result {
  id: string
  roomId: string
  winnerId: string
  loserId: string
  resultType: string
  created_at: string
  winner: Player
  loser: Player
  room: { id: string; challenge: Challenge }
}

export interface ApiResultsResponse {
  results: Result[]
  totalCount: number
  totalPages: number
  currentPage: number
}

export interface ChessboardComponentProps {
  chessRoomId?: string
  selectedSquare: Square | null
  setSelectedSquare: Dispatch<SetStateAction<Square | null>>
  setHighlightSquareFrom: Dispatch<SetStateAction<Square | null>>
  setHighlightSquareTo: Dispatch<SetStateAction<Square | null>>
  setPromotion: Dispatch<SetStateAction<PromotionProps | null>>
  setFen: Dispatch<SetStateAction<string>>
  updateCapturedPieces: (move: any) => void
  handleMoveLive: (move: {
    from: string
    to: string
    promotion?: string
  }) => void
  gameStatus: GameStatus
  setGameStatus: Dispatch<SetStateAction<GameStatus>>
  setUser: Dispatch<SetStateAction<UserDataType | null>>
  setChessRoom: Dispatch<SetStateAction<Room | null>>
  game: any
  orientation: 'w' | 'b'
  user: UserDataType | null
  chessRoom: Room | null
  captureSound: HTMLAudioElement | null
  checkSound: HTMLAudioElement | null
  moveSound: HTMLAudioElement | null
}
