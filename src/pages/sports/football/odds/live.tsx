/* eslint-disable no-unused-vars */
import {
  Box,
  CircularProgress,
  Container,
  IconButton,
  Modal,
  Typography,
} from '@mui/material'
import FootballLayout from 'src/layouts/components/footballLayout'
import React, { useState, useEffect, useRef } from 'react'
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
import FixtureLive from 'src/components/football/footballFixture/FixtureLive'
import { ContainerFixtureLive } from './style'

export default function Football() {
  const [isTimeout, setIsTimeout] = useState(false)
  const [fixtureId, setFixtureId] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [fixtureLive, setFixtureLive] = useState<MatchData[]>([])
  const [isLoading, setIsLoading] = useState(true)
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

  const handleFetchPredictions = (id: number) => {
    setFixtureId(id)
    setIsModalOpen(true)
  }

  useEffect(() => {
    connectOddsSocket(
      (data: MatchData[]) => {
        setFixtureLive(data || [])
        setIsTimeout(false)
        setIsError(false)
        setIsLoading(false)
      },
      () => console.log('WebSocket connected'),
      () => console.log('WebSocket disconnected'),
    )

    return () => {
      disconnectOddsSocket()
    }
  }, [])

  useEffect(() => {
    if (fixtureId) {
      refetchFixturePredictions()
    }
  }, [fixtureId, refetchFixturePredictions])

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    timerRef.current = setTimeout(() => {
      setIsTimeout(true)
      setIsLoading(false)
    }, 10000)

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [fixtureLive])

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
          ) : fixtureLive.length === 0 ? (
            <ContainerProgress>
              <Typography variant='h6'>No signal</Typography>
              <Image src={timeoutImage} alt='Timeout' width={400} />
            </ContainerProgress>
          ) : (
            <ContainerFixtureLive>
              {fixtureLive.map((fixture, groupIndex) => (
                <React.Fragment key={groupIndex}>
                  <FixtureLive
                    handlePrediction={handleFetchPredictions}
                    data={fixture}
                    prediction={false}
                  />
                </React.Fragment>
              ))}
            </ContainerFixtureLive>
          )}
        </ContainerFixture>
      </Container>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby='modal-title'
        aria-describedby='modal-description'
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
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
        </Box>
      </Modal>
    </FootballLayout>
  )
}
