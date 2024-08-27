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

interface LeagueInjurie {
  id: number
  name: string
  logo: string
  flag: string
  country: string
  season: number
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

interface Fixture {
  id: number
  date: string
  timestamp: number
  timezone: string
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

export interface PlayerData {
  player: {
    id: number
    name: string
    age: number
    nationality: string
    height: string
    weight: string
    photo: string
  }
  statistics: Array<{
    league: {
      name: string
      logo: string
      country: string
    }
    team: {
      name: string
      logo: string
    }
    games: {
      appearences: number
      lineups: number
      minutes: number
      position: string
    }
    goals: {
      total: number
      assists: number
    }
    cards: {
      yellow: number | null
      red: number | null
    }
  }>
}

// Tipagem do Objeto Principal (PlayerData)

// Tipagem para Birth
interface Birth {
  date: string
  place: string
  country: string
}

// Tipagem para Statistic

interface Games {
  appearences: number
  lineups: number
  minutes: number
  number: number | null
  position: string
  rating: string
  captain: boolean
}

// Tipagem para Substitutes
interface Substitutes {
  in: number
  out: number
  bench: number
}

// Tipagem para Shots
interface Shots {
  total: number
  on: number
}

// Tipagem para Goals
interface Goals {
  total: number
  conceded: number
  assists: number
  saves: number | null
}

// Tipagem para Passes
interface Passes {
  total: number
  key: number
  accuracy: number
}

// Tipagem para Tackles
interface Tackles {
  total: number
  blocks: number
  interceptions: number
}

// Tipagem para Duels
interface Duels {
  total: number
  won: number
}

// Tipagem para Dribbles
interface Dribbles {
  attempts: number
  success: number
  past: number | null
}

// Tipagem para Fouls
interface Fouls {
  drawn: number
  committed: number
}

// Tipagem para Cards
interface Cards {
  yellow: number
  yellowred: number
  red: number
}

// Tipagem para Penalty
interface Penalty {
  won: number | null
  commited: number | null
  scored: number
  missed: number
  saved: number | null
}

interface Statistic {
  team: Team
  league: League
  season: number
  games: Games
  substitutes: Substitutes
  shots: Shots
  goals: Goals
  passes: Passes
  tackles: Tackles
  duels: Duels
  dribbles: Dribbles
  fouls: Fouls
  cards: Cards
  penalty: Penalty
}

// Tipagem para Player
interface Player {
  id: number
  name: string
  firstname: string
  lastname: string
  age: number
  birth: Birth
  nationality: string
  height: string
  weight: string
  injured: boolean
  photo: string
}

interface PlayerInsure {
  id: number
  name: string
  photo: string
  reason: string
  type: string
}

export interface PlayerDataStatistics {
  player: Player
  statistics: Statistic[]
}

export interface Injuries {
  fixture: Fixture
  league: LeagueInjurie
  player: PlayerInsure
  team: Team
}
