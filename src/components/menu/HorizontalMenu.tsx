import React from 'react'
import { AppBarContainer, BottomLink, ToolbarContainer } from './style'

const HorizontalMenu = () => {
  return (
    <AppBarContainer position='static'>
      <ToolbarContainer>
        <BottomLink href={'/sports/football/leagues/'}>League</BottomLink>

        <BottomLink href={'/sports/football/teams'}>Teams</BottomLink>
      </ToolbarContainer>
    </AppBarContainer>
  )
}

export default HorizontalMenu
