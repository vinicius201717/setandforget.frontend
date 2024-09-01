import { useState } from 'react'
import LeagueTopRedCard from 'src/components/football/footballLeague/TopRedCard'
import LeagueTopYellowCard from 'src/components/football/footballLeague/TopYellowCard'

export default function TopCardComponent() {
  const [card, setCard] = useState<'RED' | 'YELLOW'>('RED')

  const handleCard = (card: 'RED' | 'YELLOW') => {
    setCard(card)
  }

  return (
    <>
      {card === 'RED' ? (
        <LeagueTopRedCard handleCard={handleCard} />
      ) : (
        <LeagueTopYellowCard handleCard={handleCard} />
      )}
    </>
  )
}
