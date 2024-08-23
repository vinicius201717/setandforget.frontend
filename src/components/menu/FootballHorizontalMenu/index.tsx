import React from 'react'
import HomeIcon from '@mui/icons-material/Home'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {
  AppBarContainer,
  ButtonBack,
  ButtonLink,
  ToolbarContainer,
} from './style'
import { useRouter } from 'next/router'

const FootballHorizontalMenu = () => {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <AppBarContainer position='static'>
      <ToolbarContainer>
        <ButtonLink href={'/sports/football'}>
          <HomeIcon />
        </ButtonLink>
        <ButtonLink href={'/sports/football/leagues'}>League</ButtonLink>
        <ButtonLink href={'/sports/football/teams'}>Teams</ButtonLink>
        <ButtonBack onClick={handleBack}>
          <ArrowBackIcon />
        </ButtonBack>
      </ToolbarContainer>
    </AppBarContainer>
  )
}

export default FootballHorizontalMenu
