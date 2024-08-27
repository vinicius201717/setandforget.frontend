/* eslint-disable no-unused-vars */
import {
  Typography,
  CircularProgress,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Paper,
  IconButton,
  Collapse,
} from '@mui/material'

import { useState, Fragment } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { PlayerDataStatistics } from 'src/types/apps/footballType'
import Icon from 'src/@core/components/icon'
import {
  ContainerProgress,
  PlayerPhoto,
  TeamLogo,
  TeamLogoContainer,
  TypographyPrimary,
} from './style'
import { getTopYellowCard } from 'src/pages/api/football/player/getTopYellowCard'

const createData = (playerData: PlayerDataStatistics) => ({
  name: playerData.player.name,
  age: playerData.player.age,
  nationality: playerData.player.nationality,
  height: playerData.player.height,
  weight: playerData.player.weight,
  photo: playerData.player.photo,
  statistics: playerData.statistics,
})

const Row = (props: { row: ReturnType<typeof createData> }) => {
  const { row } = props
  const [open, setOpen] = useState<boolean>(false)

  const primaryStat = row.statistics[0] || {}

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell colSpan={2}>
          <Box display='flex' alignItems='center' gap={1}>
            <PlayerPhoto
              src={row.photo}
              alt={row.name}
              width={50}
              height={50}
            />
            {row.name}
          </Box>
        </TableCell>
        <TableCell align='right'>
          {primaryStat.games?.appearences || 0}
        </TableCell>
        <TableCell align='right'>{primaryStat.goals?.assists || 0}</TableCell>
        <TableCell align='right'>{primaryStat.goals?.total || 0}</TableCell>
        <TableCell align='right'>{primaryStat.cards?.red || 0}</TableCell>
        <TableCell align='right'>
          <TypographyPrimary>
            {primaryStat.cards?.yellow || 0}{' '}
          </TypographyPrimary>
        </TableCell>
        <TableCell align='right'>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            <Icon icon={open ? 'mdi:chevron-up' : 'mdi:chevron-down'} />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={12} sx={{ py: '0 !important' }}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ m: 2 }}>
              {row.statistics.map((stat, index) => (
                <Box key={index} mb={2}>
                  <TeamLogoContainer>
                    <TeamLogo
                      src={stat.team.logo}
                      width={50}
                      height={50}
                      alt={stat.team.name}
                    />
                    <Typography variant='h6'>
                      {stat.team.name} - {stat.league.name}
                    </Typography>
                  </TeamLogoContainer>
                  <Table size='small'>
                    <TableHead>
                      <TableRow>
                        <TableCell align='right'>Minutes</TableCell>
                        <TableCell align='right'>Position</TableCell>
                        <TableCell align='right'>Passes</TableCell>
                        <TableCell align='right'>Pass Accuracy</TableCell>
                        <TableCell align='right'>Tackles</TableCell>
                        <TableCell align='right'>Interceptions</TableCell>
                        <TableCell align='right'>Dribbles</TableCell>
                        <TableCell align='right'>Duels Won</TableCell>
                        <TableCell align='right'>Penalties Scored</TableCell>
                        <TableCell align='right'>Penalties Missed</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell align='right'>
                          {stat.games.minutes || 0}
                        </TableCell>
                        <TableCell align='right'>
                          {stat.games.position}
                        </TableCell>
                        <TableCell align='right'>
                          {stat.passes.total || 0}
                        </TableCell>
                        <TableCell align='right'>
                          {stat.passes.accuracy}%
                        </TableCell>
                        <TableCell align='right'>
                          {stat.tackles.total || 0}
                        </TableCell>
                        <TableCell align='right'>
                          {stat.tackles.interceptions || 0}
                        </TableCell>
                        <TableCell align='right'>
                          {stat.dribbles.success || 0}
                        </TableCell>
                        <TableCell align='right'>
                          {stat.duels.won || 0}
                        </TableCell>
                        <TableCell align='right'>
                          {stat.penalty.scored || 0}
                        </TableCell>
                        <TableCell align='right'>
                          {stat.penalty.missed || 0}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>
              ))}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

interface CardProps {
  handleCard: (card: 'RED' | 'YELLOW') => void
}

export default function TopAssistsTable({ handleCard }: CardProps) {
  const router = useRouter()
  const { leagueId, season } = router.query

  const leagueIdNumber = leagueId ? parseInt(leagueId as string, 10) : undefined
  const seasonNumber = season ? parseInt(season as string, 10) : undefined

  const { data, error, isLoading } = useQuery<PlayerDataStatistics[]>({
    queryKey: ['topYellowCard', leagueIdNumber, seasonNumber],
    queryFn: () =>
      getTopYellowCard(leagueIdNumber as number, seasonNumber as number),
    enabled: !!leagueIdNumber && !!seasonNumber,
  })

  const renderContent = () => {
    if (error) {
      return <div>Error fetching data</div>
    }

    const rows = data?.map(createData)

    const handleClick = () => {
      handleCard('RED')
    }

    return (
      <>
        {isLoading ? (
          <ContainerProgress>
            <CircularProgress />
          </ContainerProgress>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={2}>Player</TableCell>
                  <TableCell align='right'>Matches</TableCell>
                  <TableCell align='right'>Goals</TableCell>
                  <TableCell align='right'>Assists</TableCell>
                  <TableCell
                    align='right'
                    onClick={handleClick}
                    sx={{ cursor: 'pointer' }}
                  >
                    Red Cards
                  </TableCell>
                  <TableCell align='right'>
                    <TypographyPrimary>Yellow Cards </TypographyPrimary>
                  </TableCell>
                  <TableCell align='right'>Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows?.map((row) => <Row key={row.name} row={row} />)}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </>
    )
  }

  return <>{renderContent()}</>
}
