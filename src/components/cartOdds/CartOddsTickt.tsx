import React, { useEffect } from 'react'
import { BoxTicket, FixtureOddTeams } from './style'
import { BetItemType } from 'src/types/apps/footballType/fixtureType'

const CartOddsTicket: React.FC<BetItemType> = ({
  name,
  price,
  quantity,
  fixture,
  fixtureId,
  odd,
  oddId,
}) => {
  useEffect(() => {
    console.log(fixture)
  }, [fixture])

  return (
    <BoxTicket>
      <FixtureOddTeams>teste</FixtureOddTeams>
    </BoxTicket>
  )
}

export default CartOddsTicket
