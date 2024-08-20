import React, { useState, useEffect } from 'react'
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
import { BoxHeader, BoxText, LeagueCard, LeagueLogo } from './style'
import { ContainerProgress } from '../../style'
import { LeagueResponse } from 'src/types/apps/football'
import FootballLayout from 'src/layouts/components/footballLayout'

export default function LeaguePage() {
  const router = useRouter()
  const { leagueId } = router.query
  const [leagueData, setLeagueData] = useState<LeagueResponse | null>(null)

  useEffect(() => {
    if (leagueId) {
      try {
        getLeague(leagueId as string).then((league) => {
          setLeagueData(league)
        })
      } catch (error) {
        console.error('Erro ao buscar os dados da liga:', error)
      }
    }
  }, [leagueId])

  return (
    <FootballLayout>
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
