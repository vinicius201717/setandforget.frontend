import {
  CircularProgress,
  Container,
  IconButton,
  Typography,
} from '@mui/material'
import {
  ContainerFixture,
  ContainerProgress,
  ModalContent,
  ModalProdiction,
} from './style'
import FootballLayout from 'src/layouts/components/footballLayout'
import { useState, useEffect, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getFixture } from 'src/pages/api/football/fixture/getFixture'
import {
  FixtureTypeResponse,
  PredictionsResponse,
} from 'src/types/apps/footballType'
import Image from 'next/image'
import CloseIcon from '@mui/icons-material/Close'
import timeoutImage from 'public/images/pages/misc-under-maintenance.png'
import LeagueFixture from 'src/components/football/footballFixture/LeagueFixture'
import Fixture from 'src/components/football/footballFixture/Fixture'
import PredictionsComponent from 'src/components/football/footballPrediction'
import { getFixturePredictions } from 'src/pages/api/football/fixture/getFixturePredictions'
import toast from 'react-hot-toast'

export default function Football() {
  const [isTimeout, setIsTimeout] = useState(false)
  const [fixtureId, setFixtureId] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
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

  const {
    data: fixturePredictions,
    error: fpError,
    isLoading: fpIsLoading,
    refetch: refetchFixturePredictions,
  } = useQuery<PredictionsResponse[]>({
    queryKey: ['fixturePredictions', fixtureId],
    queryFn: () => getFixturePredictions(fixtureId as number),
    enabled: false,
  })

  const handleFetchPredictions = (id: number) => {
    setFixtureId(id)
    setIsModalOpen(true)
  }

  useEffect(() => {
    if (fixtureId) {
      refetchFixturePredictions()
    }
  }, [fixtureId, refetchFixturePredictions])

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setIsTimeout(true)
    }, 10000)

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (fpError || isError) {
      toast.error('Internal error', { position: 'bottom-right' })
    }
  }, [fpError, isError])

  useEffect(() => {
    if (!isLoading && fixturesGroups && fixturesGroups.flat().length > 0) {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        setIsTimeout(false)
      }
    }
  }, [isLoading, fixturesGroups])

  const sortFixturesByDate = (fixtures: FixtureTypeResponse[]) => {
    return fixtures.sort((a, b) => {
      const dateA = new Date(a.fixture.date).getTime()
      const dateB = new Date(b.fixture.date).getTime()
      return dateA - dateB
    })
  }

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
              <LeagueFixture
                key={groupIndex}
                leagueName={fixtures[0].league.name || ''}
              >
                {sortFixturesByDate(fixtures).map(
                  (fixture: FixtureTypeResponse, fixtureIndex: number) => (
                    <Fixture
                      handlePrediction={handleFetchPredictions}
                      key={fixtureIndex}
                      data={fixture}
                      prediction={false}
                    />
                  ),
                )}
              </LeagueFixture>
            ))
          )}
        </ContainerFixture>
      </Container>
      <ModalProdiction
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby='modal-title'
        aria-describedby='modal-description'
      >
        <ModalContent>
          <IconButton
            onClick={() => setIsModalOpen(false)}
            sx={{ position: 'absolute', top: 16, right: 16, zIndex: 1300 }}
          >
            <CloseIcon />
          </IconButton>
          {fpIsLoading ? (
            <ContainerProgress>
              <CircularProgress />
            </ContainerProgress>
          ) : fixturePredictions && fixturePredictions.length > 0 ? (
            <PredictionsComponent data={fixturePredictions[0]} />
          ) : null}
        </ModalContent>
      </ModalProdiction>
    </FootballLayout>
  )
}
