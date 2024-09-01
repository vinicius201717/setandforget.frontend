interface League {
  id: number
  name: string
  country: string
  logo: string
  flag: string
  season: number
}

interface Team {
  id: number
  name: string
  logo: string
}

interface MinuteData {
  total: number | null
  percentage: string | null
}

interface ForAgainst {
  total: {
    home: number
    away: number
    total: number
  }
  average: {
    home: string
    away: string
    total: string
  }
  minute: {
    '0-15': MinuteData
    '16-30': MinuteData
    '31-45': MinuteData
    '46-60': MinuteData
    '61-75': MinuteData
    '76-90': MinuteData
    '91-105': MinuteData
    '106-120': MinuteData
  }
}

export interface Goals {
  for: ForAgainst
  against: ForAgainst
}

export interface Cards {
  yellow: {
    '0-15': MinuteData
    '16-30': MinuteData
    '31-45': MinuteData
    '46-60': MinuteData
    '61-75': MinuteData
    '76-90': MinuteData
    '91-105': MinuteData
    '106-120': MinuteData
  }
  red: {
    '0-15': MinuteData
    '16-30': MinuteData
    '31-45': MinuteData
    '46-60': MinuteData
    '61-75': MinuteData
    '76-90': MinuteData
    '91-105': MinuteData
    '106-120': MinuteData
  }
}

export interface Fixtures {
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

export interface CleanSheetAndFailedToScore {
  home: number
  away: number
  total: number
}

export interface Penalty {
  scored: {
    total: number
    percentage: string
  }
  missed: {
    total: number
    percentage: string
  }
  total: number
}

export interface Biggest {
  streak: {
    wins: number
    draws: number
    loses: number
  }
  wins: {
    home: string | null
    away: string | null
  }
  loses: {
    home: string | null
    away: string | null
  }
  goals: {
    for: {
      home: number | null
      away: number | null
    }
    against: {
      home: number | null
      away: number | null
    }
  }
}

export interface Lineup {
  formation: string
  played: number
}

export interface FootballTeamStatistics {
  league: League
  team: Team
  form: string
  fixtures: Fixtures
  goals: Goals
  clean_sheet: CleanSheetAndFailedToScore
  failed_to_score: CleanSheetAndFailedToScore
  penalty: Penalty
  cards: Cards
  biggest: Biggest
  lineups: Lineup[]
}

interface Venue {
  id: number
  name: string
  address: string
  city: string
  capacity: number
  surface: string
  image: string
}

interface Team {
  id: number
  name: string
  code: string | null
  country: string
  founded: number
  national: boolean
  logo: string
  venue: Venue
}

export interface TeamInformationInterface {
  team: Team
  venue: Venue
}
