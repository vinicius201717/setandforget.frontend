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

export interface LeagueResponseFavorite {
  id: number
  leagueId: number
  userId: string
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
  logo: string
  name: string
  type: string
  createdAt: string
}

export interface LeagueWithPagination {
  userFavoriteLeagues: UserFavoriteLeague[]
  leagues: LeagueResponse[]
  allLeagues: LeagueResponse[]
  total: number
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
} // Importe as interfaces que você já tem definidas

interface PredictionTeamStats {
  att: string // Ataque
  def: string // Defesa
  form: string // Forma
  goals: {
    against: {
      average: string
      total: number
    }
    for: {
      average: string
      total: number
    }
  }
  played: number
}

interface PredictionComparison {
  away: string
  home: string
}

interface Prediction {
  advice: string
  goals: {
    away: string
    home: string
  }
  percent: {
    away: string
    draw: string
    home: string
  }
  under_over: string | null
  win_or_draw: boolean
  winner: {
    comment: string
    id: number
    name: string
  } | null
}

interface TeamPrediction {
  id: number
  name: string
  logo: string
  last_5: PredictionTeamStats
  league: {
    biggest: {
      goals: {
        against: {
          away: number
          home: number
        }
        for: {
          away: number
          home: number
        }
      }
      streak: {
        draws: number
        loses: number
        wins: number
      }
    }
    clean_sheet: {
      home: number
      away: number
      total: number
    }
    failed_to_score: {
      home: number
      away: number
      total: number
    }
    fixtures: {
      played: {
        home: number
        away: number
        total: number
      }
      wins: {
        home: number
        away: number
        total: number
      }
      draws: {
        home: number
        away: number
        total: number
      }
      loses: {
        home: number
        away: number
        total: number
      }
    }
    form: string
    goals: {
      for: {
        average: {
          away: string
          home: string
          total: string
        }
      }
      against: {
        average: {
          away: string
          home: string
          total: string
        }
      }
    }
    lineups: {
      formation: string
      played: number
    }[]
    penalty: {
      scored: {
        percentage: string
        total: number
      }
      missed: {
        percentage: string
        total: number
      }
    }
  }
}

interface Fixture {
  id: number
  date: string
  timestamp: number
  referee: string
  timezone: string
  venue: {
    id: number
    name: string
    city: string
  }
  status: {
    short: string
    long: string
    elapsed: number | null
  }
}

interface H2H {
  fixture: Fixture
  goals: {
    home: number
    away: number
  }
  league: {
    id: number
    name: string
    country: string
    logo: string
    flag: string
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
  teams: {
    home: TeamPrediction
    away: TeamPrediction
  }
}

export interface PredictionsResponse {
  comparison: {
    att: PredictionComparison
    def: PredictionComparison
    form: PredictionComparison
    goals: PredictionComparison
    h2h: PredictionComparison
    poisson_distribution: PredictionComparison
    total: PredictionComparison
  }
  h2h: H2H[]
  league: {
    country: string
    flag: string
    id: number
    logo: string
    name: string
    season: number
  }
  predictions: Prediction
  teams: {
    home: Team
    away: Team
  }
}
