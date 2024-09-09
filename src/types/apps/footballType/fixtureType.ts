interface team {
  id: number
  name: string
  logo: string
  winner: boolean | null
}

export interface fixtureType {
  home: team
  away: team
}
