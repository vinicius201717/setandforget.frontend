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
import { Bets, OddsBetType } from 'src/types/apps/footballType/oddsType'
import FootballBetHorizontalMenu from 'src/components/menu/FootballBetHorizontalMenu'
import { getOddsBet } from 'src/pages/api/football/odds/getOddsBet'
import { getOddsByFixture } from 'src/pages/api/football/odds/getOddsByFixture'
import { fixtureType } from 'src/types/apps/footballType/fixtureType'

export default function LeaguePage() {
  const router = useRouter()
  const { fixtureId } = router.query

  const { data } = useQuery<OddsBetType[]>({
    queryKey: ['oddsBet', fixtureId],
    queryFn: () => getOddsBet(),
    enabled: !!fixtureId,
  })

  const { data: fixtureData } = useQuery({
    queryKey: ['bet', fixtureId],
    queryFn: () => getOddsByFixture(fixtureId as string),
    enabled: !!fixtureId,
  })

  const [oddsBet, setOddsBet] = useState<OddsBetType[] | null>(null)
  const [fixture, setFixture] = useState<fixtureType | null>(null)

  useEffect(() => {
    if (data) {
      setOddsBet(data)
    }
  }, [data])

  useEffect(() => {
    if (fixtureData) {
      setFixture(fixtureData.fixture[0].teams)
    }
  }, [fixtureData])

  return (
    <FootballLayout>
      <FootballBetHorizontalMenu oddsBet={oddsBet} fixture={fixture} />
      <h1>teste</h1>
      {/* {bet365Data &&
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
        ))} */}
    </FootballLayout>
  )
}
