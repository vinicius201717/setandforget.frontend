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
  TablePagination,
} from '@mui/material'

import { useState, Fragment } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { PlayerData } from 'src/types/apps/footballType'
import { getPlayers } from 'src/pages/api/football/player/getPlayers'
import Icon from 'src/@core/components/icon'
import { ContainerProgress, PlayerPhoto } from './style'

const createData = (playerData: PlayerData) => ({
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

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell component='th' scope='row'>
          <Box display='flex' alignItems='center'>
            <PlayerPhoto
              src={row.photo}
              alt={row.name}
              width={50}
              height={50}
            />

            <Typography>{row.name}</Typography>
          </Box>
        </TableCell>
        <TableCell align='right'>{row.age}</TableCell>
        <TableCell align='right'>{row.nationality}</TableCell>
        <TableCell align='right'>{row.height}</TableCell>
        <TableCell align='right'>{row.weight}</TableCell>
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
        <TableCell colSpan={6} sx={{ py: '0 !important' }}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ m: 2 }}>
              {row.statistics.map((stat, index) => (
                <Box key={index} mb={2}>
                  <Typography variant='h6'>
                    {stat.team.name} - {stat.league.name}
                  </Typography>
                  <Table size='small'>
                    <TableHead>
                      <TableRow>
                        <TableCell>Matches</TableCell>
                        <TableCell>Position</TableCell>
                        <TableCell>Goals</TableCell>
                        <TableCell>Assists</TableCell>
                        <TableCell>Yellow Cards</TableCell>
                        <TableCell>Red Cards</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>{stat.games.appearences || 0}</TableCell>
                        <TableCell>{stat.games.position}</TableCell>
                        <TableCell>{stat.goals.total || 0}</TableCell>
                        <TableCell>{stat.goals.assists || 0}</TableCell>
                        <TableCell>{stat.cards.yellow || 0}</TableCell>
                        <TableCell>{stat.cards.red || 0}</TableCell>
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

export default function LeaguePlayers() {
  const router = useRouter()
  const { leagueId, season } = router.query

  const leagueIdNumber = leagueId ? parseInt(leagueId as string, 10) : undefined
  const seasonNumber = season ? parseInt(season as string, 10) : undefined

  const [page, setPage] = useState(0)
  const [rowsPerPage] = useState(1)

  const { data, error, isLoading } = useQuery<PlayerData[]>({
    queryKey: ['leaguePlayers', leagueIdNumber, seasonNumber, page],
    queryFn: () =>
      getPlayers(leagueIdNumber as number, seasonNumber as number, page + 1),
    enabled: !!leagueIdNumber && !!seasonNumber,
  })

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const renderContent = () => {
    if (error) {
      return <div>Error fetching league data</div>
    }

    const rows = data?.map(createData)

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
                  <TableCell>Player</TableCell>
                  <TableCell align='right'>Age</TableCell>
                  <TableCell align='right'>Nationality</TableCell>
                  <TableCell align='right'>Height</TableCell>
                  <TableCell align='right'>Weight</TableCell>
                  <TableCell align='right'>Statistics</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows?.map((row) => <Row key={row.name} row={row} />)}
              </TableBody>
            </Table>
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
              <TablePagination
                rowsPerPageOptions={[]}
                component='div'
                count={-1}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                labelDisplayedRows={() => null}
                nextIconButtonProps={{ 'aria-label': 'Next page' }}
                backIconButtonProps={{ 'aria-label': 'Previous page' }}
              />
            </Box>
          </TableContainer>
        )}
      </>
    )
  }

  return <>{renderContent()}</>
}
