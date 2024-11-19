import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  Alert,
  CircularProgress,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import FootballLayout from 'src/layouts/components/footballLayout'
import { useQuery } from '@tanstack/react-query'
import {
  Bets,
  BetsValues,
  OddsBetType,
  UserFavoriteOddsBetType,
} from 'src/types/apps/footballType/oddsType'
import FootballBetHorizontalMenu from 'src/components/menu/FootballBetHorizontalMenu'
import { getOddsBet } from 'src/pages/api/football/odds/getOddsBet'
import {
  fixtureType,
  FixtureTypeResponse,
} from 'src/types/apps/footballType/fixtureType'
import { getOddsBetFixture } from 'src/pages/api/football/odds/getOddsBetFixture'
import {
  BetTeamContainer,
  BoxContainer,
  ButtonCard,
  ContainerProgress,
  FormControlStyle,
} from '../style'
import { useCart } from 'src/context/CartOddsContext'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
interface OddsBetInterface {
  oddsBet: OddsBetType[]
  favorites: Bets[]
  fixture: FixtureTypeResponse[]
  favoriteOddsBet: UserFavoriteOddsBetType[]
  identifyFavorite: OddsBetType
}

interface SelectedOddType {
  odd: string
  name: string
}

const schema = z.object({
  amount: z
    .number()
    .min(1, 'Amount is required')
    .positive('Amount must be positive'),
})

type FormValues = {
  amount: number
}

