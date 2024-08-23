import React from 'react'
import {
  DateContainer,
  FixtureContainer,
  FixtureTeamsContainer,
  LogoNameContainer,
  OddsContaier,
  TeamImage,
} from './style'
import { Divider, Typography } from '@mui/material'
import { formatDate } from 'src/@core/utils/format'
import { FixtureTypeResponse } from 'src/types/apps/footballType'

interface FixtureProps {
  data: FixtureTypeResponse
}

const Fixture: React.FC<FixtureProps> = ({ data }) => {
  const isActive =
    data.fixture.status.short === 'NS' ||
    data.fixture.status.short === '1H' ||
    data.fixture.status.short === '2H'

  if (!isActive) {
    return null
  }

  return (
    <FixtureContainer>
      <DateContainer>{formatDate(data.fixture.date)}</DateContainer>
      <FixtureTeamsContainer>
        <LogoNameContainer>
          <TeamImage
            src={data.teams.away.logo}
            height={30}
            width={30}
            alt={data.teams.away.name}
          />
          <Typography>{data.teams.away.name}</Typography>
        </LogoNameContainer>
        <Typography>X</Typography>
        <LogoNameContainer>
          <TeamImage
            src={data.teams.home.logo}
            height={30}
            width={30}
            alt={data.teams.home.name}
          />
          <Typography>{data.teams.home.name}</Typography>
        </LogoNameContainer>
        <Divider sx={{ marginTop: '10px' }} />
      </FixtureTeamsContainer>
      <OddsContaier />
    </FixtureContainer>
  )
}

export default Fixture
