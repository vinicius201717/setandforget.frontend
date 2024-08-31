import React, { useState, Fragment } from 'react'
import {
  CircularProgress,
  Typography,
  Paper,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Collapse,
  PaginationItem,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { Injuries } from 'src/types/apps/footballType'
import { getInjuries } from 'src/pages/api/football/injuries/getInjuries'
import { useRouter } from 'next/router'
import Icon from 'src/@core/components/icon'
import {
  ContainerProgress,
  PlayerPhoto,
  StyledPagination,
  StyledTableCell,
  ContentUnavailable,
} from './style'
import Image from 'next/image'
import noContent from 'public/images/pages/tree.png'
import { formatFixtureDate } from 'src/utils/format-date-local'
import { formatDate } from 'src/utils/format-data'

const createData = (injuryData: Injuries) => ({
  playerName: injuryData.player.name,
  teamName: injuryData.team.name,
  fixtureDate: formatDate(formatFixtureDate(injuryData.fixture.date).date),
  leagueName: injuryData.league.name,
  reason: injuryData.player.reason,
  type: injuryData.player.type,
  playerPhoto: injuryData.player.photo,
})

const Row = (props: { row: ReturnType<typeof createData> }) => {
  const { row } = props
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell component='th' scope='row'>
          <Box display='flex' alignItems='center' justifyContent='flex-start'>
            <PlayerPhoto
              src={row.playerPhoto}
              alt={row.playerName}
              width={40}
              height={40}
            />
            <Typography>{row.playerName}</Typography>
          </Box>
        </TableCell>
        <TableCell align='right'>{row.teamName}</TableCell>
        <TableCell align='right'>{row.fixtureDate}</TableCell>
        <TableCell align='right'>{row.leagueName}</TableCell>
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
              <Box mb={2}>
                <Table size='small'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Reason</TableCell>
                      <TableCell>Type</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{row.reason || 'NO INFORMATION'}</TableCell>
                      <TableCell>{row.type || 'NO INFORMATION '}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

export default function LeagueInjuriesTable() {
  const router = useRouter()
  const { leagueId, season } = router.query

  const leagueIdNumber = leagueId ? parseInt(leagueId as string, 10) : undefined
  const seasonNumber = season ? parseInt(season as string, 10) : undefined

  const { data, error, isLoading } = useQuery<Injuries[] | null>({
    queryKey: ['injuries', leagueIdNumber, seasonNumber],
    queryFn: () =>
      getInjuries(leagueIdNumber as number, seasonNumber as number),
    enabled: !!leagueIdNumber && !!seasonNumber,
  })

  const [page, setPage] = useState(1)
  const rowsPerPage = 20

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  if (isLoading) {
    return (
      <ContainerProgress>
        <CircularProgress />
      </ContainerProgress>
    )
  }

  if (error) {
    return (
      <Typography variant='h6' color='error'>
        Error fetching injury data
      </Typography>
    )
  }

  const rows = data?.map(createData) || []

  const paginatedRows = rows.slice((page - 1) * rowsPerPage, page * rowsPerPage)

  if (rows.length === 0) {
    return (
      <ContentUnavailable>
        <Image
          src={noContent}
          alt='The content is unavailable.'
          title='The content is unavailable.'
          width={150}
          height={150}
        />
        <Typography variant='h6'>The content is unavailable.</Typography>
      </ContentUnavailable>
    )
  }

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Player</StyledTableCell>
            <StyledTableCell align='right'>Team</StyledTableCell>
            <StyledTableCell align='right'>Fixture Date</StyledTableCell>
            <StyledTableCell align='right'>League</StyledTableCell>
            <StyledTableCell align='right'>Details</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedRows.map((row, index) => (
            <Row key={index} row={row} />
          ))}
        </TableBody>
      </Table>
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
        <StyledPagination
          count={Math.ceil(rows.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          variant='text'
          shape='rounded'
          renderItem={(item) => (
            <PaginationItem
              {...item}
              sx={{
                color: item.selected ? '#fff' : '#ffffff', // Cor dos números não selecionados
              }}
            />
          )}
        />
      </Box>
    </Paper>
  )
}
