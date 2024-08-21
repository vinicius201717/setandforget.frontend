import { CircularProgress, Container, Typography } from '@mui/material'
import { ContainerFixture, ContainerProgress } from './style'
import FootballLayout from 'src/layouts/components/footballLayout'
import { useState, useEffect, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getFixture } from 'src/pages/api/football/fixture/getFixture'
import { FixtureTypeResponse } from 'src/types/apps/football'
import Image from 'next/image'

import timeoutImage from 'public/images/pages/misc-under-maintenance.png'
import LeagueFixture from 'src/components/footballFixture/LeagueFixture'
import Fixture from 'src/components/footballFixture/Fixture'

export default function Football() {
  const [isTimeout, setIsTimeout] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const {
    data: fixturesGroups,
    isLoading,
    isError,
  } = useQuery<FixtureTypeResponse[][]>({
    queryKey: ['fixtures'],
    queryFn: getFixture,
    refetchOnWindowFocus: false,
    staleTime: 600000,
  })

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setIsTimeout(true)
    }, 10000) // 10 segundos

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isLoading && fixturesGroups && fixturesGroups.flat().length > 0) {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        setIsTimeout(false)
      }
    }
  }, [isLoading, fixturesGroups])

  return (
    <FootballLayout>
      <Container>
        <ContainerFixture>
          {isLoading ? (
            <ContainerProgress>
              <CircularProgress />
            </ContainerProgress>
          ) : isTimeout || isError ? (
            <ContainerProgress>
              <Typography variant='h6'>No signal</Typography>
              <Image src={timeoutImage} alt='Timeout' width={400} />
            </ContainerProgress>
          ) : (
            fixturesGroups &&
            fixturesGroups.map((fixtures, groupIndex) => (
              <>
                {fixtures.length > 0 ? (
                  <LeagueFixture
                    key={groupIndex}
                    leagueName={fixtures[0].league.name || ''}
                  >
                    {fixtures.map(
                      (fixture: FixtureTypeResponse, fixtureIndex: number) => (
                        <Fixture key={fixtureIndex} data={fixture} />
                      ),
                    )}
                  </LeagueFixture>
                ) : (
                  ''
                )}
              </>
            ))
          )}
        </ContainerFixture>
      </Container>
    </FootballLayout>
  )
}
