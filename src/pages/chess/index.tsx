/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import TravelExploreIcon from '@mui/icons-material/TravelExplore'
import TuneIcon from '@mui/icons-material/Tune'
import CurrencyExchangeSharpIcon from '@mui/icons-material/CurrencyExchangeSharp'
import {
  Box,
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
  LinkHistory,
} from './style'

import { GlobalPlayerProfile } from 'src/components/chess/components/GlobalPlayerProfile'
import ConfirmModal from 'src/components/chess/Modal'
import FilterGlobalPlayers from 'src/components/chess/components/ModalFilterGlobalPlayers'
import { times } from './data/times'
import {
  Challenge,
  ChallengeGlobalType,
  CreateChallengeReturn,
  GameType,
} from 'src/types/apps/chessTypes'
import toast from 'react-hot-toast'
import { CancelableToastContent } from 'src/components/chess/PersistentToast'
import { chessChallengeCreate } from '../api/chess-challenge/chessChallengeCreate'
import { chessChallengeGet } from '../api/chess-challenge/chessChallengeGet'
import { chessChallengeGetAll } from '../api/chess-challenge/chessChallengeGetAll'
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

  const { user, toastId, setToastId, setUser } = useAuth()
  console.log(user)

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

  const updateAccountAmount = (amount: number, action: string) => {
    if (user && user.Account) {
      let newAmount: number
      switch (action) {
        case 'subtraction':
          newAmount = (user.Account.amount / 100 - amount) * 100
          break

        case 'plus':
          newAmount = user.Account.amount
          break
        default:
          newAmount = user.Account.amount
          break
      }

      const updatedUser = {
        ...user,
        Account: {
          ...user.Account,
          amount: newAmount,
        },
      }
      setUser(updatedUser)
    }
  }
  const onSubmitPlay = (data: RegisterFormData) => {
    if (user?.Account.amount && user.Account.amount / 100 >= data.amount) {
      chessChallengeCreate(data)
        .then((response: CreateChallengeReturn) => {
          if (response.checkEqual) {
            const roomId = response.room.id

            const creatorId = response.challenge.userId
            const challengeId = response.challenge.id
            const amount = JSON.stringify(data.amount)
            window.localStorage.setItem('chess-room-id', roomId)

            connectSocket(
              challengeId,
              roomId,
              creatorId,
              user?.id,
              amount,
              null,
              null,
              null,
              null,
              null,
            )
          } else {
            updateAccountAmount(data.amount, 'subtraction')
            const roomId = response.room.id
            const challengeId = response.challenge.id
            const userId = response.challenge.userId
            const amount = JSON.stringify(data.amount)

            connectSocket(
              challengeId,
              roomId,
              userId,
              userId,
              amount,
              null,
              null,
              null,
              null,
              null,
            )
            window.localStorage.setItem('chess-room-id', roomId)
            window.localStorage.setItem('chess-challenge-id', challengeId)
          }

          setToastId(
            toast.loading(
              <CancelableToastContent
                toastId={toastId}
                amount={data.amount}
                updateAccountAmount={updateAccountAmount}
              />,
              {
                position: 'bottom-right',
                duration: Infinity,
                id: 'chess-loading-toast',
              },
            ),
          )
        })
        .catch(() => {
          toast.error('Failed to create the challenge: ', {
            position: 'bottom-right',
          })
        })
    } else {
      toast.error('Insufficient funds.', {
        position: 'bottom-right',
      })
    }
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
      chessChallengeGet(challengeId).then((response: Challenge) => {
        if (toastId === null && response) {
          setToastId(
            toast.loading(
              <CancelableToastContent
                toastId={toastId}
                amount={response.amount}
                updateAccountAmount={updateAccountAmount}
              />,
              {
                position: 'bottom-right',
                duration: Infinity,
                id: 'chess-loading-toast',
              },
            ),
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
            style={{
              marginTop: '10px',
              marginLeft: '3px',
              marginBottom: '20px',
              width: '100%',
            }}
          >
            Jogar
          </Button>
          <LinkHistory href={'chess/history'}>History game</LinkHistory>
        </FormContainer>
      </ContainerChildren>
      {globalChallenge && globalChallenge?.length > 0 && (
        <ContainerChildren isActive={screen === 2}>
          <HeaderGlobalOptions sx={{ mb: 2 }}>
            <Typography variant='h6' fontWeight={700}>
              Active Challenges
            </Typography>
            <TuneIcon
              onClick={handleOpenModalFilterGlobal}
              sx={{ cursor: 'pointer', color: 'text.secondary' }}
            />
          </HeaderGlobalOptions>

          <ContainerGlobalPlayers>
            {globalChallenge.map((challenge) => {
              const { id, duration, amount, user } = challenge
              return (
                <Box
                  key={id}
                  onClick={() => handleOpenModal(id)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: 2,
                    p: 2,
                    mb: 1.5,
                    transition: 'all 0.2s ease-in-out',
                    cursor: 'pointer',
                    '&:hover': {
                      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.06)',
                      backgroundColor: '#f9fafb',
                    },
                  }}
                >
                  <GlobalPlayerProfile
                    name={user.name}
                    duration={duration}
                    amount={amount}
                    avatar={user.avatar}
                  />
                </Box>
              )
            })}
          </ContainerGlobalPlayers>
        </ContainerChildren>
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
          amount={JSON.stringify(modalInfo.amount)}
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
