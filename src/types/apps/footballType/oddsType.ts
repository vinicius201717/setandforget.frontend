export interface BetsValues {
  odd: string
  value: string
  [key: string]: any
}

export interface Bets {
  id: number
  name: string
  values: BetsValues[]
}

export interface Bookmakers {
  id: number
  name: string
  bets: Bets[]
}

export interface BetsData {
  id: number
  bookmakers: Bookmakers[]
  name: string
}

export interface OddsBetType {
  id: number
  name: string
}

export interface UserFavoriteOddsBetType {
  id: string
  betId: number
  userId: string
  name: string
  createdAt: string
}
