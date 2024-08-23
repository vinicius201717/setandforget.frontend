import React from 'react'
import { useRouter } from 'next/router'
import { Box, Toolbar, Typography } from '@mui/material'
import LeagueLayout from 'src/layouts/components/footballLayout/leagueLayout'

export default function LeagueFixture() {
  const router = useRouter()
  const { leagueId, season } = router.query

  const leagueIdNumber = leagueId ? parseInt(leagueId as string, 10) : undefined
  const seasonNumber = season ? parseInt(season as string, 10) : undefined

  return (
    <>
      <LeagueLayout
        leagueId={leagueIdNumber as number}
        season={seasonNumber as number}
      >
        <div>
          <Box position='static'>
            <Toolbar>
              <Typography variant='h6' component='div'>
                teste
              </Typography>
            </Toolbar>
          </Box>
        </div>
      </LeagueLayout>
    </>
  )
}
