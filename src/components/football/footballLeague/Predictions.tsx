import React, { useState, useEffect, useRef } from 'react'
import { CircularProgress, Typography, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import {
  ContainerFixture,
  ContainerProgress,
  ModalContent,
  ModalProdiction,
} from './style'
import { useQuery } from '@tanstack/react-query'
import {
  FixtureTypeResponse,
  PredictionsResponse,
} from 'src/types/apps/footballType'
import Image from 'next/image'

import timeoutImage from 'public/images/pages/misc-under-maintenance.png'
import Fixture from 'src/components/football/footballFixture/Fixture'
import { getLeagueFixture } from 'src/pages/api/football/league/getLeagueFixture'
import { useRouter } from 'next/router'
import LeagueFixture from '../footballFixture/LeagueFixture'
import { getFixturePredictions } from 'src/pages/api/football/fixture/getFixturePredictions'
import PredictionsComponent from '../footballPrediction'

export default function LeagueFixtureComponent() {
  const [isTimeout, setIsTimeout] = useState<boolean>(false)
  const [fixtureId, setFixtureId] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const router = useRouter()
  const { leagueId, season } = router.query

  const leagueIdNumber = leagueId ? parseInt(leagueId as string, 10) : undefined
  const seasonNumber = season ? parseInt(season as string, 10) : undefined

  const { data, error, isLoading } = useQuery<FixtureTypeResponse[]>({
    queryKey: ['leagueFixtures', leagueIdNumber, seasonNumber],
    queryFn: () =>
      getLeagueFixture(leagueIdNumber as number, seasonNumber as number),
    enabled: !!leagueIdNumber && !!seasonNumber,
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
    if (!isLoading && timerRef.current) {
      clearTimeout(timerRef.current)
      setIsTimeout(false)
    }
  }, [isLoading])

  const sortFixturesByDate = (fixtures: FixtureTypeResponse[]) => {
    return fixtures.sort((a, b) => {
      const dateA = new Date(a.fixture.date).getTime()
      const dateB = new Date(b.fixture.date).getTime()
      return dateA - dateB
    })
  }

  return (
    <ContainerFixture>
      {isLoading ? (
        <ContainerProgress>
          <CircularProgress />
        </ContainerProgress>
      ) : isTimeout || error || !Array.isArray(data) ? (
        <ContainerProgress>
          <Typography variant='h6'>No signal</Typography>
          <Image src={timeoutImage} alt='Timeout' width={400} />
        </ContainerProgress>
      ) : (
        <LeagueFixture>
          {sortFixturesByDate(data).map((fixture, index) => (
            <Fixture
              key={index}
              data={fixture}
              prediction={true}
              handlePrediction={handleFetchPredictions}
            />
          ))}
        </LeagueFixture>
      )}
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

          {/* Conteúdo do modal */}
          {fpIsLoading ? (
            <ContainerProgress>
              <CircularProgress />
            </ContainerProgress>
          ) : fpError ? (
            <Typography variant='h6' color='error'>
              Error loading predictions: {fpError.message}
            </Typography>
          ) : fixturePredictions && fixturePredictions.length > 0 ? (
            <PredictionsComponent data={fixturePredictions[0]} />
          ) : (
            <Typography variant='h6'>No data available</Typography>
          )}
        </ModalContent>
      </ModalProdiction>
    </ContainerFixture>
  )
}
