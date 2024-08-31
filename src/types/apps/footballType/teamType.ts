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

interface Goals {
  for: ForAgainst
  against: ForAgainst
}

interface Cards {
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

interface Fixtures {
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

interface CleanSheetAndFailedToScore {
  home: number
  away: number
  total: number
}

interface Penalty {
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

interface Biggest {
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

interface Lineup {
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
