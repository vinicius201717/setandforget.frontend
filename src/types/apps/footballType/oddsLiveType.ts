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

export interface Odds {
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

export interface Teams {
  home: Team
  away: Team
}

export interface TeamInfo {
  id: string
  teamId: number
  name: string
  code: string | null
  country: string | null
  founded: number | null
  national: boolean | null
  logo: string
  createdAt: Date
}

interface TeamsInfo {
  home: TeamInfo
  away: TeamInfo
}

export interface MatchData {
  fixture: Fixture
  league: League
  odds: Odds[]
  status: Status
  teams: Teams
  teamsInfo: TeamsInfo
  update: string
}

export interface CartBetType {
  betId: number
  fixtureId: number
  nameBet: string
  value: number
  amount: number
}
