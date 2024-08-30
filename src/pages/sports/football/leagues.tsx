/* eslint-disable react-hooks/exhaustive-deps */
import {
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Pagination,
  Paper,
  Typography,
} from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import { useEffect, useState } from 'react'
import { getLeagues } from 'src/pages/api/football/league/getLeagues'
import {
  ContainerProgress,
  IconButtonStar,
  LeagueImage,
  LinkLeague,
  StyledCard,
} from './style'
import PageHeader from 'src/@core/components/page-header'
import { useQuery } from '@tanstack/react-query'
import FootballLayout from 'src/layouts/components/footballLayout'
import { GridSearchIcon } from '@mui/x-data-grid'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DeleteUserFavoriteLeague } from 'src/pages/api/football/league/deleteUserFavoriteLeague'
import { postUserFavoriteLeague } from 'src/pages/api/football/league/postUserFavoriteLeague'
import { LeagueResponse, UserFavoriteLeague } from 'src/types/apps/footballType'

const searchSchema = z.object({
  searchQuery: z.string().min(1, 'Search query is required'),
})

type SearchFormData = z.infer<typeof searchSchema>

export default function Football() {
  const [page, setPage] = useState(1)
  const [favoriteLeague, setFavoriteLeague] = useState<UserFavoriteLeague[]>([])
  const [leagues, setLeagues] = useState<LeagueResponse[]>([])
  const [allLeagues, setAllLeagues] = useState<LeagueResponse[]>([])
  const [search, setSearch] = useState<boolean>(false)

  const { register, handleSubmit, watch } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
  })

  const searchQuery = watch('searchQuery', '')

  const { data, isLoading } = useQuery({
    queryKey: ['leagues', page],
    queryFn: () => getLeagues(page),
    refetchOnWindowFocus: false,
  })

  const handleToggleFavorite = (leagueId: number) => {
    setFavoriteLeague((prevFavorites) => {
      const favorite = prevFavorites.find((fav) => fav.leagueId === leagueId)

      if (favorite) {
        DeleteUserFavoriteLeague(favorite.id).then((response) => {
          if (response) {
            setFavoriteLeague(
              prevFavorites.filter((fav) => fav.leagueId !== leagueId),
            )
          }
        })
      } else {
        postUserFavoriteLeague(data?.leagues).then((response) => {
          if (response) {
            setFavoriteLeague([...prevFavorites, response])
          }
        })
      }

      return prevFavorites
    })
  }

  const onSubmit = (value: SearchFormData) => {
    if (!leagues || leagues.length === 0) {
      console.log('Leagues array is empty or undefined')
      return
    }

    const searchQuery = value.searchQuery.toLowerCase().trim()

    const filtered = allLeagues.filter((leagues) => {
      const leagueName = leagues.league.name.toLowerCase()
      return leagueName.includes(searchQuery)
    })
    setSearch(true)
    setLeagues(filtered)
  }

  useEffect(() => {
    if (data?.leagues) {
      setLeagues(data.leagues)
    }
    if (data?.allLeagues) {
      setAllLeagues(data.allLeagues)
    }
    if (data?.userFavoriteLeagues) {
      const favoriteLeagueIds = data.userFavoriteLeagues.map(
        (favorite: UserFavoriteLeague) => favorite,
      )
      setFavoriteLeague(favoriteLeagueIds)
    }
  }, [data])

  useEffect(() => {
    if (searchQuery.trim() === '' && data?.leagues) {
      setSearch(false)
      setLeagues(data?.leagues)
    }
  }, [searchQuery])

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value)
  }

  return (
    <FootballLayout>
      <Container>
        <PageHeader
          title={
            <Paper
              component='form'
              onSubmit={handleSubmit(onSubmit)}
              sx={{
                p: '2px 8px',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder='Search League'
                inputProps={{ 'aria-label': 'search leagues' }}
                {...register('searchQuery')}
              />
              <IconButton type='submit' sx={{ p: '10px' }} aria-label='search'>
                <GridSearchIcon />
              </IconButton>
            </Paper>
          }
        />
        <Divider sx={{ margin: '10px' }} />
        <Grid container spacing={3}>
          {isLoading ? (
            <ContainerProgress>
              <CircularProgress />
            </ContainerProgress>
          ) : (
            leagues &&
            leagues.map((league: LeagueResponse) => (
              <Grid item xs={4} key={league.league.id}>
                <StyledCard>
                  <LeagueImage
                    src={league.league.logo}
                    alt={league.league.name}
                    width={30}
                    height={30}
                  />
                  <CardContent>
                    <LinkLeague
                      href={`/sports/football/league/${league.league.id}`}
                    >
                      <Typography component='span'>
                        {league.league.name}
                      </Typography>
                    </LinkLeague>
                    <Typography color='textSecondary'>
                      {league.league.type} ({league.league.type})
                    </Typography>
                  </CardContent>
                  <IconButtonStar
                    onClick={() => handleToggleFavorite(league.league.id)}
                  >
                    {favoriteLeague.some(
                      (fav) => fav.leagueId === league.league.id,
                    ) ? (
                      <StarIcon color='primary' />
                    ) : (
                      <StarBorderIcon />
                    )}
                  </IconButtonStar>
                </StyledCard>
              </Grid>
            ))
          )}
        </Grid>
        {!search && data && (
          <Pagination
            count={Math.ceil(data?.total / 30) || 0}
            page={page}
            onChange={handlePageChange}
            color='primary'
            style={{
              marginTop: '2rem',
              display: 'flex',
              justifyContent: 'center',
            }}
          />
        )}
      </Container>
    </FootballLayout>
  )
}
