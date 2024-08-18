import {
  Badge,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Pagination,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { getLeagues } from 'src/pages/api/football/getLeagues'
import { LeagueResponse } from 'src/types/apps/football'
import { ContainerProgress, LeagueImage, LinkLeague, StyledCard } from './style'
import PageHeader from 'src/@core/components/page-header'
import { useQuery } from '@tanstack/react-query'
import FootballLayout from 'src/layouts/components/footballLayout'

export default function Football() {
  const [page, setPage] = useState(1)

  const { data, isLoading } = useQuery({
    queryKey: ['leagues', page],
    queryFn: () => getLeagues(page),
    refetchOnWindowFocus: false,
  })

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
          title={<Typography variant='h5'>Football - Leagues</Typography>}
          subtitle={
            <Typography variant='body2'>
              Explore comprehensive data and insights on football leagues from
              around the world, including standings, schedules, and more.
            </Typography>
          }
        />

        <Grid container spacing={3}>
          {isLoading ? (
            <ContainerProgress>
              <CircularProgress />
            </ContainerProgress>
          ) : (
            data &&
            data.leagues.map((league: LeagueResponse) => (
              <Grid item xs={4} key={league.league.id}>
                <LinkLeague
                  href={`/sports/football/league/${league.league.id}`}
                >
                  <StyledCard>
                    <LeagueImage
                      src={league.league.logo}
                      alt={league.league.name}
                      width={30}
                      height={30}
                    />
                    <CardContent>
                      <Typography component='span'>
                        {league.league.name}
                      </Typography>
                      <Typography color='textSecondary'>
                        {league.league.type} ({league.league.type})
                      </Typography>
                    </CardContent>
                    {league.seasons[league.seasons.length - 1].current && (
                      <Badge
                        color='success'
                        variant='dot'
                        sx={{
                          position: 'absolute',
                          right: '10px',
                          '& .MuiBadge-badge': {
                            right: 4,
                            boxShadow: (theme) =>
                              `0 0 0 2px ${theme.palette.background.paper}`,
                          },
                        }}
                      />
                    )}
                  </StyledCard>
                </LinkLeague>
              </Grid>
            ))
          )}
        </Grid>
        {data && (
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
