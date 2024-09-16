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
import { BetTeamContainer, ContainerProgress, TeamLogo } from '../style'

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

  useEffect(() => {
    if (selectedBetId) {
      refetch()
    }
  }, [selectedBetId])

  useEffect(() => {
    if (betData && betData.length > 0) {
      setFavorites(betData[0].bookmakers[0].bets[0])
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

  return (
    <FootballLayout>
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
          />
          {isBetLoading ? (
            <ContainerProgress>
              <CircularProgress />
            </ContainerProgress>
          ) : favorites && favorites.values ? (
            <TableContainer
              component={Paper}
              style={{ marginBottom: '20px', padding: '2px' }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    {favorites && favorites.values && fixture ? (
                      <TableCell
                        align='center'
                        colSpan={favorites.values.length}
                      >
                        <Typography
                          variant='body2'
                          align='left'
                          style={{ paddingTop: '10px' }}
                        >
                          {favorites.name}
                        </Typography>
                      </TableCell>
                    ) : (
                      <TableCell align='center'>
                        <Alert severity='error' sx={{ mt: '10px' }}>
                          No pre-match bets available for{' '}
                          {identifyFavorite?.name} —{' '}
                          <strong>please try again later!</strong>
                        </Alert>
                      </TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {favorites && favorites.values && fixture ? (
                    <TableRow>
                      {favorites.values.map(
                        (value: BetsValues, index: number) => (
                          <TableCell
                            key={index}
                            align='right'
                            sx={{
                              maxWidth: '500px',
                              width: 'auto',
                              whiteSpace: 'normal',
                              wordWrap: 'break-word',
                            }}
                          >
                            {value.value === 'Home' ? (
                              <BetTeamContainer>
                                <TeamLogo
                                  src={fixture?.home?.logo}
                                  alt={fixture?.home?.name}
                                  width={20}
                                  height={20}
                                  style={{ marginRight: '10px' }}
                                />
                                <Typography variant='body2'>
                                  {fixture?.home?.name} / home
                                </Typography>
                                <Typography variant='body2' color='primary'>
                                  {value.odd}
                                </Typography>
                              </BetTeamContainer>
                            ) : value.value === 'Away' ? (
                              <BetTeamContainer>
                                <TeamLogo
                                  src={fixture?.away?.logo}
                                  alt={fixture?.away?.name}
                                  width={20}
                                  height={20}
                                  style={{ marginRight: '10px' }}
                                />
                                <Typography variant='body2'>
                                  {fixture?.away?.name}
                                </Typography>
                                <Typography variant='body2' color='primary'>
                                  {value.odd}
                                </Typography>
                              </BetTeamContainer>
                            ) : null}
                          </TableCell>
                        ),
                      )}
                    </TableRow>
                  ) : (
                    <TableRow>
                      <TableCell
                        align='center'
                        colSpan={favorites ? favorites.values.length : 1}
                      >
                        <Alert severity='error' sx={{ mt: '10px' }}>
                          No pre-match bets available for{' '}
                          {identifyFavorite?.name} —{' '}
                          <strong>please try again later!</strong>
                        </Alert>
                      </TableCell>
                    </TableRow>
                  )}
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
