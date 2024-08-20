interface Country {
  name: string
  code: string | null
  flag: string | null
}

interface League {
  id: number
  name: string
  type: string
  logo: string
}

interface Coverage {
  fixtures: {
    events: boolean
    lineups: boolean
    statistics_fixtures: boolean
    statistics_players: boolean
  }
  injuries: boolean
  odds: boolean
  players: boolean
  predictions: boolean
  standings: boolean
  top_assists: boolean
  top_cards: boolean
  top_scorers: boolean
}

interface Season {
  year: number
  start: string
  end: string
  current: boolean
  coverage: Coverage
}

export interface LeagueResponse {
  country: Country
  league: League
  seasons: Season[]
}

export interface UserFavoriteLeague {
  id: string
  userId: string
  leagueId: number
  addedAt: Date
}

export interface LeagueWithPagination {
  userFavoriteLeagues: UserFavoriteLeague[]
  leagues: LeagueResponse[]
  allLeagues: LeagueResponse[]
  total: number
}
