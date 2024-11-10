/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import {
  ContainerResult,
  ContainerTimerAndResultsInfo,
  FixtureContainerLive,
  FixtureTeamsContainer,
  ItemResult,
  LDateContainerDate,
  LinkButtom,
  LogoNameContainer,
  OddsContainer,
  OddValue,
  TeamImage,
  TypographyTeamName,
  ViewContainer,
  Vs,
} from './style'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Divider, Typography } from '@mui/material'
import { MatchData, Odds } from 'src/types/apps/footballType/oddsLiveType'
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
  const [odds, setOdds] = useState<Odds | undefined>(undefined)
  const [serverTime, setServerTime] = useState<string>('00:00')

  const gameTime = useGameTimer(serverTime)

  useEffect(() => {
    if (data.odds) {
      let selectedOdd = data.odds.find((odd) => odd.name === 'Match Winner')

      if (!selectedOdd) {
        selectedOdd = data.odds.find((odd) => odd.values.length === 3)
      }

      if (selectedOdd) setOdds(selectedOdd)
    }
  }, [data])

  useEffect(() => {
    const intervalId = setInterval(() => {
      const updatedServerTime = data.fixture.status.seconds
      setServerTime(updatedServerTime)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <FixtureContainerLive prediction={prediction}>
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
          <TypographyTeamName>{data.teamsInfo.home.name}</TypographyTeamName>
        </LogoNameContainer>
        <ContainerTimerAndResultsInfo>
          <LDateContainerDate>{gameTime}</LDateContainerDate>

          <ContainerResult>
            <ItemResult>{data.teams.home.goals}</ItemResult>
            <Vs variant='body2'>X</Vs>
            <ItemResult>{data.teams.away.goals}</ItemResult>
          </ContainerResult>
        </ContainerTimerAndResultsInfo>

        <LogoNameContainer>
          <TeamImage
            src={data.teamsInfo.away.logo}
            height={30}
            width={30}
            alt={data.teamsInfo.away.name}
          />
          <TypographyTeamName>{data.teamsInfo.away.name}</TypographyTeamName>
        </LogoNameContainer>
        <Divider sx={{ marginTop: '10px' }} />
      </FixtureTeamsContainer>
      <Typography variant='body2' sx={{ cursor: 'help' }}>
        {odds?.name}
      </Typography>

      <OddsContainer>
        {odds?.values.map((value, index) => (
          <React.Fragment key={index}>
            <OddValue>
              <p>{Number(value.odd).toFixed(2)}</p>
            </OddValue>

            {index < odds.values.length - 1 && (
              <Divider orientation='vertical' flexItem sx={{ marginX: 1 }} />
            )}
          </React.Fragment>
        ))}
      </OddsContainer>
    </FixtureContainerLive>
  )
}

export default FixtureLive
