import React, { useEffect, useState } from 'react'
import { IconButton, InputBase, Typography, Modal } from '@mui/material'
import AppsIcon from '@mui/icons-material/Apps'
import {
  AppBarContainer,
  AppBoxContainer,
  FixtureContainer,
  FixtureTeamContainer,
  Search,
  SearchContainer,
  ModalContentContainer,
  ModalButtonContainer,
  TeamLogo,
  ButtonLink,
} from './style'
import { Bets } from 'src/types/apps/footballType/oddsType'
import { FixtureTypeResponse } from 'src/types/apps/footballType'
import { GridSearchIcon } from '@mui/x-data-grid'

interface MenuBetProps {
  bets: Bets[] | null
  fixture: FixtureTypeResponse | null
}

const FootballBetHorizontalMenu = ({ bets, fixture }: MenuBetProps) => {
  const [menu, setMenu] = useState<string[]>([])
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    if (bets) {
      const names = bets.map((bet) => bet.name)
      setMenu(names)
    }
  }, [bets])

  const handleOpenModal = () => setModalOpen(true)
  const handleCloseModal = () => setModalOpen(false)

  return (
    <AppBarContainer position='static'>
      {fixture && (
        <FixtureContainer>
          <FixtureTeamContainer>
            <TeamLogo
              src={fixture?.teams.home.logo}
              alt={fixture?.teams.home.name}
              width={50}
              height={50}
            />
            <Typography>{fixture?.teams.home.name}</Typography>
          </FixtureTeamContainer>
          <Typography>X</Typography>
          <FixtureTeamContainer>
            <Typography>{fixture?.teams.away.name}</Typography>
            <TeamLogo
              src={fixture?.teams.away.logo}
              alt={fixture?.teams.away.name}
              width={50}
              height={50}
            />
          </FixtureTeamContainer>
        </FixtureContainer>
      )}
      <SearchContainer>
        <IconButton
          sx={{ p: '10px' }}
          aria-label='menu'
          onClick={handleOpenModal}
        >
          <AppsIcon />
        </IconButton>

        <Search>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder='Search bet'
            inputProps={{ 'aria-label': 'search leagues' }}
          />
          <IconButton type='submit' sx={{ p: '10px' }} aria-label='search'>
            <GridSearchIcon />
          </IconButton>
        </Search>
      </SearchContainer>

      <AppBoxContainer>
        {menu.map((name, index) => (
          <Typography
            key={index}
            variant='body1'
            sx={{ padding: '0 15px', flexShrink: 0 }}
          >
            {name}
          </Typography>
        ))}
      </AppBoxContainer>

      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby='modal-title'
        aria-describedby='modal-description'
      >
        <ModalContentContainer>
          <Typography id='modal-title' variant='h6'>
            CHOOSE BET
          </Typography>
          <ModalButtonContainer>
            {menu.map((name, index) => (
              <ButtonLink
                key={index}
                onClick={() => {
                  handleCloseModal()
                  console.log(`Aposta selecionada: ${name}`)
                }}
              >
                {name}
              </ButtonLink>
            ))}
          </ModalButtonContainer>
        </ModalContentContainer>
      </Modal>
    </AppBarContainer>
  )
}

export default FootballBetHorizontalMenu
