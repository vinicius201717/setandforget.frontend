export interface Player {
  id: number
  name: string
  age: number
  number: number | null
  photo: string
  position: string
}

export interface PlayersResponse {
  players: Player[]
}

export interface Games {
  appearences: number | null
  lineups: number | null
  minutes: number | null
  position: string
  rating: number | string | null
  captain: boolean
}

export interface Goals {
  total: number | null
  assists: number | null
  conceded: number | null
  saves: number | null
}

export interface Shots {
  total: number | null
  on: number | null
}

export interface Passes {
  total: number | null
  key: number | null
  accuracy: number | null
}

export interface Tackles {
  total: number | null
  blocks: number | null
  interceptions: number | null
}

export interface Duels {
  total: number | null
  won: number | null
}

export interface Dribbles {
  attempts: number | null
  success: number | null
  past: number | null
}

export interface Fouls {
  committed: number | null
  drawn: number | null
}

export interface Cards {
  yellow: number | null
  red: number | null
  yellowred: number | null
}

export interface Penalty {
  won: number | null
  commited: number | null
  missed: number | null
  saved: number | null
  scored: number | null
}

export interface Substitutes {
  in: number | null
  out: number | null
  bench: number | null
}

export interface League {
  id: number
  name: string
  country: string
  logo: string
  flag: string
  season: number
}

export interface Team {
  id: number
  name: string
  logo: string
}

export interface PlayerStatistics {
  games: Games
  goals: Goals
  shots: Shots
  passes: Passes
  tackles: Tackles
  duels: Duels
  dribbles: Dribbles
  fouls: Fouls
  cards: Cards
  penalty: Penalty
  substitutes: Substitutes
  league: League
  team: Team
}

export interface PlayerDetails {
  id: number
  name: string
  firstname: string
  lastname: string
  age: number
  nationality: string
  height: string
  weight: string
  injured: boolean
  photo: string
  birth: {
    country: string
    date: string
    place: string
  }
}

export interface PlayerStatisticsResponse {
  player: PlayerDetails
  statistics: PlayerStatistics[]
}
