/* eslint-disable no-unused-vars */
import React from 'react'
import {
  AppBarContainer,
  LeagueImage,
  ListContainer,
  ListItemContainer,
  ToolbarContainer,
} from './style'
import { ListItemText } from '@mui/material'
import { PlayerStatistics } from 'src/types/apps/footballType/playersType'

interface FootballPlayerMenuTeamProps {
  statistics: PlayerStatistics[]
  handleChange: (event: React.SyntheticEvent, newValue: number) => void
}
const FootballPlayerMenuTeam: React.FC<FootballPlayerMenuTeamProps> = ({
  statistics,
  handleChange,
}) => {
  return (
    <AppBarContainer position='static'>
      <ToolbarContainer>
        {statistics && statistics.length > 0 && (
          <ListContainer
            sx={{ display: 'flex', flexDirection: 'row', padding: 0 }}
          >
            {statistics.map((stat, index) => (
              <React.Fragment key={index}>
                <ListItemContainer
                  onClick={(event) => handleChange(event, index)}
                >
                  <LeagueImage
                    src={stat.league.logo}
                    alt={stat.league.name}
                    title={stat.league.name}
                    width={30}
                    height={30}
                  />
                  <ListItemText
                    primary={stat.team.name}
                    secondary={stat.league.name}
                    sx={{ textAlign: 'center' }}
                  />
                </ListItemContainer>
              </React.Fragment>
            ))}
          </ListContainer>
        )}
      </ToolbarContainer>
    </AppBarContainer>
  )
}

export default FootballPlayerMenuTeam
