import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  Alert,
  CircularProgress,
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
import { BetTeamContainer, ContainerProgress } from '../style'
import { useCart } from 'src/context/CartOddsContext'

interface OddsBetInterface {
  oddsBet: OddsBetType[]
  favorites: Bets[]
  fixture: FixtureTypeResponse[]
  favoriteOddsBet: UserFavoriteOddsBetType[]
  identifyFavorite: OddsBetType
}

export default function LeaguePage() {
  const router = useRouter()
  const { fixtureId } = router.query

  const [selectedBetId, setSelectedBetId] = useState<number | null>(null)
  const [oddsBet, setOddsBet] = useState<OddsBetType[] | null>(null)
  const [fixture, setFixture] = useState<fixtureType | null>(null)
  const [identifyFavorite, setIdentifyFavorite] = useState<OddsBetType | null>(
    null,
  )
  const [favoritOddsBet, setFavoritOddsBet] = useState<
    UserFavoriteOddsBetType[] | null
  >(null)
  const [favorites, setFavorites] = useState<Bets | null>(null)

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
        setFavorites(data.favorites[0])
      }
    }
  }, [data])

  const { addItem } = useCart()

  const produto = {
    id: '1',
    name: 'Produto Exemplo',
    price: 100.0,
    quantity: 1,
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
                        <BetTeamContainer onClick={() => addItem(produto)}>
                          <Typography variant='body2'>{value.value}</Typography>
                          <Typography variant='body2' color='primary'>
                            {value.odd}
                          </Typography>
                        </BetTeamContainer>
                      </TableCell>
                      <TableCell align='right'></TableCell>
                    </TableRow>
                  ))}
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
