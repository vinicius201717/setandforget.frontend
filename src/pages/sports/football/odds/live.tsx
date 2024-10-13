import {
  CircularProgress,
  Container,
  IconButton,
  Typography,
} from '@mui/material'

import FootballLayout from 'src/layouts/components/footballLayout'
import { useState, useEffect, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import CloseIcon from '@mui/icons-material/Close'
import timeoutImage from 'public/images/pages/misc-under-maintenance.png'
import PredictionsComponent from 'src/components/football/footballPrediction'
import { getFixturePredictions } from 'src/pages/api/football/fixture/getFixturePredictions'
import toast from 'react-hot-toast'
import {
  ContainerFixture,
  ContainerProgress,
  ModalContent,
  ModalProdiction,
} from '../style'
import { getOddsBetLive } from 'src/pages/api/football/odds/getOddsLive'
import { MatchData } from 'src/types/apps/footballType/oddsLiveType'
import { PredictionsResponse } from 'src/types/apps/footballType'
import { useWebSocket } from 'src/pages/api/football/odds/oddsLive.websocket'

export default function Football() {
  const [isTimeout, setIsTimeout] = useState(false)
  const [fixtureId, setFixtureId] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const { message, sendMessage } = useWebSocket({
    url: 'http://localhost:3000',
  })

  const {
    data: fixtureLive,
    isLoading,
    isError,
  } = useQuery<MatchData[][]>({
    queryKey: ['oddsBetLive'],
    queryFn: getOddsBetLive,
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

  // const handleFetchPredictions = (id: number) => {
  //   setFixtureId(id)
  //   setIsModalOpen(true)
  // }

  useEffect(() => {
    if (fixtureId) {
      refetchFixturePredictions()
    }
  }, [fixtureId, refetchFixturePredictions])

  useEffect(() => {
    console.log(message)
  }, [message])

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

  return (
    <FootballLayout type='live'>
      <h1>Football Live Odds</h1>
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
          ) : fixtureLive && fixtureLive.length > 0 ? (
            fixtureLive.map((fixtures, groupIndex) => (
              <pre key={groupIndex}>{JSON.stringify(fixtures)}</pre>
              // <div key={groupIndex}>
              //   {fixtures.map((fixture: MatchData, fixtureIndex: number) => (
              //     <Fixture
              //       handlePrediction={handleFetchPredictions}
              //       key={fixtureIndex}
              //       data={fixture}
              //       prediction={false}
              //     />
              //   ))}
              // </div>
            ))
          ) : (
            <Typography variant='body2'>No live odds available</Typography>
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
          ) : (
            <Typography variant='body2'>No predictions available</Typography>
          )}
        </ModalContent>
      </ModalProdiction>
    </FootballLayout>
  )
}
