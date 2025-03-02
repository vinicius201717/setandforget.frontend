import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import RemoveIcon from '@mui/icons-material/Remove'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { getLeagueStandings } from 'src/pages/api/football/league/getLeagueStandings'
import { LeagueStadings } from 'src/types/apps/footballType'
import {
  BoxForm,
  ContainerProgress,
  GetIcon,
  TeamCellClube,
  TeamLogo,
  ContentUnavailable,
} from './style'
import Image from 'next/image'
import noContent from 'public/images/pages/tree.png'
import Link from 'next/link'

const getIcon = (result: string, isLast: boolean) => {
  const iconSize = 16
  switch (result) {
    case 'W':
      return (
        <GetIcon result={result} isLast={isLast}>
          <CheckIcon sx={{ fontSize: `${iconSize}px` }} />
        </GetIcon>
      )
    case 'L':
      return (
        <GetIcon result={result} isLast={isLast}>
          <CloseIcon sx={{ fontSize: `${iconSize}px` }} />
        </GetIcon>
      )
    case 'D':
      return (
        <GetIcon result={result} isLast={isLast}>
          <RemoveIcon sx={{ fontSize: `${iconSize}px` }} />
        </GetIcon>
      )
    default:
      return null
  }
}

export default function LeagueStandings() {
  const router = useRouter()
  const { leagueId, season } = router.query

  const leagueIdNumber = leagueId ? parseInt(leagueId as string, 10) : undefined
  const seasonNumber = season ? parseInt(season as string, 10) : undefined

  const { data, error, isLoading } = useQuery<LeagueStadings[]>({
    queryKey: ['leagueStandings', leagueIdNumber, seasonNumber],
    queryFn: () =>
      getLeagueStandings(leagueIdNumber as number, seasonNumber as number),
    enabled: !!leagueIdNumber && !!seasonNumber,
  })

  const renderContent = () => {
    if (isLoading) {
      return (
        <ContainerProgress>
          <CircularProgress />
        </ContainerProgress>
      )
    }

    if (error || !data || !data.length || !data[0]?.league?.standings.length) {
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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='league standings table'>
          <TableHead>
            <TableRow>
              <TableCell>CLUB</TableCell>
              <TableCell>Pts</TableCell>
              <TableCell>PJ</TableCell>
              <TableCell>VIT</TableCell>
              <TableCell>E</TableCell>
              <TableCell>DER</TableCell>
              <TableCell>GM</TableCell>
              <TableCell>GC</TableCell>
              <TableCell>SG</TableCell>
              <TableCell align='right'>LATEST</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data[0].league.standings.map((standingGroup, groupIndex) =>
              standingGroup.map((standing, index) => (
                <TableRow key={`${groupIndex}-${index}`}>
                  <Link
                    href={`/sports/football/league/${leagueId}/${season}/team/${standing.team.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <TeamCellClube>
                      <TeamLogo
                        src={standing.team.logo}
                        width={30}
                        height={30}
                        alt={standing.team.name}
                      />
                      <Typography>{standing.team.name}</Typography>
                    </TeamCellClube>
                  </Link>
                  <TableCell>{standing.points}</TableCell>
                  <TableCell>{standing.all.played}</TableCell>
                  <TableCell>{standing.all.win}</TableCell>
                  <TableCell>{standing.all.draw}</TableCell>
                  <TableCell>{standing.all.lose}</TableCell>
                  <TableCell>{standing.all.goals.for}</TableCell>
                  <TableCell>{standing.all.goals.against}</TableCell>
                  <TableCell>{standing.goalsDiff}</TableCell>
                  <TableCell align='right'>
                    <BoxForm>
                      {standing.form
                        ? standing.form
                            .split('')
                            .reverse()
                            .map((result, i) =>
                              i === standing.form.length - 1
                                ? getIcon(result, true)
                                : getIcon(result, false),
                            )
                        : null}
                    </BoxForm>
                  </TableCell>
                </TableRow>
              )),
            )}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  return <>{renderContent()}</>
}
