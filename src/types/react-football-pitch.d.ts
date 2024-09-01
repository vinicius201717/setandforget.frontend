declare module 'react-football-pitch' {
  export interface Squad {
    goalkeeper: { number: number; name: string }[]
    defense: { number: number; name: string }[]
    midfield: { number: number; name: string }[]
    attack: { number: number; name: string }[]
  }

  export interface Team {
    squad: Squad
    formation: string
  }

  export const Pitch: React.FC<{ homeTeam: Team; awayTeam: Team }>
}
