/* eslint-disable @typescript-eslint/no-explicit-any */
interface Country {
  name: string
  code: string | null
  flag: string | null
}

export interface League {
  id: number
  name: string
  logo: string
  type: string
}
interface CoverageDetails {
  events: boolean
  lineups: boolean
  statistics_fixtures: boolean
  statistics_players: boolean
}

export interface Coverage {
  [key: string]: boolean | any
  fixtures: CoverageDetails
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

export interface FixtureTypeResponse {
  fixture: {
    id: number
    referee: string | null
    timezone: string
    date: string
    timestamp: number
    periods: {
      first: number | null
      second: number | null
    }
    venue: {
      id: number
      name: string
      city: string
    }
    status: {
      long: string
      short: string
      elapsed: number | null
    }
  }
  league: {
    id: number
    name: string
    country: string
    logo: string
    flag: string
    season: number
    round: string
  }
  teams: {
    home: {
      id: number
      name: string
      logo: string
      winner: boolean | null
    }
    away: {
      id: number
      name: string
      logo: string
      winner: boolean | null
    }
  }
  goals: {
    home: number | null
    away: number | null
  }
  score: {
    halftime: {
      home: number | null
      away: number | null
    }
    fulltime: {
      home: number | null
      away: number | null
    }
    extratime: {
      home: number | null
      away: number | null
    }
    penalty: {
      home: number | null
      away: number | null
    }
  }
}
export interface Team {
  id: number
  name: string
  logo: string
}

export interface Standing {
  rank: number
  team: Team
  points: number
  goalsDiff: number
  group: string
  form: string
  status: string
  description: string
  all: {
    played: number
    win: number
    draw: number
    lose: number
    goals: {
      for: number
      against: number
    }
  }
  home: {
    played: number
    win: number
    draw: number
    lose: number
    goals: {
      for: number
      against: number
    }
  }
  away: {
    played: number
    win: number
    draw: number
    lose: number
    goals: {
      for: number
      against: number
    }
  }
  update: string
}

export interface LeagueStadings {
  league: {
    id: number
    name: string
    country: string
    logo: string
    flag: string
    season: number
    standings: Standing[][]
  }
}
