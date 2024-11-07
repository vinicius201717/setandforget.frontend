/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import {
  DateContainerDate,
  FixtureContainer,
  FixtureTeamsContainer,
  LDateContainerDate,
  LinkButtom,
  LogoNameContainer,
  OddsContainer,
  TeamImage,
  ViewContainer,
} from './style'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Divider, Typography } from '@mui/material'
import { MatchData } from 'src/types/apps/footballType/oddsLiveType'
import useGameTimer from 'src/hooks/useOddsLiveTimer'

interface FixtureLiveProps {
  data: MatchData
  prediction?: boolean
  handlePrediction: (id: number) => void
}

const FixtureLive: React.FC<FixtureLiveProps> = ({
  data,
  prediction = false,
  handlePrediction,
}) => {
  const [serverTime, setServerTime] = useState<string>('00:00')

  const gameTime = useGameTimer(serverTime)

  useEffect(() => {
    const intervalId = setInterval(() => {
      const updatedServerTime = data.fixture.status.seconds
      setServerTime(updatedServerTime)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <FixtureContainer prediction={prediction}>
      <LDateContainerDate>{gameTime}</LDateContainerDate>
      <ViewContainer>
        <LinkButtom href={`/sports/football/fixture/${data.fixture.id}`}>
          <Typography variant='body2'> View more</Typography>
        </LinkButtom>

        <VisibilityIcon onClick={() => handlePrediction(data.fixture.id)} />
      </ViewContainer>
      <FixtureTeamsContainer>
        <LogoNameContainer>
          <TeamImage
            src={data.teamsInfo.home.logo}
            height={30}
            width={30}
            alt={data.teamsInfo.home.name}
          />
          <Typography>{data.teamsInfo.home.name}</Typography>
        </LogoNameContainer>
        <Typography>X</Typography>
        <LogoNameContainer>
          <TeamImage
            src={data.teamsInfo.away.logo}
            height={30}
            width={30}
            alt={data.teamsInfo.away.name}
          />
          <Typography>{data.teamsInfo.away.name}</Typography>
        </LogoNameContainer>
        <Divider sx={{ marginTop: '10px' }} />
      </FixtureTeamsContainer>
      <OddsContainer />
    </FixtureContainer>
  )
}

export default FixtureLive
