import React from 'react'
import { useRouter } from 'next/router'
import { getLeague } from 'src/pages/api/football/league/getLeague'
import {
  Badge,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@mui/material'
import { BoxHeader, BoxText, LeagueCard, LeagueLogo, LinkNext } from './style'
import { ContainerProgress } from '../../style'
import { LeagueResponse } from 'src/types/apps/footballType'
import FootballLayout from 'src/layouts/components/footballLayout'
import { useQuery } from '@tanstack/react-query'

export default function LeaguePage() {
  const router = useRouter()
  const { leagueId } = router.query

  const { data: leagueData } = useQuery<LeagueResponse>({
    queryKey: ['league', leagueId],
    queryFn: () => getLeague(leagueId as string),
    enabled: !!leagueId,
  })
  return (
    <FootballLayout type={'leagues'}>
      <Container>
        {leagueData ? (
          <>
            <BoxHeader>
              <LeagueLogo
                src={leagueData.league.logo}
                alt={leagueData.league.name}
                width={100}
                height={100}
              />
              <BoxText>
                <Typography>
                  Location: {leagueData.country.name || 'Desconhecido'}
                </Typography>
                <Typography>
                  {leagueData.league.name} - {leagueData.league.type}
                </Typography>
              </BoxText>
            </BoxHeader>
            <br />
            <Typography variant='h6' gutterBottom>
              Season
            </Typography>

            <Grid container spacing={3}>
              {leagueData.seasons
                .sort((a, b) => b.year - a.year)
                .map((season) => (
                  <Grid item xs={2} key={season.year}>
                    <LinkNext
                      href={`/sports/football/league/${leagueData.league.id}/${season.year}/details`}
                    >
                      <LeagueCard>
                        <CardContent>
                          <Typography>{season.year} </Typography>
                        </CardContent>
                        {season.current ? (
                          <Badge
                            color='success'
                            variant='dot'
                            sx={{
                              marginRight: '10px',
                              '& .MuiBadge-badge': {
                                right: 4,
                                boxShadow: (theme) =>
                                  `0 0 0 2px ${theme.palette.background.paper}`,
                              },
                            }}
                          />
                        ) : (
                          ''
                        )}
                      </LeagueCard>
                    </LinkNext>
                  </Grid>
                ))}
            </Grid>
          </>
        ) : (
          <ContainerProgress>
            <CircularProgress />
          </ContainerProgress>
        )}
      </Container>
    </FootballLayout>
  )
}
