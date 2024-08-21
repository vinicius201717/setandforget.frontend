import React from 'react'
import { LeagueFixtureContainer, LeagueFixtureContent } from './style'
import { Typography } from '@mui/material'

interface LeagueFixtureProps {
  leagueName: string
  children?: React.ReactNode
}

const LeagueFixture: React.FC<LeagueFixtureProps> = ({
  leagueName,
  children,
}) => {
  return (
    <LeagueFixtureContainer>
      <Typography variant='h6'>{leagueName}</Typography>
      <LeagueFixtureContent>{children}</LeagueFixtureContent>
    </LeagueFixtureContainer>
  )
}

export default LeagueFixture
