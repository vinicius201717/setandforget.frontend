/* eslint-disable no-unused-vars */
import React from 'react'
import {
  ButtonOdds,
  DateContainerDate,
  FixtureContainer,
  FixtureTeamsContainer,
  LinkButtom,
  LogoNameContainer,
  OddsContainer,
  TeamImage,
  ViewContainer,
} from './style'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Divider, Typography } from '@mui/material'
import { formatFixtureDate } from 'src/utils/format-date-local'
import { formatHour } from 'src/utils/format-hours'
import { formatDate } from 'src/utils/format-data'
import { FixtureTypeResponse } from 'src/types/apps/footballType/fixtureType'

interface FixtureProps {
  data: FixtureTypeResponse
  prediction?: boolean
  handlePrediction: (id: number) => void
}

const Fixture: React.FC<FixtureProps> = ({
  data,
  prediction = false,
  handlePrediction,
}) => {
  const isActive =
    data.fixture.status.short === 'NS' ||
    data.fixture.status.short === '1H' ||
    data.fixture.status.short === '2H'

  if (!isActive) {
    return null
  }

  return (
    <FixtureContainer prediction={prediction}>
      <DateContainerDate>
        {formatDate(formatFixtureDate(data.fixture.date).date)} -{' '}
        {formatHour(formatFixtureDate(data.fixture.date).time)}
      </DateContainerDate>
      <ViewContainer>
        <VisibilityIcon onClick={() => handlePrediction(data.fixture.id)} />
      </ViewContainer>
      <FixtureTeamsContainer>
        <LogoNameContainer>
          <TeamImage
            src={data.teams.home.logo}
            height={30}
            width={30}
            alt={data.teams.home.name}
          />
          <Typography>{data.teams.home.name}</Typography>
        </LogoNameContainer>
        <Typography>X</Typography>
        <LogoNameContainer>
          <TeamImage
            src={data.teams.away.logo}
            height={30}
            width={30}
            alt={data.teams.away.name}
          />
          <Typography>{data.teams.away.name}</Typography>
        </LogoNameContainer>
        <Divider sx={{ marginTop: '10px' }} />
      </FixtureTeamsContainer>{' '}
      <LinkButtom href={`/sports/football/fixture/${data.fixture.id}`}>
        <ButtonOdds>View odds </ButtonOdds>
      </LinkButtom>
    </FixtureContainer>
  )
}

export default Fixture
