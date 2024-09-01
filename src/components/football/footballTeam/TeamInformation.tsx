import React from 'react'
import { Typography, Box } from '@mui/material'
import { CardContainer, CardContentStyle, GridContainer } from './style'
import { TeamInformationInterface } from 'src/types/apps/footballType/teamType'

interface TeamCardProps {
  teamProps: TeamInformationInterface[]
}

const TeamCard = ({ teamProps }: TeamCardProps) => {
  const team = teamProps[0]

  return (
    <GridContainer container>
      <CardContainer>
        <CardContentStyle>
          <Typography variant='h6'>
            {team?.team?.name || 'Team name not available'}
          </Typography>
          <Typography variant='body2' color='inherit'>
            {team?.team?.country || 'Country not available'} - Founded:{' '}
            {team?.team?.founded || 'N/A'}
          </Typography>
          <Box sx={{ marginTop: 2 }}>
            <Typography variant='body2' color='inherit'>
              <strong>Stadium:</strong> {team?.venue?.name || 'N/A'}
            </Typography>
            <Typography variant='body2' color='inherit'>
              <strong>Location:</strong> {team?.venue?.city || 'N/A'}
            </Typography>
            <Typography variant='body2' color='inherit'>
              <strong>Address:</strong> {team?.venue?.address || 'N/A'}
            </Typography>
            <Typography variant='body2' color='inherit'>
              <strong>Capacity:</strong>{' '}
              {team?.venue?.capacity ? `${team.venue.capacity} seats` : 'N/A'}
            </Typography>
            <Typography variant='body2' color='inherit'>
              <strong>Surface:</strong> {team?.venue?.surface || 'N/A'}
            </Typography>
          </Box>
        </CardContentStyle>
      </CardContainer>
    </GridContainer>
  )
}

export default TeamCard
