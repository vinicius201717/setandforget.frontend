import React, { useEffect } from 'react'
import { BoxTicket, FixtureOdd, InfoOdd, Odd, Team } from './style'
import { BetItemType } from 'src/types/apps/footballType/fixtureType'
import Image from 'next/image'
import { Typography } from '@mui/material'

const CartOddsTicket: React.FC<BetItemType> = ({
  price,
  quantity,
  fixture,
  bet,
  fixtureId,
  odd,
  oddId,
}) => {
  useEffect(() => {
    console.log(bet, price, quantity, fixtureId, oddId)
  }, [bet])

  return (
    <BoxTicket>
      <FixtureOdd>
        <Team>
          <Image
            src={fixture?.home.logo as string}
            alt={fixture?.home.name as string}
            width={25}
            height={25}
          />
          <Typography variant='body2'>{fixture?.home.name}</Typography>
        </Team>
        <span>x</span>
        <Team>
          <Image
            src={fixture?.away.logo as string}
            alt={fixture?.away.name as string}
            width={25}
            height={25}
          />
          <Typography variant='body2'>{fixture?.away.name}</Typography>
        </Team>
      </FixtureOdd>
      <FixtureOdd>
        <InfoOdd>
          {' '}
          <Odd variant='body2'>{odd}</Odd>
          <Typography variant='body2'>{bet}</Typography>
        </InfoOdd>
      </FixtureOdd>
    </BoxTicket>
  )
}

export default CartOddsTicket
