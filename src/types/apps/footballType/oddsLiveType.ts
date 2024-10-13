interface FixtureStatus {
  elapsed: number
  long: string
  seconds: string
}

interface Fixture {
  id: number
  status: FixtureStatus
}

interface League {
  id: number
  season: number
}

interface OddsValue {
  handicap: number | null
  main: boolean | null
  odd: string
  suspended: boolean
  value: string
}

interface Odds {
  id: number
  name: string
  values: OddsValue[]
}

interface Status {
  blocked: boolean
  finished: boolean
  stopped: boolean
}

interface Team {
  id: number
  goals: number
}

interface Teams {
  home: Team
  away: Team
}

export interface MatchData {
  fixture: Fixture
  league: League
  odds: Odds[]
  status: Status
  teams: Teams
  update: string
}
