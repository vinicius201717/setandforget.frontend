import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import TravelExploreIcon from '@mui/icons-material/TravelExplore'
import TuneIcon from '@mui/icons-material/Tune'
import CurrencyExchangeSharpIcon from '@mui/icons-material/CurrencyExchangeSharp'
import {
  Button,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material'
import { z } from 'zod'
import CustomRadio from 'src/components/customRadio'

import {
  Container,
  ContainerRadio,
  FormContainer,
  ContainerChildren,
  ContainerGlobalPlayers,
  OptionButtonChange,
  ButtonIcon,
  HeaderGlobalOptions,
} from './style'

import { GlobalPlayerProfile } from 'src/components/chess/components/GlobalPlayerProfile'
import ConfirmModal from 'src/components/Modal'
import FilterGlobalPlayers from 'src/components/chess/components/ModalFilterGlobalPlayers'
import { times } from './data/times'
import { ChallengeGlobalType, GameType } from 'src/types/apps/chessTypes'
import toast from 'react-hot-toast'
import { CancelableToastContent } from 'src/components/chess/PersistentToast'
import { chessChallengeCreate } from '../api/chess/chessChallengeCreate'
import { chessChallengeGet } from '../api/chess/chessChallengeGet'
import { chessChallengeGetAll } from '../api/chess/chessChallengeGetAll'
import { useAuth } from 'src/hooks/useAuth'
import { connectSocket } from '../api/chess-room/chess-challenge-websocket'

const registerFormSchema = z.object({
  duration: z.number(),
  amount: z.number(),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

function HomePage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalInfo, setModalInfo] = useState<GameType>()
  const [modalFilterGlobalOpen, setModalFilterGlobalOpen] = useState(false)
  const [globalChallenge, setGlobalChallenge] = useState<
    ChallengeGlobalType[] | null
  >([])

  const { toastId, setToastId } = useAuth()
  const handleOpenModal = (id: string) => {
    if (!globalChallenge) return

    const game = globalChallenge.find((game) => game.id === id)
    if (!game) return
    setModalInfo({
      user: {
        id: game.user.id,
        name: game.user.name,
        avatar: game.user.avatar,
      },
      challengeId: id,
      roomId: game.Room.id,
      amount: game.amount,
      duration: game.duration,
    })

    setModalOpen(true)
  }

  const handleCloseModal = () => setModalOpen(false)

  const handleOpenModalFilterGlobal = () => setModalFilterGlobalOpen(true)
  const handleCloseModalFilterGlobal = () => setModalFilterGlobalOpen(false)

  const [screen, setScreen] = useState<1 | 2>(1)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      duration: 60,
      amount: 10,
    },
  })

  const onSubmitPlay = (data: RegisterFormData) => {
    chessChallengeCreate(data)
      .then((response: any) => {
        const roomId = response.room.id
        const challengeId = response.challenge.id
        const userId = response.challenge.userId

        connectSocket(roomId, userId, userId, null)
        window.localStorage.setItem('chess-room-id', roomId)
        window.localStorage.setItem('chess-challenge-id', challengeId)

        setToastId(
          toast.loading(<CancelableToastContent toastId={toastId} />, {
            position: 'bottom-right',
            duration: Infinity,
            id: 'chess-loading-toast',
          }),
        )
      })
      .catch(() => {
        toast.error('Failed to create the challenge: ', {
          position: 'bottom-right',
        })
      })
  }

  const handleChange = (newScreen: 1 | 2) => {
    if (screen !== newScreen) {
      setScreen(newScreen)
    }
  }

  useEffect(() => {
    chessChallengeGetAll().then((response: ChallengeGlobalType[] | null) => {
      setGlobalChallenge(response)
    })
    const challengeId = window.localStorage.getItem('chess-challenge-id')
    if (challengeId) {
      chessChallengeGet(challengeId).then(() => {
        if (toastId === null) {
          setToastId(
            toast.loading(<CancelableToastContent toastId={toastId} />, {
              position: 'bottom-right',
              duration: Infinity,
              id: 'chess-loading-toast',
            }),
          )
        }
      })
    }
  }, [])

  return (
    <Container>
      <ContainerChildren isActive={screen === 1}>
        <FormContainer component={'form'} onSubmit={handleSubmit(onSubmitPlay)}>
          <Typography variant='h6'>Duration</Typography>
          <ContainerRadio>
            <Controller
              name='duration'
              control={control}
              render={({ field }) => (
                <>
                  {times.map((duration, index) => (
                    <CustomRadio
                      key={index}
                      value={duration.value}
                      label={duration.label}
                      checked={field.value === duration.value}
                      onChange={() => field.onChange(duration.value)}
                    />
                  ))}
                </>
              )}
            />
          </ContainerRadio>
          <Typography variant='h6'>Amount</Typography>
          <FormControl fullWidth sx={{ m: 1 }} error={!!errors.amount}>
            <InputLabel htmlFor='outlined-adornment-amount'>Amount</InputLabel>
            <Controller
              name='amount'
              control={control}
              rules={{ required: 'Amount is required' }}
              render={({
                field: { ref, onChange, ...restField },
                fieldState: { error },
              }) => (
                <OutlinedInput
                  {...restField}
                  type='number'
                  inputRef={ref}
                  id='outlined-adornment-amount'
                  startAdornment={
                    <InputAdornment position='start'>$</InputAdornment>
                  }
                  label='Amount'
                  required
                  error={!!error}
                  autoComplete='off'
                  onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
                  sx={{
                    '& input[type="number"]::-webkit-inner-spin-button, & input[type="number"]::-webkit-outer-spin-button':
                      {
                        '-webkit-appearance': 'none',
                        margin: 0,
                      },
                    '& input[type="number"]': {
                      '-moz-appearance': 'textfield',
                    },
                  }}
                />
              )}
            />

            {errors.amount && (
              <FormHelperText>{errors.amount.message}</FormHelperText>
            )}
          </FormControl>

          <Button
            type='submit'
            variant='contained'
            style={{ marginTop: '10px', marginLeft: '3px', width: '100%' }}
          >
            Jogar
          </Button>
        </FormContainer>
      </ContainerChildren>
      {globalChallenge && globalChallenge.length > 0 ? (
        <ContainerChildren isActive={screen === 2}>
          <HeaderGlobalOptions>
            <Typography variant='h6'>Players</Typography>
            <TuneIcon
              onClick={() => handleOpenModalFilterGlobal()}
              style={{ cursor: 'pointer' }}
            />
          </HeaderGlobalOptions>

          <ContainerGlobalPlayers>
            {globalChallenge
              ? globalChallenge.map((challenge, key) => {
                  return (
                    <div
                      key={key}
                      onClick={() => handleOpenModal(challenge.id)}
                    >
                      <GlobalPlayerProfile
                        name={challenge.user.name}
                        duration={challenge.duration}
                        amount={challenge.amount}
                        avatar={challenge.user.avatar}
                      />
                    </div>
                  )
                })
              : ''}
          </ContainerGlobalPlayers>
        </ContainerChildren>
      ) : (
        ''
      )}
      <OptionButtonChange>
        <ButtonIcon onClick={() => handleChange(1)} isActive={screen === 1}>
          <CurrencyExchangeSharpIcon sx={{ color: '#FFF' }} />
        </ButtonIcon>

        <ButtonIcon onClick={() => handleChange(2)} isActive={screen === 2}>
          <TravelExploreIcon sx={{ color: '#FFF' }} />
        </ButtonIcon>
      </OptionButtonChange>
      {modalInfo ? (
        <ConfirmModal
          open={modalOpen}
          challengeId={modalInfo.challengeId}
          roomId={modalInfo.roomId}
          handleClose={handleCloseModal}
          user={modalInfo.user}
          avatar={modalInfo.user.avatar}
          amount={modalInfo.amount}
          duration={modalInfo.duration}
        />
      ) : (
        ''
      )}
      <FilterGlobalPlayers
        open={modalFilterGlobalOpen}
        handleClose={handleCloseModalFilterGlobal}
        title='Filter Players'
      >
        <p>Teste pra ver se ta funcionando</p>
      </FilterGlobalPlayers>
    </Container>
  )
}

export default HomePage
