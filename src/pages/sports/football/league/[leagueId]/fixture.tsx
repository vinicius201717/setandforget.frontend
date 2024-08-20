import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getFixtureLeague } from 'src/pages/api/football/fixture/getFixtureLeague'

export default function LeagueFixture() {
  const router = useRouter()
  const { leagueId } = router.query
  const [leagueData, setLeagueData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (leagueId) {
      try {
        getFixtureLeague(leagueId as string).then((league: any) => {
          setLeagueData(league)
        })
      } catch (error) {
        console.error('Erro ao buscar os dados da liga:', error)
      } finally {
        setLoading(false)
      }
    }
  }, [leagueId])

  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div>
      <h1>Dados da Liga</h1>
      <pre>{JSON.stringify(leagueData, null, 2)}</pre>
    </div>
  )
}
