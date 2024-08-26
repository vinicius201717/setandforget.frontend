/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from 'react'
import { Coverage, LeagueResponse } from 'src/types/apps/footballType'
import { Box, Tabs, Tab } from '@mui/material'
import { useRouter } from 'next/router'
import { AppBarContainer, ToolbarContainer } from './style'

interface CoverageProps {
  league: LeagueResponse
  tabValue: number
  handleChange: (event: React.SyntheticEvent, newValue: number) => void
}

const FootballLeagueHorizontalMenu: React.FC<CoverageProps> = ({
  league,
  tabValue,
  handleChange,
}) => {
  const [coverage, setCoverage] = useState<Coverage>()
  const router = useRouter()

  useEffect(() => {
    if (league?.seasons && league.seasons[0]?.coverage) {
      setCoverage(league.seasons[0].coverage)
    }
  }, [router.pathname, league])

  const coverageEntries = useMemo(() => {
    return coverage
      ? Object.entries(coverage).filter(
          ([key, value]) => typeof value === 'boolean' && value,
        )
      : []
  }, [coverage])

  useEffect(() => {
    if (coverageEntries) {
      const stringsArray: string[] = coverageEntries.map((entry) =>
        entry[0].toUpperCase(),
      )
    }
  }, [coverageEntries])

  return (
    <AppBarContainer position='static'>
      <ToolbarContainer>
        <Box sx={{ width: '100%' }}>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label='navigation tabs'
          >
            {coverageEntries.map(([key], index) => (
              <Tab
                key={key}
                label={key.replace(/_/g, ' ').toUpperCase()}
                component={'div'}
                value={index}
              />
            ))}
          </Tabs>
        </Box>
      </ToolbarContainer>
    </AppBarContainer>
  )
}

export default FootballLeagueHorizontalMenu