export default function FixtureOddPage() {
  const router = useRouter()
  const { fixtureId } = router.query

  const [selectedBetId, setSelectedBetId] = useState<number | null>(null)
  const [selectedBetName, setSelectedBetName] = useState<string | null>(null)
  const [oddsBet, setOddsBet] = useState<OddsBetType[] | null>(null)
  const [fixture, setFixture] = useState<fixtureType | null>(null)
  const [identifyFavorite, setIdentifyFavorite] = useState<OddsBetType | null>(
    null,
  )
  const [favoritOddsBet, setFavoritOddsBet] = useState<
    UserFavoriteOddsBetType[] | null
  >(null)
  const [favorites, setFavorites] = useState<Bets | null>(null)

  const [selectedOdd, setSelectedOdd] = useState<SelectedOddType | null>(null)

  const { data, isLoading: isOddsLoading } = useQuery<OddsBetInterface>({
    queryKey: ['oddsBet', fixtureId],
    queryFn: ({ queryKey }) => {
      const [, fixtureId] = queryKey
      return getOddsBet(fixtureId as number)
    },
    enabled: !!fixtureId,
  })

  const {
    data: betData,
    isLoading: isBetLoading,
    refetch,
  } = useQuery<any>({
    queryKey: ['betData', fixtureId, selectedBetId],
    queryFn: ({ queryKey }) => {
      const [, fixtureId, betId] = queryKey

      if (!betId || typeof betId !== 'number') {
        throw new Error('betId is invalid or undefined')
      }

      return getOddsBetFixture(betId as number, fixtureId as number)
    },
    enabled: !!fixtureId && !!selectedBetId,
  })

  const handleGetBet = (betId: number) => {
    setSelectedBetId(betId)
  }

  useEffect(() => {
    console.log(betData)
  }, [betData])

  const handleFavoritOddsBet = (
    betFavorite: UserFavoriteOddsBetType,
    rm: boolean,
  ) => {
    setFavoritOddsBet((prevFavorites) => {
      if (!prevFavorites) return rm ? [betFavorite] : []

      const isAlreadyFavorite = prevFavorites.some(
        (favorite) => favorite.betId === betFavorite.betId,
      )

      if (rm) {
        if (!isAlreadyFavorite) {
          return [...prevFavorites, betFavorite]
        }
      } else {
        if (isAlreadyFavorite) {
          return prevFavorites.filter(
            (favorite) => favorite.betId !== betFavorite.betId,
          )
        }
      }

      return prevFavorites
    })
  }

  const handleOddSelect = ({ name, odd }: SelectedOddType) => {
    setSelectedOdd((prev) => (prev && prev.odd === odd ? null : { name, odd }))
  }

  useEffect(() => {
    if (selectedBetId) {
      refetch()
    }
  }, [selectedBetId])

  useEffect(() => {
    if (betData && betData.length > 0) {
      setFavorites(betData[0].bookmakers[0].bets[0])
    } else {
      setFavorites(null)
    }
  }, [betData])

  useEffect(() => {
    if (data) {
      setOddsBet(data.oddsBet)
      setFixture(data.fixture[0].teams)
      setIdentifyFavorite(data.identifyFavorite)
      setFavoritOddsBet(data.favoriteOddsBet)
      if (data.favorites && data.favorites.length > 0) {
        setSelectedBetId(data.identifyFavorite.id)
        setSelectedBetName(data.identifyFavorite.name)
        setFavorites(data.favorites[0])
      }
    }
  }, [data])

  const { addItem } = useCart()

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const onSubmit = (data: FormValues) => {
    if (selectedOdd) {
      const fixtureId = Array.isArray(router.query.fixtureId)
        ? parseInt(router.query.fixtureId[0], 10)
        : parseInt(router.query.fixtureId as string, 10)

      addItem({
        fixtureId,
        oddId: selectedBetId as number,
        name: selectedOdd.name,
        fixture,
        bet: selectedBetName as string,
        odd: parseFloat(selectedOdd.odd),
        price: data.amount,
        quantity: 1,
      })
    }
  }

  return (
    <FootballLayout type='odds'>
      {isOddsLoading ? (
        <ContainerProgress>
          <CircularProgress />
        </ContainerProgress>
      ) : (
        <>
          <FootballBetHorizontalMenu
            oddsBet={oddsBet}
            fixture={fixture}
            favoriteOddsBet={favoritOddsBet}
            favorites={favorites}
            identifyFavorite={identifyFavorite}
            handleGetBet={handleGetBet}
            handleFavoritOddsBet={handleFavoritOddsBet}
          />
          {isBetLoading ? (
            <ContainerProgress>
              <CircularProgress />
            </ContainerProgress>
          ) : favorites && favorites.values && favorites.values.length > 0 ? (
            <TableContainer
              component={Paper}
              style={{ marginBottom: '20px', padding: '2px' }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align='center' colSpan={2}>
                      <Typography
                        variant='body2'
                        align='left'
                        style={{ paddingTop: '10px' }}
                      >
                        {favorites.name}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {favorites.values.map((value: BetsValues, index: number) => (
                    <TableRow key={index}>
                      <TableCell align='left'>
                        <BetTeamContainer
                          selected={
                            selectedOdd !== null &&
                            selectedOdd.odd === value.odd
                          }
                          onClick={() =>
                            handleOddSelect({
                              name: value.value,
                              odd: value.odd,
                            })
                          }
                        >
                          <Typography variant='body2'>{value.value}</Typography>
                          <Typography variant='body2' color='primary'>
                            {value.odd}
                          </Typography>
                        </BetTeamContainer>
                      </TableCell>
                      <TableCell align='right'></TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell align='left'>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControlStyle variant='outlined'>
                          <BoxContainer>
                            <InputLabel htmlFor='outlined-adornment-amount'>
                              Amount
                            </InputLabel>
                            <Controller
                              name='amount'
                              control={control}
                              render={({ field }) => (
                                <OutlinedInput
                                  {...field}
                                  id='outlined-adornment-amount'
                                  startAdornment={
                                    <InputAdornment position='start'>
                                      $
                                    </InputAdornment>
                                  }
                                  label='Amount'
                                  fullWidth
                                  error={!!errors.amount}
                                  onChange={(e) =>
                                    field.onChange(Number(e.target.value) || 0)
                                  }
                                />
                              )}
                            />

                            {errors.amount && (
                              <Typography variant='body2' color='error'>
                                {errors.amount.message}
                              </Typography>
                            )}
                          </BoxContainer>
                          <ButtonCard
                            variant='contained'
                            color='primary'
                            type='submit'
                            disabled={!selectedOdd || !isValid}
                          >
                            Bet
                          </ButtonCard>
                        </FormControlStyle>
                      </form>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Alert severity='error' sx={{ mt: '10px' }}>
              No pre-match bets available for {identifyFavorite?.name} —{' '}
              <strong>please try again later!</strong>
            </Alert>
          )}
        </>
      )}
    </FootballLayout>
  )
}
