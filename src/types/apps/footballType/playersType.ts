export interface Player {
  id: number
  name: string
  age: number
  number: number
  photo: string
  position: string
}

export interface PlayersResponse {
  players: Player[]
}
