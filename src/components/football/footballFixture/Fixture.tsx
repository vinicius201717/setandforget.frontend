/* eslint-disable no-unused-vars */
import React from 'react'
import {
  DateContainerDate,
  FixtureContainer,
  FixtureTeamsContainer,
  LogoNameContainer,
  OddsContaier,
  TeamImage,
  ViewContainer,
} from './style'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Divider, Typography } from '@mui/material'
import { FixtureTypeResponse } from 'src/types/apps/footballType'
import { formatFixtureDate } from 'src/utils/format-date-local'
import { formatHour } from 'src/utils/format-hours'
import { formatDate } from 'src/utils/format-data'

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
      <ViewContainer onClick={() => handlePrediction(data.fixture.id)}>
        <VisibilityIcon />
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
      </FixtureTeamsContainer>
      <OddsContaier />
    </FixtureContainer>
  )
}

export default Fixture
