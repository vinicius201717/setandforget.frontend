import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import FootballLayout from 'src/layouts/components/footballLayout'
import { useQuery } from '@tanstack/react-query'
import { getOddsByFixture } from 'src/pages/api/football/odds/getOddsByFixture'
import { Bets, BetsData } from 'src/types/apps/footballType/oddsType'
import { FixtureTypeResponse } from 'src/types/apps/footballType'
import FootballBetHorizontalMenu from 'src/components/menu/FootballBetHorizontalMenu'

interface BetsFixtureResponse {
  odds: BetsData[]
  fixture: FixtureTypeResponse[]
}

export default function LeaguePage() {
  const router = useRouter()
  const { fixtureId } = router.query

  const { data } = useQuery<BetsFixtureResponse>({
    queryKey: ['league', fixtureId],
    queryFn: () => getOddsByFixture(fixtureId as string),
    enabled: !!fixtureId,
  })

  const [bet365Data, setBet365Data] = useState<Bets[] | null>(null)
  const [fixture, setFixture] = useState<FixtureTypeResponse | null>(null)

  useEffect(() => {
    if (data) {
      setFixture(data.fixture[0])
      setBet365Data(data?.odds[0].bookmakers[0].bets)
    }
  }, [data])

  return (
    <FootballLayout>
      <FootballBetHorizontalMenu bets={bet365Data} fixture={fixture} />
      <h1>teste</h1>
      {bet365Data &&
        bet365Data.map((bet) => (
          <TableContainer
            component={Paper}
            key={bet.id}
            style={{ marginBottom: '20px', padding: '2px' }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align='center' colSpan={bet.values.length}>
                    <Typography
                      variant='body2'
                      align='left'
                      style={{ paddingTop: '10px' }}
                    >
                      {bet.name}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  {bet.values.map((value: any, index: number) => (
                    <TableCell key={index} align='center'>
                      {value.odd}
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        ))}
    </FootballLayout>
  )
}
