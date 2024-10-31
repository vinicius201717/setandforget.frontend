import {
  CircularProgress,
  Container,
  IconButton,
  Typography,
} from '@mui/material'
import FootballLayout from 'src/layouts/components/footballLayout'
import { useState, useEffect, useRef } from 'react'
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
import { MatchData } from 'src/types/apps/footballType/oddsLiveType'
import { PredictionsResponse } from 'src/types/apps/footballType'
import { useQuery } from '@tanstack/react-query'
import {
  connectOddsSocket,
  disconnectOddsSocket,
} from 'src/pages/api/odds-live/odds-live-websocket'

export default function Football() {
  const [isTimeout, setIsTimeout] = useState(false)
  const [fixtureId, setFixtureId] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [fixtureLive, setFixtureLive] = useState<MatchData[][] | null>(null)
  const [isError, setIsError] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

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

  // Conectar ao WebSocket para receber odds ao vivo
  useEffect(() => {
    connectOddsSocket(
      (data) => {
        setFixtureLive(data)
        setIsTimeout(false)
        setIsError(false)
      },
      () => console.log('WebSocket connected'),
      () => console.log('WebSocket disconnected'),
    )

    return () => {
      disconnectOddsSocket()
    }
  }, [])

  // Atualiza o componente de previsões quando o ID do fixture muda
  useEffect(() => {
    if (fixtureId) {
      refetchFixturePredictions()
    }
  }, [fixtureId, refetchFixturePredictions])

  // Define um timeout caso não cheguem dados via WebSocket
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
    console.log(fixtureLive)
  }, [fixtureLive])

  return (
    <FootballLayout type='live'>
      <h1>Football Live Odds</h1>
      <Container>
        <ContainerFixture>
          {!fixtureLive && isTimeout ? (
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
